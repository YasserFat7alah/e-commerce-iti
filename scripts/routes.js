
import Navbar from './../components/ui/Navbar.js';
import AdminDashboard from '../pages/AdminDashboard.js';
import Home from '../pages/Home.js';
import Cart from '../pages/Cart.js';
import Catalog from '../pages/Catalog.js';
import SellerDashboard from '../pages/SellerDashboard.js';
import { getData } from './data-init.js';

// Route configuration
const routes = {
    '#/': Home,
    '#/home': Home,
    '#/catalog': Catalog,
    '#/cart': Cart,
    '#/admin': AdminDashboard,
    '#/seller': SellerDashboard
};

export function initRouter() {
    // Add navbar to DOM
    document.body.insertAdjacentHTML('afterbegin', Navbar());
    
    // Handle route buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-btn')) {
            e.preventDefault();
            const route = e.target.getAttribute('data-route');
            window.location.hash = route;
        }
    });

    // Handle initial load and hash changes
    window.addEventListener('load', handleHashChange);
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial route
    handleHashChange();
}

function handleHashChange() {
    const hash = window.location.hash || '#/';
    const path = Object.keys(routes).find(route => route === hash) || '#/';
    
    // Update active button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const btnRoute = btn.getAttribute('data-route');
        btn.classList.toggle('active', `#${btnRoute}` === path);
    });
    
    // Render the component
    const component = routes[path] || Home;
    document.getElementById('app').innerHTML = component();
}

// Helper function to navigate programmatically
export function navigate(path) {
    window.location.hash = path;
}