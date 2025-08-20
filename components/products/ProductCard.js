export default function ProductCard(product) {
    
        return `
        <div class="card mb-4" style="width: 18rem;">
            <img src="../../data/imgs/products/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}/${product.id.toLowerCase()}/${product.stock[0].images[0]}" class="card-img-top" alt="${product.name}">
            <h3 id="brandname">${product.brand}</h3>
            <div>
                <span class="badge bg-secondary">${product.category}</span>
                <span class="badge bg-secondary">${product.subcategory}</span>
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-success">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
};
