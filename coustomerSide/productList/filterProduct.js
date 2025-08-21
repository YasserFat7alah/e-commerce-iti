import { ProductList } from "./ProductList.js";

const products = JSON.parse(localStorage.getItem("products")) || [];

// Central filter state
const state = {
    category: null,
    subCategories: new Set(),
    brand: new Set(),
    size: new Set(),
    color: new Set(),
    minPrice: null,
    maxPrice: null,
    discount: null,
    offers: new Set(),
};



function filterProductByCategory() {
    const categories = [...new Set(products.map(p => p.category))];
    const filterByCategory = document.querySelector("#filterByCategory");
    for (const category of categories) {
        filterByCategory.innerHTML += `
            <div class="form-check">
                <input class="form-check-input filter-input" type="radio" name="category" id="cat-${category}" value="${category}">
                 <label class="form-check-label" for="cat-${category}">${category}</label>
            </div>
        `
    };

    // select all radio buttons for category filter **after adding them to the DOM**
    const categoryRadios = document.querySelectorAll('input[name="category"]');

    categoryRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            const selectedCategory = e.target.value.trim();
            state.category = selectedCategory || null;

            // Reset other filters when category changes --important for UX--
            state.subCategories.clear();
            state.brand.clear();
            state.size.clear();

            filterProductByProductType();
            filterProductByBrand();
            filterProductBySize();
            filterProductByColor();
            filterProductByPrice();
            filterProductByDiscount();
            filterProductByOffers();

            ProductList("product-list", "results-count", state);;
        });
    });
};



function filterProductByProductType() {
    const productSubCat = document.getElementById("subcat-options");
    let availableTypes = products;
    if (state.category) {
        availableTypes = availableTypes.filter(p => p.category === state.category);
    };

    const productTypes = [...new Set(availableTypes.map(p => p.subcategory))];

    productSubCat.innerHTML = productTypes.map(type => `
    <div class="form-check form-check-inline">
      <input class="form-check-input filter-input" type="checkbox" value="${type}" id="pType-${type}" name="subcategory">
      <label class="form-check-label" for="pType-${type}">${type}</label>
    </div>`).join("");

    const SubCategoryCheck = document.querySelectorAll('input[name="subcategory"]');
    SubCategoryCheck.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) state.subCategories.add(checkbox.value);
            else state.subCategories.delete(checkbox.value);


            // --- NEW LOGIC: Remove brands not available in the new subcategory selection ---
            let availableProducts = products;
            if (state.category) {
                availableProducts = availableProducts.filter(p => p.category === state.category);
            }
            if (state.subCategories.size > 0) {
                availableProducts = availableProducts.filter(p => state.subCategories.has(p.subcategory));
            }
            const availableBrands = new Set(availableProducts.map(p => p.brand));
            // Remove brands from state.brand that are not in availableBrands
            state.brand.forEach(brand => {
                if (!availableBrands.has(brand)) {
                    state.brand.delete(brand);
                }
            });


            // --- Remove unavailable sizes ---
            const availableSizes = new Set(
                availableProducts.flatMap(product =>
                    (product.stock || []).flatMap(variant =>
                        (variant.sizes || []).map(size => size && size.name ? size.name.trim() : null)
                    )
                ).filter(name => name && name.length > 0)
            );
            state.size.forEach(size => {
                if (!availableSizes.has(size)) {
                    state.size.delete(size);
                }
            });

            // --- Remove unavailable colors ---
            const availableColors = new Set(
                availableProducts.flatMap(product =>
                    (product.stock || []).map(variant => variant.color?.trim())
                ).filter(c => c && c.length > 0)
            );
            state.color.forEach(color => {
                if (!availableColors.has(color)) {
                    state.color.delete(color);
                }
            });
            // --- END NEW LOGIC ---


            filterProductBySize();
            filterProductByBrand();
            filterProductByColor();
            filterProductByPrice();
            ProductList("product-list", "results-count", state);
        });
    })
};




function filterProductByBrand() {
    const brandOptions = document.getElementById("brand-options");
    let availableProducts = products;
    if (state.category) {
        availableProducts = availableProducts.filter(p => p.category === state.category);
    };

    if (state.subCategories.size > 0) {
        availableProducts = availableProducts.filter(p => state.subCategories.has(p.subcategory));
    }

    const productBrand = [...new Set(availableProducts.map(p => p.brand))];
    brandOptions.innerHTML = productBrand.map(brand => `
    <div class="form-check form-check-inline">
      <input class="form-check-input filter-input" type="checkbox" value="${brand}" id="brand-${brand}" name="brand">
      <label class="form-check-label" for="brand-${brand}">${brand}</label>
    </div>`).join("");

    const BrandCheck = document.querySelectorAll('input[name="brand"]');
    BrandCheck.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) state.brand.add(checkbox.value);
            else state.brand.delete(checkbox.value);
            filterProductByColor();
            ProductList("product-list", "results-count", state);
        });
    })
};



function filterProductBySize() {
    const sizeOptions = document.getElementById("size-options");
    let availableProducts = products;

    if (state.category) {
        availableProducts = availableProducts.filter(p => p.category === state.category);
    };

    if (state.subCategories.size > 0) {
        availableProducts = availableProducts.filter(p => state.subCategories.has(p.subcategory));
    };

    // Extract all available sizes from the products and handel the very amount of exeptions
    const availableSizes = [
        ...new Set(
            availableProducts.flatMap(product =>
                (product.stock || []).flatMap(variant =>
                    (variant.sizes || [])
                        .map(size => (size && size.name ? size.name.trim() : null))
                )
            )
        )
    ].filter(name => name && name.length > 0);

    sizeOptions.innerHTML = availableSizes.map(size => `
        <div class="form-check form-check-inline">
            <input class="form-check-input filter-input" type="checkbox" value="${size}" id="size-${size}" name="sizes">
            <label class="form-check-label" for="size-${size}">${size}</label>
        </div>`).join('');

    const SizeCheck = document.querySelectorAll('input[name="sizes"]');
    SizeCheck.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) state.size.add(checkbox.value);
            else state.size.delete(checkbox.value);
            filterProductByColor();
            ProductList("product-list", "results-count", state);
        });
    });
};



function filterProductByColor() {
    const colorOptions = document.getElementById("color-options");
    let availableProducts = products;

    // Filter by category
    if (state.category) {
        availableProducts = availableProducts.filter(p => p.category === state.category);
    }
    // Filter by subcategory
    if (state.subCategories.size > 0) {
        availableProducts = availableProducts.filter(p => state.subCategories.has(p.subcategory));
    }
    // Filter by brand
    if (state.brand.size > 0) {
        availableProducts = availableProducts.filter(p => state.brand.has(p.brand));
    }
    // Filter by size
    if (state.size && state.size.size > 0) {
        availableProducts = availableProducts.filter(p =>
            (p.stock || []).some(variant =>
                (variant.sizes || []).some(size =>
                    state.size.has(size.name)
                )
            )
        );
    }

    // Extract all unique colors from stock
    const availableColors = [
        ...new Set(
            availableProducts.flatMap(product =>
                (product.stock || [])
                    .map(variant => variant.color?.trim())
            )
        )
    ].filter(c => c && c.length > 0);

    colorOptions.innerHTML = availableColors.map(color => `
        <div class="form-check form-check-inline">
            <input class="form-check-input filter-input" type="checkbox" value="${color}" id="color-${color}" name="colors">
            <label class="form-check-label" for="color-${color}">${color}</label>
        </div>`).join('');

    const ColorCheck = document.querySelectorAll('input[name="colors"]');
    ColorCheck.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) state.color.add(checkbox.value);
            else state.color.delete(checkbox.value);
            ProductList("product-list", "results-count", state);
        });
    });
};




function filterProductByPrice() {
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    [minPriceInput, maxPriceInput].forEach(input => {
        input.addEventListener("input", () => {
            const min = parseFloat(minPriceInput.value);
            const max = parseFloat(maxPriceInput.value);

            // Prevent negative values
            if (!isNaN(min) && min < 0) min = 0;
            if (!isNaN(max) && max < 0) max = 0;

            // Prevent invalid ranges (min > max)
            if (!isNaN(min) && !isNaN(max) && min > max) {
                max = min;
                maxPriceInput.value = min; // auto correct for UI
            };

            state.minPrice = isNaN(min) ? null : min;
            state.maxPrice = isNaN(max) ? null : max;

            ProductList("product-list", "results-count", state);
        });
    });

};



function filterProductByDiscount() {

    const discountRadios = document.querySelectorAll("input[name='discount']");
    discountRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const value = parseFloat(radio.value);
            state.discount = isNaN(value) ? null : value;
            ProductList("product-list", "results-count", state);
        });
    });

};





function filterProductByOffers() {

    const filterOffersBody = document.getElementById('filterOffersBody');

    const offersSet = new Set();
    products.forEach(p => {
        (p.offers || []).forEach( o =>{
            if (o && o.trim().length > 0) {
                offersSet.add(o.trim());
            }
        }   
        );
    });

    if (offersSet.size === 0) {
        filterOffersBody.innerHTML = `
        <span class="text-muted">No Offers Available Now</span>
        `;
        return;
    } else {
        filterOffersBody.innerHTML = Array.from(offersSet).map(offer => `
        <div class="form-check">
            <input class="form-check-input filter-input" type="checkbox" id="offer-${offer}" value="${offer}" name="offers">
            <label class="form-check-label" for="offer-${offer}">${offer}</label>
        </div>`).join("");
    }
    const offerCheckboxes = document.querySelectorAll("input[name='offers']");
    offerCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                state.offers.add(checkbox.value);
                console.log("Added offer:", checkbox.value);
            } else {
                state.offers.delete(checkbox.value);
            }
            ProductList("product-list", "results-count", state);
        });
    });
}





// Clear all filters
document.getElementById("clear-filters").addEventListener("click", () => {
    state.category = null;
    state.subCategories.clear();
    state.brand.clear();
    state.size.clear();
    state.color.clear();
    state.minPrice = null;
    state.maxPrice = null;
    state.discount = null;
    state.offers.clear();

    // Reset all filter inputs
    document.querySelectorAll('.filter-input').forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });

    const allCatRadio = document.getElementById("cat-all");
    if (allCatRadio) allCatRadio.checked = true

    // Re-render all filters if needed
    filterProductByProductType();
    filterProductByBrand();
    filterProductBySize();
    filterProductByColor();
    filterProductByPrice();
    filterProductByDiscount();
    filterProductByOffers();


    // Re-render the product list with no filters
    ProductList("product-list", "results-count", state);

});







// base filter 
filterProductByCategory();

// depend on category filter
filterProductByProductType();

//  depend on category and subcategory filters
filterProductByBrand();

// depend on category, subcategory and brand filters
filterProductBySize();


// depend on category, subcategory, brand and size  filter
filterProductByColor();


// depend on category filter
filterProductByPrice();


// depend on category
filterProductByDiscount();


// depend on category
filterProductByOffers();



// Initial product list load
ProductList("product-list", "results-count", state);




