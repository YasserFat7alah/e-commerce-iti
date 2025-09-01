import { navigate } from "../../../scripts/utils/navigation.js";
import { sessionStore } from "../../../scripts/utils/storage.js";
import { addToCart } from "./addToCart.js";
import Toast from "../../../components/ui/toast.js";

export function ProductCard(product) {
  const stock = product.stock[0];
  const images = stock.images;
  const price = product.price;
  const sale = product.sale ? product.sale : 0;
  const discounted = sale > 0 ? (price * (1 - sale)).toFixed(2) : null;

  const card = document.createElement("div");
  card.className = "col-md-6 col-lg-4 col-sm-12  mb-4";

  card.innerHTML = `
<div class="card shadow-sm h-100">
  <div class="card-img-container position-relative">
    <img 
      src="${images[0]}" 
      alt="${product.name}" 
      class="card-img-top">
    <button class="arrow left">&#10094;</button>
    <button class="arrow right">&#10095;</button>
    ${discounted ?
      `<span class="discount-badge badge bg-dark position-absolute top-0 start-0 m-2 px-2 py-2">${(sale * 100).toFixed(0)}% SALE</span>`
      :
      `<span class="discount-badge d-none">0% SALE</span>`}
  </div>

  <div class="card-body d-flex flex-column justify-content-between">
    <div>
      <h6 class="card-title fw-semibold">
        ${product.brand} - ${product.name.slice(0, 20)}
      </h6>
      <p class="card-text text-muted mb-2 product-cart-description">
        ${product.description.slice(0, 70)}...
      </p>

      <div class="d-flex justify-content-between align-items-start">
        ${discounted
      ? `
            <div class="d-flex flex-column">
              <span class="new-price fw-bold text-success">${discounted} USD</span>
              <span class="old-price text-decoration-line-through text-muted ms-0 fs-6">${price} USD</span>
            </div>
          `
      : `<span class="new-price fw-bold">${price} USD</span>`
    }

        <div class="d-flex gap-1 flex-wrap">
          <small class="badge bg-dark rounded-pill">${product.category}</small>
          <small class="badge bg-dark rounded-pill">${product.subcategory}</small>
        </div>
      </div>
    </div>

<div class="d-flex gap-2 mt-3">

  <button 
    class="btn btn-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 fs-6" 
    data-id="${product.id}" id="viewDetailsBtn">
      <i class="fa-solid fa-eye"></i> View
  </button>

  <button 
    class="btn btn-light border d-flex align-items-center justify-content-center text-dark" 
    data-id="${product.id}" id="addToCartBtn" style="width: 50px; height: 40px;">
      <i class="fa-solid fa-cart-plus"></i>
  </button>

</div>
  </div>
</div>
`;

  const imgEl = card.querySelector("img");
  const leftArrow = card.querySelector(".arrow.left");
  const rightArrow = card.querySelector(".arrow.right");
  const viewDetailsBtn = card.querySelector('#viewDetailsBtn');
  const addToCartBtn = card.querySelector('#addToCartBtn');

  addToCartBtn.addEventListener("click", () => {
    // find first in-stock size across variants (fall back to size=null for one-size items)
    const stock = product.stock || [];
    let chosen = null;

    for (const variant of stock) {
      const sizes = variant.sizes || [];
      for (const sz of sizes) {
        // determine quantity / availability using common fields
        const qty = (typeof sz.qty === 'number') ? sz.qty
                  : (typeof sz.quantity === 'number') ? sz.quantity
                  : (typeof sz.stock === 'number') ? sz.stock
                  : (typeof sz.count === 'number') ? sz.count
                  : null;

        const available = (typeof qty === 'number') ? qty > 0
                        : (typeof sz.available === 'boolean') ? sz.available
                        : (typeof sz.inStock === 'boolean') ? sz.inStock
                        : true; // assume available if no info

        if (available) {
          chosen = {
            color: variant?.color ?? null,
            size: (sz?.name && sz.name.trim() !== '') ? sz.name : null
          };
          break;
        }
      }
      if (chosen) break;
    }

    if (!chosen) {
      // nothing available
      if (Toast?.show) Toast.show('This product is out of stock', { type: 'warning' });
      else alert('This product is out of stock');
      return;
    }

    addToCart({
      product,
      selectedColor: chosen.color,
      selectedSize: chosen.size,
      qty: 1,
    });
  })

  viewDetailsBtn.addEventListener("click", () => {
    sessionStore.write('currentProduct', product.id, '')
    navigate('/product')
  });


  let currentIndex = 0;
  function updateImage() {
    imgEl.src = `${images[currentIndex]}`;
  }

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  });

  return card;
}
