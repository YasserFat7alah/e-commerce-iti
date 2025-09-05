import View from "../../components/core/view.js";
import { renderUsersStats } from "../../components/dashboard/admin-stats.js";

export default class UsersStatsPage extends View {
    template() {
        return `
        <div class="col-12">
            <h2 class="mb-0"><i class="fas fa-chart-bar me-2"></i>All Users Stats</h2>
            <p class="text-muted">Overview of <span class="fw-bold text-primary">AYAAM</span>'s Users </p>
        </div>
        <div id="usersStatsPageContainer"></div>`;
    }

    script() {
        const container = document.getElementById("usersStatsPageContainer");
        renderUsersStats(container);
    }
}