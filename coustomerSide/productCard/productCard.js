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
      src="../../data/imgs/products/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}/${product.id.toLowerCase()}/${images[0]}" 
      alt="${product.name}" 
      class="card-img-top">
    <button class="arrow left">&#10094;</button>
    <button class="arrow right">&#10095;</button>
    ${discounted ?
       `<span class="discount-badge">${(sale*100).toFixed(0)}% SALE</span>`
        :
        `<span class="discount-badge d-none">0% SALE</span>` }
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
              <span class="old-price text-decoration-line-through text-muted">${price} USD</span>
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

    <button 
      class="add-to-cart-btn btn btn-dark add-to-cart mt-3 d-flex align-items-center justify-content-center gap-2" 
      data-id="${product.id}">
      <a href="../singleProduct/product.html?id=${product.id}" class="text-white text-decoration-none">
        <i class="fa-solid fa-cart-shopping"></i> View Details      
      </a>
    </button>
  </div>
</div>
`;

  const imgEl = card.querySelector("img");
  const leftArrow = card.querySelector(".arrow.left");
  const rightArrow = card.querySelector(".arrow.right");




  let currentIndex = 0;
  function updateImage() {
    imgEl.src = `../../data/imgs/products/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}/${product.id.toLowerCase()}/${images[currentIndex]}`;
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
