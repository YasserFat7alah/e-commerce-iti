import View from "../components/core/view.js";
import { Sidebar, SidebarEvents } from "../components/ui/sidebar.js";
import { getCurrentUser } from './../data/authentication.js';
import Toast from "../components/ui/toast.js";

import MainDasboard from "./seller/MainDashboard.js";
import SellerProducts from "./seller/SellerProducts.js";
import IncomingOrders from "./seller/IncomingOrders.js";
import AddProduct from "./seller/AddProduct.js";
import SalesHistory from "./seller/SalesHistory.js";

export default class SellerDashboard extends View {
    constructor(_config, _params = {}) {
        super({
            title: "Seller Dashboard | AYAAM"
        }, _params);
    }

    template() {
        const user = getCurrentUser();
        if (!user) return `<p>Please log in</p>`;
        const userName = user.name.split(" ")[0];

        const sections = [
            {
                id: "management",
                title: "Store Management",
                icon: "fas fa-store",
                items: [
                    { id: "dashboard", title: "Dashboard", icon: "fas fa-home", url: "/dashboard" },
                    { id: "addproduct", title: "Add Product", icon: "fas fa-plus", url: "/addproduct" },
                    { id: "products", title: "Products", icon: "fas fa-box", url: "/products" },
                ]
            },
            {
                id: "statistics",
                title: "Store Statistics",
                icon: "fas fa-chart-line",
                items: [
                    { id: "incoming", title: "Orders", icon: "fas fa-truck", url: "/incomeingOrders" },
                    { id: "sales", title: "Sales History", icon: "fas fa-history", url: "/salesHistory" }
                ]
            },
        ];

        return `
        <div class="toast-body" id="toastMsg"></div>
        <div class="container-fluid">
            <div class="row">
                ${Sidebar('/seller' ,sections, userName)}

                <main class="col pt-3" id="main">
                    <div class="row">
                        <div class="col-12" id="seller-dashbord">
                            <h1 class="text-center">Seller Dashboard</h1>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        `;
    }

    script() {
        this.mount(Toast, "#toastMsg");

        this.subview(MainDasboard, {parent: "seller-dashbord", route: "dashboard", title: "Seller - Dashboard"
        });

        this.subview(SellerProducts, { parent: "seller-dashbord", route: "products", title: "Seller - Products"
        });

        this.subview(AddProduct, {
            parent: "seller-dashbord",
            route: "addproduct",
            title: "Add New Product"
        });

        this.subview(IncomingOrders, {
            parent: "seller-dashbord",
            route: "incomeingOrders",
            title: "Seller - Incoming Orders"
        });

        this.subview(SalesHistory, {
            parent: "seller-dashbord",
            route: "salesHistory",
            title: "Seller - Sales History"
        });

        // default route
        if (!location.hash || !location.hash.startsWith("#/seller/")) {
            location.hash = "#/seller/dashboard";
        }

        SidebarEvents();
    }
}