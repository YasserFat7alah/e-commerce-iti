import View from "../../components/core/view.js";
import { renderOrdersDashboard } from "../../components/dashboard/admin-orders.js";

export default class OrdersStatsPage extends View {
    template() {
        return `<div id="odersContainer"></div>`;
    }

    script() {
        const container = document.getElementById("odersContainer");
            renderOrdersDashboard(container);

    }
}