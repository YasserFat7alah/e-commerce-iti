import { ProductList } from "./ProductList.js";

// const catList = document.querySelector("#product-list");
const productNums = document.getElementById("results-count");
const products = JSON.parse(localStorage.getItem("products")) || [];

// product NUmbers set from localStorage for now !!!
productNums.textContent = `${products.length} products`;


// Central filter state (add more keys later: brand, size, color...)

const state = {
    category: null,
    subCategories: new Set(),
    brand: new Set(),
    size: new Set(),
    color: new Set(),
    minPrice: null,
    maxPrice: null,
    discount: null,
    offers: null,
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

            ProductList("product-list", state);;
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
            filterProductBySize();
            filterProductByBrand();
            ProductList("product-list", state);
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
            ProductList("product-list", state);
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
            ProductList("product-list", state);
        });
    });
};









// base filter 
filterProductByCategory();

// depend on category filter
filterProductByProductType();

//  depend on category and subcategory filters
filterProductByBrand();

// depend on category, subcategory and brand filters
filterProductBySize();




// Initial product list load
ProductList("product-list", state);




