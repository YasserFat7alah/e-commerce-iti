import View from "../components/core/view.js";
import Footer from "../components/landing/Footer.js";
import Navbar from "../components/landing/Nav.js";
import ProfileForm from "../components/profile/ProfileForm.js";
import TableOrders from "../components/profile/TableOrders.js";
import Toast from './../components/ui/toast.js';
import FloatBtns from "../components/ui/floating.js";


export default class Profile extends View {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'Profile | AYAAM'
        }, _params);

    }

    template() {
        return `
        <header class="sticky-top bg-white" id='navbar'></header>
        <div id="toast"></div>
        <div id="floatBtns"></div>
        <div class="container">
            <div class="row">
                <!-- Main Content -->
                <div class=" col-md-4  p-3 " id="profile-form">
                
                </div>

                <div id="orders-table" class="col-md-8 p-3"></div>
            </div>
        </div>
        <footer class="bg-dark text-light pt-5 pb-4 mt-5" id='footer'>${Footer()}</footer>
        `
    }

    script() {
        this.mount(Navbar, "#navbar");
        this.mount(Toast, "#toast");
        this.mount(FloatBtns, "#floatBtns");
        this.mount(ProfileForm, "#profile-form");
        this.mount(TableOrders, "#orders-table");
       
    }
    
}