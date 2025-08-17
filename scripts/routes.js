import AdminDashboard from '../pages/AdminDashboard.js';
import Home from '../pages/Home.js';
import Cart from '../pages/Cart.js';
import Catalog from '../pages/Catalog.js';
import SellerDashbaord from '../pages/SellerDashboard.js';

import { setData, getData } from './data-init.js';

/* ---Routes--- */
const routes = {
    admin: AdminDashboard,
    seller: SellerDashbaord,
    home: Home,
    catalog: Catalog,
    cart: Cart
};

/* ---List of user privileges and pages each can access--- */
const allowedRoutes = {
    Admin: Object.keys(routes), //Can Access all Pages
    User: ['home', 'catalog', 'cart'],
    Seller: ['seller', 'home', 'catalog']
}; 

export default function router(_page, push = true) {
    const loggedUser = getData('loggedUser')[0];

    // go home if no user is registered
    if (!loggedUser) {
        document.getElementById('app').innerHTML = Home();
        if (push) history.pushState({ page: 'home' }, '', '/home');
        return;
    }

    const role = loggedUser.role;

    let targetPage = _page;

    if (!allowedRoutes[role] || !allowedRoutes[role].includes(_page)) {
        targetPage = allowedRoutes[role][0];
    }

    const page = routes[targetPage];
    document.getElementById('app').innerHTML = page();

    // push to history only if it's a new navigation
    if (push) {
        history.pushState({ page: targetPage }, '', `/${targetPage}`);
    }
}

/* ---Handle back/forward buttons--- */
window.addEventListener('popstate', (e) => {
    const state = e.state;
    if (state && state.page) {
        router(state.page, false); // false = ما تعملش pushState تاني
    } else {
        router('home', false);
    }
});

/* ---Load initial page on refresh--- */
window.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.replace('/', '') || 'home';
    router(path, false);
});