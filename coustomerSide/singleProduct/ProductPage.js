// Load product details dynamically
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
});

function renderProductDetails(product) {
  const container = document.getElementById("product-container");

  container.innerHTML = `
    <div class="product-detail">
      <div class="product-images">
        ${product.stock[0].images.map(img => 
          `<img src="../../data/imgs/products/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}/${product.id.toLowerCase()}/${img}" 
                alt="${product.name}" class="product-img"/>`
        ).join("")}
      </div>
      <div class="product-info">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        ${product.sale > 0 ? `<p><strong>Discount:</strong> ${product.sale}% OFF</p>` : ""}
        <p><strong>Available Sizes:</strong> ${(product.stock[0].sizes || []).map(s => s.name).join(", ")}</p>
        <p><strong>Available Colors:</strong> ${(product.stock.map(v => v.color)).join(", ")}</p>
        <button class="btn btn-success">Add to Cart</button>
      </div>
    </div>
  `;
}
