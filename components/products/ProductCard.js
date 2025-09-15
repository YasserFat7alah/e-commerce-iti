import { navigate } from "../../scripts/utils/navigation.js";
import { sessionStore } from "../../scripts/utils/storage.js";
import Component from "../core/component.js";

export default class ProductCard extends Component {
    constructor(_config = {}, product = {}) {
        super(_config, product);
        this.product = product;
    }

    getFirstImage() {
        return (
            this.product.stock?.[0]?.images?.[0] ||
            "https://via.placeholder.com/300x200"
        );
    }

    getDiscountedPrice() {
        return this.product.sale > 0
            ? (this.product.price * (1 - this.product.sale)).toFixed(2)
            : null;
    }

    /* === TEMPLATE === */
    template() {
        const firstImage = this.getFirstImage();
        const discounted = this.getDiscountedPrice();

        return `
      <div class="card h-100 shadow-sm position-relative" style="width: 100%; max-width: 280px; margin: auto;">
          
          <!-- Sale badge -->
          ${this.product.sale > 0 ? `
              <span class="badge bg-dark position-absolute top-0 start-0 m-2 px-2 py-2">
                  ${(this.product.sale * 100).toFixed()}% Sale
              </span>
          ` : ""}

          <!-- Image container with fixed height -->
          <div style="height: 260px; overflow: hidden;">
              <img 
                  src="${firstImage}" 
                  class="card-img-top" 
                  alt="${this.product.name}"
                  style="object-fit: cover; width: 100%; height: 100%;"
              >
          </div>

          <div class="card-body d-flex flex-column justify-content-between">
              <div>
                  <h6 class="card-title fw-semibold">
                      ${this.product.brand} - ${this.product.name.slice(0, 20)}
                  </h6>
                  <p class="card-text text-muted mb-2 product-cart-description">
                      ${this.product.description.slice(0, 70)}...
                  </p>

                  <div class="d-flex justify-content-between align-items-start">
                      ${discounted
                ? `
                          <div class="d-flex flex-column">
                              <span class="new-price fw-bold text-success">${discounted} USD</span>
                              <span class="old-price text-decoration-line-through text-muted" style="font-size: 0.75em">${this.product.price} USD</span>
                          </div>
                      `
                : `<span class="new-price fw-bold ">${this.product.price} USD</span>`
            }

                      <div class="d-flex gap-1 flex-wrap">
                          <small class="badge bg-dark rounded-pill">${this.product.category}</small>
                          <small class="badge bg-dark rounded-pill">${this.product.subcategory}</small>
                      </div>
                  </div>
              </div>

              <div class="d-flex gap-2 mt-3">

                <!-- View Button -->
                <button 
                    class="btn btn-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 fs-6 viewDetailsBtn" 
                    data-id="${this.product.id}">
                    <i class="fa-solid fa-eye"></i> View Details
                </button>

                </div>
          </div>
      </div>
    `;
    }

    /* === SCRIPT === */
    script() {
        document.querySelectorAll('.viewDetailsBtn').forEach(btn => {
            btn.addEventListener("click", (e) => {
                const productId = e.currentTarget.dataset.id;
                sessionStore.write('currentProduct', productId);
                navigate('/product');
            });
        });

    }

    render() {
        this.onEnter();

        if (!this.parent) {
            console.error(`No parent found for ${this.constructor.name}`);
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.innerHTML = this.template().trim();
        const el = wrapper.firstElementChild;

        this.parent.appendChild(el);

        this.el = el;

        this.script();
    }


}