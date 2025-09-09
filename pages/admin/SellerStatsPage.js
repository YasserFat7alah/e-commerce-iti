import View from "../../components/core/view.js";
import { renderSellersStats } from "../../components/dashboard/admin-stats.js";

export default class SellersStatsPage extends View {
    template() {
        return `
        <div class="col-12">
            <h2 class="mb-0"><i class="fas fa-chart-bar me-2"></i>All Seller Stats</h2>
            <p class="text-muted">Overview of <span class="fw-bold text-primary">AYAAM</span>'s Sellers </p>
        </div>
        <div id="sellertStatsPageContainer"></div>`;
    }

    script() {
        const container = document.getElementById("sellertStatsPageContainer");
        renderSellersStats(container);
    }
}