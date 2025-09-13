import View from "../../components/core/view.js";
import { renderProductsStats } from "../../components/dashboard/admin-stats.js";

export default class ProductsStatsPage extends View {
    template() {
        return `
        <div class="col-12">
            <h2 class="mb-0"><i class="fas fa-chart-bar me-2"></i>All Products Stats</h2>
            <p class="text-muted">Overview of <span class="fw-bold text-primary">AYAAM</span>'s Products </p>
        </div>
        <div id="productStatsContainer"></div>`;
    }

    script() {
        const container = document.getElementById("productStatsContainer");
        renderProductsStats(container);
    }
}