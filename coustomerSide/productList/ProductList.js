import { ProductCard } from "../productCard/productCard.js";


// handles rendering list of products

export function ProductList(containerId,state) {

  const container = document.getElementById(containerId);
  container.innerHTML = "";




  const products = JSON.parse(localStorage.getItem("products")) || [];
  let filtered = [...products];


  // Filter by category
  if (state.category) {
    filtered = filtered.filter(p => p.category === state.category);
  };


  // Filter by subcategories (if any selected)
  if(state.subCategories.size > 0){
    filtered = filtered.filter(p => state.subCategories.has(p.subcategory));
  };


  // Filter by brand (if any selected)
  if(state.brand.size > 0){
    filtered = filtered.filter(p => state.brand.has(p.brand));
  };




  // if no Filter found
  if(filtered.length === 0){
    const noProductsMessage = document.createElement("div");
    noProductsMessage.className = "alert alert-dark";
    noProductsMessage.textContent = "No products found for the selected filters.";
    container.appendChild(noProductsMessage);
    return;
  }

  filtered.forEach(product => {
    const card = ProductCard(product);
    container.appendChild(card);
  });




};

