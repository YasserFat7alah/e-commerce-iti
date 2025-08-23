document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    document.getElementById("product-container").innerHTML =
      "<p>Product not found</p>";
    return;
  }

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find(p => p.id === productId);

  if (!product) {
    document.getElementById("product-container").innerHTML =
      "<p>Product not found</p>";
    return;
  }

  renderProductDetails(product);
  setupAddToCart(product);
});


function renderProductDetails(product) {
  const container = document.getElementById("product-container");

  const hasDiscount = product.sale > 0;
  const discountPercent = hasDiscount ? Math.round(product.sale * 100) : 0;
  const originalPrice = product.price;
  const discountedPrice = originalPrice * (1 - product.sale);

  const images = (product.stock?.[0]?.images || []);
  const carouselId = "productCarousel";

  const carouselHTML = `
    <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        ${images.map((img, idx) => `
          <div class="carousel-item ${idx === 0 ? "active" : ""}">
            <img src="../../data/imgs/products/${(product.category || '').toLowerCase()}/${(product.subCategory || product.subcategory || '').toLowerCase()}/${(product.id || '').toLowerCase()}/${img}" 
                 class="d-block w-100 rounded shadow-sm" alt="${product.name}">
          </div>
        `).join("")}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  `;

  container.innerHTML = `
    <div class="row g-4">
      <div class="col-12 col-lg-6">${carouselHTML}</div>
      <div class="col-12 col-lg-6 border p-4 rounded shadow-sm">
        <h2 class="mb-3">${product.name}</h2>
        <p class="text-muted">${product.description}</p>
        
        <div class="mb-3">
          <span class="fw-bold fs-4 text-success">$${discountedPrice.toFixed(2)}</span>
          ${hasDiscount ? `<span class="text-muted text-decoration-line-through ms-2">$${originalPrice.toFixed(2)}</span>` : ""}
        </div>
        ${hasDiscount ? `<p class="discount"><i class="fa-solid fa-tag"></i> ${discountPercent}% OFF</p>` : ""}

        <!-- Size Selector -->
${(product.stock?.[0]?.sizes?.length && product.stock[0].sizes.some(s => s.name)) ? `
  <div class="sizes mb-4">
    <label class="form-label fw-bold"><i class="fa-solid fa-ruler"></i> Size:</label>
    <select id="sizeSelect" class="form-select">
      ${product.stock[0].sizes.map(s =>
    `<option value="${s.name}" ${s.qty === 0 ? "disabled" : ""}>
          ${s.name || "Default"} (${s.qty} left)
        </option>`
  ).join("")}
    </select>
  </div>
` : ""}

        
        <!-- Color Selector -->
        <div class="colors mb-4">
          <label class="form-label fw-bold"><i class="fa-solid fa-palette"></i> Color:</label>
          <select id="colorSelect" class="form-select">
            ${(product.stock || []).map(v => `<option value="${v.color}">${v.color}</option>`).join("")}
          </select>
        </div>
        
        <!-- Quantity Selector -->
        <div class="mb-4">
          <label class="form-label fw-bold"><i class="fa-solid fa-box"></i> Quantity:</label>
          <input type="number" id="qtyInput" class="form-control" value="1" min="1">
        </div>

        ${product.offers?.length ? `<p class="mt-2 text-success"><i class="fa-solid fa-gift"></i> ${product.offers.join(", ")}</p>` : ""}
        ${product.brand ? `<p class="mt-2"><strong>Brand:</strong> ${product.brand}</p>` : ""}
        ${product.material ? `<p class="mt-2"><strong>Material:</strong> ${product.material}</p>` : ""}
        
        <button id="addToCartBtn" class="btn btn-dark btn-cart">
          <i class="fa-solid fa-cart-shopping"></i> Add to Cart
        </button>

        <button id="backToCatalogBtn" class="btn btn-cart .text-success-emphasis border">
          <a href="../productList/productList.html" class="text-decoration-none text-dark" id="backToCatalogBtnLink"> 
            <i class="fa fa-home" aria-hidden="true"></i> Back to Catalog        
          </a>
        </button>

      </div>
    </div>
  `;
}



function notify(message, type = "dark") {
  const toastEl = document.getElementById("liveToast");
  const toastMsg = document.getElementById("toastMessage");

  // set message
  toastMsg.textContent = message;

  // update color class (success, danger, warning, etc.)
  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  // show toast
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}




function setupAddToCart(product) {
  const btn = document.getElementById("addToCartBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const sizeSelect = document.getElementById("sizeSelect");
    const selectedSize = sizeSelect ? sizeSelect.value : null;

    const selectedColor = document.getElementById("colorSelect")?.value || "";
    const qtyInput = document.getElementById("qtyInput");
    const qty = parseInt(qtyInput?.value || "1", 10);

    if (!selectedColor) {
      notify("⚠️ Please select a color.", "warning");
      return;
    }

    // Find stock variant
    const variant = product.stock.find(v => v.color === selectedColor);

    let sizeData;
    if (selectedSize) {
      sizeData = variant?.sizes.find(s => s.name === selectedSize);
      if (!sizeData) {
        notify("❌ This size is not available for the selected color.", "danger");
        return;
      }
    }

    const maxQty = sizeData ? sizeData.qty : variant?.sizes?.[0]?.qty || variant?.qty || Infinity;

    let cart = JSON.parse(sessionStorage.getItem("ShopingCart")) || [];

    // check if same item already in cart (ignore size if no size exists)
    const existingItem = cart.find(item =>
      item.id === product.id &&
      item.color === selectedColor &&
      (selectedSize ? item.size === selectedSize : true)
    );

    if (existingItem) {
      if (existingItem.qty + qty > maxQty) {
        notify(`⚠️ Only ${maxQty} units available. You already have ${existingItem.qty}.`, "warning");
        return;
      }
      existingItem.qty += qty;
      sessionStorage.setItem("ShopingCart", JSON.stringify(cart));
      notify(`✅ Quantity updated! Added +${qty}. Total: ${existingItem.qty}`, "info");
      return;
    }

    if (qty > maxQty) {
      notify(`⚠️ Only ${maxQty} units available.`, "warning");
      return;
    }

    cart.push({
      id: product.id,
      name: product.name,
      price: (product.price * (1 - product.sale)).toFixed(2),
      size: selectedSize || null,   // <-- safe
      color: selectedColor,
      qty
    });

    sessionStorage.setItem("ShopingCart", JSON.stringify(cart));
    notify(`🛒 ${qty} x ${product.name} (${selectedSize || "One Size"}, ${selectedColor}) added to cart!`, "success");
  });
}
