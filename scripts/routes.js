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
    cart: Cart ,
};

/* ---List of user privilages and pages each can access--- */
const allowedRoutes = {
    Admin: Object.keys(routes), //Can Access all Pages
    User: ['home', 'catalog', 'cart'],
    Seller: ['seller', 'home', 'catalog']
}; 

export default function router(_page) {
    // Takes the page name from routes as an input and renders the page.
    // if the user has no access to the page it returns to the first page of allowed pages.

    const loggedUser = getData('loggedUser')[0];

    // go home if no user is registered
    if (!loggedUser) {
        document.getElementById('app').innerHTML = Home();
        return;
    }

    const role = loggedUser.role;

    if (!allowedRoutes[role] || !allowedRoutes[role].includes(_page)) {
        console.log(allowedRoutes[role].includes(_page)) 
        document.getElementById('app').innerHTML = routes[allowedRoutes[role][0]]();
    } else {
        const page = routes[_page]
        console.log(page)
        document.getElementById('app').innerHTML = page();
    }

    // document.getElementById('app').innerHTML = routes[allowedRoutes[role][0]]();
}