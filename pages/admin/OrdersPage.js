import View from "../../components/core/view.js";
import { renderOrders } from "../../components/dashboard/OrdersPage.js";

export default class OrdersPage extends View {
    template() {
        return `<div id="odersContainer"></div>`;
    }

    script() {
        const container = document.getElementById("odersContainer");
            renderOrders(container);

    }
}