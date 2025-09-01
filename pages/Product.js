import View from "../components/core/view.js";
import { navigate } from "../scripts/utils/navigation.js";
import Navbar from "../components/landing/Nav.js";
import Toast from './../components/ui/toast.js';
import { localStore, sessionStore } from "../scripts/utils/storage.js";
import { addToCart } from "./customer/productCard/addToCart.js";
import FloatBtns from "../components/ui/floating.js";

export default class Product extends View {
  constructor(_config, _params = {}) {
    const currentId = sessionStore.read('currentProduct', '');
    const currentProd = localStore.read('products', []).filter(product => product.id === currentId)[0];
    // Call base constructor
    super({
      title: `${currentProd.name} | AYAAM`
    }, _params);

  }
  template() {
    return `
      <header class="sticky-top bg-white" id="navbar"></header>
      <div id="toastMsg"></div>
      <div id="floatBtns"></div>
      <div class="container my-5">
        <div id="product-container"></div>
      </div>
    `;
  }

  script() {
    this.mount(Navbar, "#navbar");
    this.mount(Toast, "#toastMsg");
    this.mount(FloatBtns, "#floatBtns");

    const productId = sessionStore.read("currentProduct", "");
    if (!productId) {
      document.getElementById("product-container").innerHTML = "<p>Product not found</p>";
      return;
    }

    const products = localStore.read('products',[]);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      document.getElementById("product-container").innerHTML = "<p>Product not found</p>";
      return;
    }

    renderProductDetails(product);
    setupAddToCart(product);

    /** ---------- Render Product Details ---------- **/
    function renderProductDetails(product) {
      const container = document.getElementById("product-container");

      const hasDiscount = product.sale > 0;
      const discountPercent = hasDiscount ? Math.round(product.sale * 100) : 0;
      const originalPrice = product.price;
      const discountedPrice = originalPrice * (1 - product.sale);

      // Default to first color
      let defaultVariant = product.stock?.[0];
      let images = defaultVariant?.images || [];
      const carouselId = "productCarousel";

      function buildCarousel(imgs) {
        return `
          <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${imgs
            .map(
              (img, idx) => `
                <div class="carousel-item ${idx === 0 ? "active" : ""}">
                  <img src="${img}" 
                       class="d-block w-100 rounded shadow-sm" alt="${product.name}">
                </div>`
            )
            .join("")}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
            </button>
          </div>`;
      }

      container.innerHTML = `
        <div class="row g-4">
          <div class="col-12 col-lg-6" id="carouselWrapper">
            ${buildCarousel(images)}
          </div>
          <div class="col-12 col-lg-6 border p-4 rounded shadow-sm">
            <h2 class="mb-3">${product.name}</h2>
            <p class="text-muted">${product.description}</p>

            <div class="mb-3">
              <span class="fw-bold fs-4 text-success">$${discountedPrice.toFixed(2)}</span>
              ${hasDiscount ? `<span class="text-muted text-decoration-line-through ms-2">$${originalPrice.toFixed(2)}</span>` : ""}
            </div>
            ${hasDiscount ? `<p class="discount"><i class="fa-solid fa-tag"></i> ${discountPercent}% OFF</p>` : ""}

<!-- Size Selector -->
${(defaultVariant?.sizes?.length && defaultVariant.sizes.some((s) => s.name))
          ? `
    <div class="sizes mb-4">
      <label class="form-label fw-bold"><i class="fa-solid fa-ruler"></i> Size:</label>
      <select id="sizeSelect" class="form-select outlineSingleProduct">
        ${defaultVariant.sizes
            .map(
              (s) => `
            <option value="${s.name}" ${s.qty === 0 ? "disabled" : ""}>
              ${s.name || "Default"}${(typeof s.qty === "number" && s.qty !== undefined) ? ` (${s.qty} left)` : ""}
            </option>`
            )
            .join("")}
      </select>
    </div>`
          : ""
        }

            <!-- Color Selector -->
            <div class="colors mb-4">
              <label class="form-label fw-bold"><i class="fa-solid fa-palette"></i> Color:</label>
              <select id="colorSelect" class="form-select outlineSingleProduct">
                ${(product.stock || [])
          .map((v) => `<option value="${v.color}">${v.color}</option>`)
          .join("")}
              </select>
            </div>

            <!-- Quantity Selector -->
            <div class="mb-4">
              <label class="form-label fw-bold"><i class="fa-solid fa-box"></i> Quantity:</label>
              <input type="number" id="qtyInput" class="form-control outlineSingleProduct" value="1" min="1">
            </div>

            ${product.offers?.length ? `<p class="mt-2 text-success"><i class="fa-solid fa-gift"></i> ${product.offers.join(", ")}</p>` : ""}
            ${product.brand ? `<p class="mt-2"><strong>Brand:</strong> ${product.brand}</p>` : ""}
            ${product.material ? `<p class="mt-2"><strong>Material:</strong> ${product.material}</p>` : ""}

            <button id="addToCartBtn" class="btn btn-dark btn-cart">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>

            <button id="backToCatalogBtn" class="btn btn-cart ms-lg-2">
              <i class="fa fa-home" aria-hidden="true"></i> Back to Catalog
            </button>
          </div>
        </div>
      `;

      // When color changes → update carousel + sizes
      const colorSelect = document.getElementById("colorSelect");
      colorSelect.addEventListener("change", (e) => {
        const selectedColor = e.target.value;
        const variant = product.stock.find((v) => v.color === selectedColor);

        // Update carousel
        document.getElementById("carouselWrapper").innerHTML = buildCarousel(variant?.images || []);

        // Update size options if available
        if (variant?.sizes?.length && document.getElementById("sizeSelect")) {
          document.getElementById("sizeSelect").innerHTML = variant.sizes
            .map(
              (s) => `
      <option value="${s.name}" ${s.qty === 0 ? "disabled" : ""}>
        ${s.name || "Default"}${typeof s.qty === "number" ? ` (${s.qty} left)` : ""}
      </option>`
            )
            .join("");
        }

      });

      // Back to catalog
      document.getElementById("backToCatalogBtn").addEventListener("click", () => navigate("/catalog"));
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

        addToCart({
          product,
          selectedColor,
          selectedSize,
          qty,
        });
      });
    }

  }
}
