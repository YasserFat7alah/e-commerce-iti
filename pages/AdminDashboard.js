//admin dashboard
import Views from "../components/core/view.js";
import { Sidebar, SidebarEvents } from "../components/ui/sidebar.js";
import { getCurrentUser } from './../data/authentication.js';
import Toast from "../components/ui/toast.js";
import OrdersPage from "./admin/OrdersPage.js";
import ProductsPage from "./admin/ProductsPage.js";
import ProductsStatsPage from "./admin/ProductsStatsPage.js";
import SellerStatsPage from "./admin/SellerStatsPage.js";
import UsersPage from "./admin/UsersPage.js";
import UsersStatsPage from "./admin/UserStatsPage.js";
import OrdersStatsPage from "./admin/Orders-StatsPage.js";



export default class AdminDashboard extends Views {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'Admin Dashboard | AYAAM'
        }, _params);

    }
    template() {
        const user = getCurrentUser();
        if (!user) return `<p>Please log in</p>`;
        const userName = user.name.split(' ')[0];
        const sections = [
            {
                id: "ecommerce",
                title: "Management",
                icon: "fas fa-store",
                items: [
                    { id: "products", title: "Products", icon: "fas fa-box", url: "/products" },
                    { id: "users", title: "Users", icon: "fas fa-users", url: "/users" },
                    { id: "orders-count", title: "Orders", icon: "fa fa-shopping-cart", url: "/orders" }
                ]
            },
            {
                id: "stats",
                title: "Statistics",
                icon: "fas fa-chart-line",
                items: [
                    { id: "sellers-count", title: "Sellers Stats", icon: "fas fa-user-tag", url: "/sellersStats" },
                    { id: "user-count", title: "Users Stats", icon: "fas fa-user-tag", url: "/usersStats" },
                    { id: "products-count", title: "Products Stats", icon: "fas fa-cube", url: "/productsStats" },
                    { id: "orders-stats", title: "Orders Stats", icon: "fa fa-shopping-cart", url: "/ordersStats" }
                ]
            }
        ];

        return `
        <div class="toast-body" id="toastMsg"></div>
            <div class="container-fluid">
                <div class="row">
                    ${Sidebar('/admin', sections, userName)}
                    
                    <main class="col pt-3" id="main">
                        <div class="row">
                            <div class="col-12" id="adminContent">
                            <h1 class="text-center">Admin Dashboard</h1>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        `;
    }
    script() {
        this.mount(Toast, "#toastMsg");
        this.subview(UsersPage, { parent: "adminContent", route: "users", title: "Users | AYAAM" });
        this.subview(ProductsPage, { parent: "adminContent", route: "products", title: "Products | AYAAM" });
        this.subview(OrdersPage, { parent: "adminContent", route: "orders", title: "Orders Management | AYAAM" });
        this.subview(SellerStatsPage, { parent: "adminContent", route: "sellersStats", title: "Seller Stats | AYAAM" });
        this.subview(UsersStatsPage, { parent: "adminContent", route: "usersStats", title: "Users Stats | AYAAM" });
        this.subview(ProductsStatsPage, { parent: "adminContent", route: "productsStats", title: "Products Stats | AYAAM" });
        this.subview(OrdersStatsPage, { parent: "adminContent", route: "ordersStats", title: "Orders Stats | AYAAM" });

        // default route if hash empty
        if (!location.hash || !location.hash.startsWith("#/admin/")) {
            location.hash = "#/admin/productsStats";
        }
        SidebarEvents();


    }
}
