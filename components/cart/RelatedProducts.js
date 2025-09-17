import { addToCart } from "../../pages/customer/productCard/addToCart.js";
import { navigate } from "../../scripts/utils/navigation.js";
import { localStore, sessionStore } from "../../scripts/utils/storage.js";
import Component from "../core/component.js";

export default class RelatedProducts extends Component {


    template() {
        const cartItems = sessionStore.read("shoppingCart", []);
        const localProducts = localStore.read("products", []);

        let relatedItems = [];

        if (cartItems.length === 0) {
            relatedItems = localProducts;
        } else {
            const cartCat = cartItems.map(item => {
                const product = localProducts.find(p => p.id === item.id);
                return product ? product.category : null;
            }).filter(Boolean);

            const uniqCats = [...new Set(cartCat)];

            relatedItems = uniqCats.map(cat => {
                const filtered = localProducts.filter(product => product.category === cat);
                return filtered.length > 0 ? filtered : localProducts;
            }).flat();
        }


        return `    
            <div class="marginTop-related mb-4 ms-lg-0 me-lg-0 ps-lg-0 pe-lg-0" id="related-items">
                <h2 class="text-center mb-4 mt-3 mt-md-0">Related Products</h2>

                <div class="slider-container position-relative">

                    <button class="slide-btn left-btn" id="leftBtn">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>

                    <div class="cursoul d-flex">
                        ${relatedItems.map(product => {
            const discounted = product.sale > 0 ? (product.price * (1 - product.sale)).toFixed(2) : null;
            return `
                               <div class="card h-100  shadow-sm position-relative slide" style="width: 100%; max-width: 280px; margin: auto;">
                                <!-- Sale badge -->
                                ${product.sale > 0 ? `
                                    <span class="badge bg-dark position-absolute top-0 start-0 m-2 px-2 py-2">
                                        ${(product.sale * 100).toFixed()}% Sale
                                    </span>
                                ` : ""}

                    <!-- Image container with fixed height -->
                                <div style="height: 260px; overflow: hidden;">
                                    <img 
                                        src="${product.stock[0].images[0]}" 
                                        class="card-img-top" 
                                        alt="${product.name}"
                                        style="object-fit: cover; width: 100%; height: 100%;"
                                    >
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
                                                    <span class="old-price text-decoration-line-through text-muted" style="font-size: 0.75em">${product.price} USD</span>
                                                </div>
                                            `
                    : `<span class="new-price fw-bold ">${product.price} USD</span>`
                }

                                            <div class="d-flex gap-1 flex-wrap">
                                                <small class="badge bg-dark rounded-pill">${product.category}</small>
                                                <small class="badge bg-dark rounded-pill">${product.subcategory}</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex gap-2 mt-3">

                                        <!-- Larger dark button -->
                                        <button 
                                            class="btn btn-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 fs-6 viewDetailsBtn" 
                                            data-id="${product.id}">
                                            <i class="fa-solid fa-eye"></i> View
                                        </button>

                                        <!-- Smaller button: bg white, text black 
                                        <button 
                                            class="btn btn-light border d-flex align-items-center justify-content-center text-dark addToCartBtn" 
                                            data-id="${product.id}" style="width: 50px; height: 40px;">
                                            <i class="fa-solid fa-cart-plus text-dark"></i>
                                        </button> -->

                                    </div>
                                </div>
                            </div>
                            `;
        }).join("")}
                    </div>

                    <button class="slide-btn right-btn" id="rightBtn">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>

                </div>
            </div>  
        `;
    }

    script() {
        const localProducts = localStore.read("products", []);

        // View Details Button Event Listeners
        document.querySelectorAll('.viewDetailsBtn').forEach(btn => {
            btn.addEventListener("click", (e) => {
                const productId = e.currentTarget.dataset.id;
                sessionStore.write('currentProduct', productId);
                navigate('/product');
            });
        });

        // Add to Cart Button Event Listeners
        // document.querySelectorAll('.addToCartBtn').forEach(btn => {
        //     btn.addEventListener("click", (e) => {
        //         const productId = e.currentTarget.dataset.id;
        //         const product = localProducts.find(p => p.id === productId);

        //         if (!product) {
        //             console.error('Product not found');
        //             return;
        //         }

        //         const stock = product.stock || [];
        //         let chosen = null;

        //         for (const variant of stock) {
        //             const sizes = variant.sizes || [];
        //             for (const sz of sizes) {
        //                 const qty = (typeof sz.qty === 'number') ? sz.qty
        //                     : (typeof sz.quantity === 'number') ? sz.quantity
        //                         : (typeof sz.stock === 'number') ? sz.stock
        //                             : (typeof sz.count === 'number') ? sz.count
        //                                 : null;

        //                 const available = (typeof qty === 'number') ? qty > 0
        //                     : (typeof sz.available === 'boolean') ? sz.available
        //                         : (typeof sz.inStock === 'boolean') ? sz.inStock
        //                             : true;

        //                 if (available) {
        //                     chosen = {
        //                         color: variant?.color ?? null,
        //                         size: (sz?.name && sz.name.trim() !== '') ? sz.name : null
        //                     };
        //                     break;
        //                 }
        //             }
        //             if (chosen) break;
        //         }

        //         if (!chosen) {
        //             if (typeof Toast !== 'undefined' && Toast?.show) {
        //                 Toast.show('This product is out of stock', { type: 'warning' });
        //             } else {
        //                 alert('This product is out of stock');
        //             }
        //             return;
        //         }

        //         addToCart({
        //             product,
        //             selectedColor: chosen.color,
        //             selectedSize: chosen.size,
        //             qty: 1,
        //         });

        //         this.notifyCartUpdate();
        //     });
        // });



        // Slider functionality
        const slider = document.querySelector(".cursoul");
        const slides = document.querySelectorAll(".slide");

        if (slides.length > 0) {
            let sliderCurrentIndex = 0;
            const slideWidth = slides[0].offsetWidth;
            let autoplay;

            function goToSlide(index) {
                slider.scrollTo({
                    left: index * slideWidth,
                    behavior: "smooth",
                });
            }

            function nextSlide() {
                sliderCurrentIndex++;
                if (sliderCurrentIndex >= slides.length) {
                    sliderCurrentIndex = 0;
                }
                goToSlide(sliderCurrentIndex);
            }

            function prevSlide() {
                sliderCurrentIndex--;
                if (sliderCurrentIndex < 0) {
                    sliderCurrentIndex = slides.length - 1;
                }
                goToSlide(sliderCurrentIndex);
            }

            const rightBtn = document.querySelector(".right-btn");
            const leftBtn = document.querySelector(".left-btn");

            if (rightBtn) {
                rightBtn.addEventListener("click", () => {
                    nextSlide();
                });
            }

            if (leftBtn) {
                leftBtn.addEventListener("click", () => {
                    prevSlide();
                });
            }

            // Auto-play functionality
            function startAutoplay() {
                autoplay = setInterval(nextSlide, 3000);
            }

            function stopAutoplay() {
                if (autoplay) {
                    clearInterval(autoplay);
                }
            }

            startAutoplay();

            slider.addEventListener("mouseenter", stopAutoplay);
            slider.addEventListener("mouseleave", startAutoplay);
        }
    }

    notifyCartUpdate() {
        const cartUpdateEvent = new CustomEvent('cartUpdated', {
            detail: {
                timestamp: Date.now(),
                action: 'itemAdded'
            }
        });
        document.dispatchEvent(cartUpdateEvent);
        document.dispatchEvent(new CustomEvent('cartUpdated'));
    }

}