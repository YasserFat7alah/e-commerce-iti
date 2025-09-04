import View from "../../components/core/view.js";
import { renderProducts } from "../../components/dashboard/admin-products.js";

export default class ProductsPage extends View {
    template() {
        return `<div id="productsPageContainer"></div>`;
    }

    script() {
        const container = document.getElementById("productsPageContainer");
            renderProducts(container);

    }
}