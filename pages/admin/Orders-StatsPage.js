import View from "../../components/core/view.js";
import { renderOrdersAnalytics } from "../../components/dashboard/orders-stats.js";


export default class OrdersStatsPage extends View {
    template() {
        return `<div id="odersContainer"></div>`;
    }

    script() {
        const container = document.getElementById("odersContainer");
            renderOrdersAnalytics(container);

    }
}