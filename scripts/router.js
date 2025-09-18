import { getCurrentUser, logout } from "../data/authentication.js";
import { parseQuery, navigate } from "./utils/navigation.js";
import { sessionStore } from "./utils/storage.js";

export default class Router {
    constructor(_routes, _rootId = "app") {
        this.routes = _routes;
        this.root = document.getElementById(_rootId);
        this.currentView = null;

        window.addEventListener("DOMContentLoaded", () => this.resolve());
        window.addEventListener("hashchange", () => this.resolve());

        // Intercept <a data-route> clicks
        document.body.addEventListener('click', (e) => {
            const a = e.target.closest('a[data-route]');
            if (!a) return;

            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

            e.preventDefault();
            navigate(a.getAttribute('href'));
        });
    }

    async resolve() {
        try {
            // REDIRECT TO HOME (NO HASH)
            if (!location.hash || location.hash === "#/") {
                navigate("/home");
                return;
            }

            // get the hash
            let fullPath = location.hash.slice(1) || "/home";
            if (fullPath === "/") fullPath = "/home";

            const [pathPart, queryString] = fullPath.split("?");
            const params = parseQuery(queryString || "");

            // sign the redirect page
            if (pathPart !== '/login' && pathPart !== '/signup' && pathPart !== '/404' && pathPart !== '/confirm-seller') {
                sessionStore.write('redirectedPage', fullPath);
            }


            let ViewClass = null;   // page to render 
            let baseRoute = null;   // main path part
            let routeConfig = null; // page details (page to load + roles) 

            // Find the best matching route (longest prefix match)
            for (const route in this.routes) {
                if (pathPart === route || pathPart.startsWith(route)) {

                    if (!baseRoute || route.length > baseRoute.length) {
                        routeConfig = this.routes[route];
                        baseRoute = route;
                    }
                }
            }

            if (!routeConfig) {
                routeConfig = this.routes["/404"];
                baseRoute = "/404";
            }

            if (routeConfig.roles) {

                const user = getCurrentUser();
                if (!user) {
                    if (pathPart.startsWith("/sell-with-us")) {
                        navigate('/signup');
                        return
                    }
                    navigate("/login");
                    return;
                }
                if (!routeConfig.roles.includes(user.role)) {
                    navigate("/404");
                    return;
                }
                if (user.role === "seller") {
                    if (user.status === "inactive") {
                        if (pathPart.startsWith("/seller")) {
                            navigate("/home");
                            sessionStore.write('fallback-msg', "You can't access your shop. Your data are under review.");
                            return;
                        }
                    }
                    if (user.status === "banned") {
                        sessionStore.write('fallback-msg', "You Are banned!");
                        logout();
                        return;
                    }
                }
            }

            // If already inside the same view → just forward to subroute
            if (this.currentView && this.currentView.route === baseRoute) {

                this.currentView.onSubRoute(pathPart, params);

                return;
            }

            // Cleanup previous view
            if (this.currentView) this.currentView.onLeave();
            
            // Handle lazy loaded routes
            if (typeof routeConfig.loader === "function") {
                try {
                    const module = await routeConfig.loader();
                    ViewClass = module.default;
                } catch (error) {
                    console.error("Failed to load route:", baseRoute, error);
                    routeConfig = this.routes["/404"];
                    ViewClass = (await routeConfig.loader()).default;
                    baseRoute = "/404";
                }
            } else {
                ViewClass = routeConfig.loader; // Static route
            }

            if (!ViewClass) {
                routeConfig = this.routes["/404"];
                ViewClass = (await routeConfig.loader()).default;
                baseRoute = "/404";
            }

            // Create new view
            this.currentView = new ViewClass(
                { parent: this.root, route: baseRoute },
                params
            );
            this.currentView.render();
            scrollAnimate();

            if (this.currentView.onSubRoute) {
                this.currentView.onSubRoute(pathPart, params);
            }


        } catch (error) {
            console.error("Router error:", error);


            // Fallback to 404
            const fallbackLoader = this.routes["/404"].loader;
            let FallbackClass;

            if (typeof fallbackLoader === "function") {
                const module = await fallbackLoader();
                FallbackClass = module.default;
            } else {
                FallbackClass = fallbackLoader;
            }

            this.currentView = new FallbackClass({ parent: this.root, route: "/404" });
            this.currentView.render();
            scrollAnimate();
        }
    }
}

export function scrollAnimate() {
    // simple fade-in animation on scroll
    const elements = document.querySelectorAll('[data-fade]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.2 });
    elements.forEach(el => observer.observe(el));
}