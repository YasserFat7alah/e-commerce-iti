import ProductList from '../components/products/ProductList.js';

export default function Catalog() {
    return `
        <main class="catalog-page">
            <h1>Our Products</h1>
            ${ProductList()}
        </main>
    `;
};

