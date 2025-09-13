import { ProductCard } from "../productCard/productCard.js";

// handles rendering list of products

export function ProductList(containerId, productNumsId, state) {

  const container = document.getElementById(containerId);
  const productNums = document.getElementById(productNumsId);

  if (!container) {
    // console.warn(`ProductList container not found(renderd) yet`);
    return;
  };

  container.innerHTML = "";


  const products = JSON.parse(localStorage.getItem("products")) || [];
  let filtered = [...products];
  
  filtered = filtered.filter(p => !p.status || p.status === "approved");

  // Apply search filter
  if (state.search) {
    const terms = state.search.toLowerCase().split(/\s+/).filter(Boolean);
    filtered = filtered.filter((p) => {
      if (!p) return false;

      // Collect searchable text from all fields
      const searchable = [
        p.subcategory || "",
        p.name || "",
        p.brand || "",
        p.category || "",
        ...(p.stock || []).map(s => s.color || "")
      ]
        .join(" ")
        .toLowerCase();

      return terms.every(term => searchable.includes(term));
    });
  }


  // Filter by category
  if (state.category) {
    filtered = filtered.filter(p => p.category === state.category);
  };


  // Filter by subcategories (if any selected)
  if (state.subCategories.size > 0) {
    filtered = filtered.filter(p => state.subCategories.has(p.subcategory));
  };


  // Filter by brand (if any selected)
  if (state.brand.size > 0) {
    filtered = filtered.filter(p => state.brand.has(p.brand));
  };

  // Filter by Size (if any selected)
  if (state.size && state.size.size > 0) {
    filtered = filtered.filter(p =>
      (p.stock || []).some(variant =>
        (variant.sizes || []).some(size =>
          state.size.has(size.name) // check if product has at least one selected size
        )
      )
    );
  }


  // Filter by color (if any selected)
  if (state.color && state.color.size > 0) {
    filtered = filtered.filter(p =>
      (p.stock || []).some(variant =>
        state.color.has(variant.color)
      )
    );
  }


  // Filter by Price (if min/max are set)
  if (state.minPrice !== null || state.maxPrice !== null) {
    filtered = filtered.filter(p => {
      const price = p.price || 0;

      const meetsMin = state.minPrice !== null ? price >= state.minPrice : true;
      const meetsMax = state.maxPrice !== null ? price <= state.maxPrice : true;

      return meetsMin && meetsMax;
    });
  }



  // Filter by discount
  if (state.discount !== null) {
    if (state.discount === "any") {
      filtered = filtered.filter(p => (p.sale || 0) > 0);
    } else {
      const threshold = parseFloat(state.discount);
      filtered = filtered.filter(p => (p.sale || 0) >= threshold);
    }
  }



  // Filter by offers
  if (state.offers.size > 0) {
    filtered = filtered.filter(p =>
      (p.offers || []).some(offer => state.offers.has(offer))
    );
  }



  // if no Filter found
  if (filtered.length === 0) {
    const noProductsMessage = document.createElement("div");
    noProductsMessage.className = "alert alert-dark";
    noProductsMessage.textContent = "No products found for the selected filters.";
    productNums.textContent = `No products`;
    container.appendChild(noProductsMessage);
    return;
  }

  filtered.forEach(product => {
    const card = ProductCard(product);
    container.appendChild(card);
  });



  //  Update the product count after filtering
  if (productNums) {
    productNums.textContent = `${filtered.length} products`;
  }


};





