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

            ProductList("product-list", state);;
        });
    });
};




function filterProductByProductType() {
    const productTypes = [...new Set(products.map(p => p.subcategory))];
    const productSubCat = document.getElementById("subcat-options");
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
            ProductList("product-list", state);
        });
    })
};
































filterProductByCategory();

filterProductByProductType();


// Initial product list load
ProductList("product-list",state);




