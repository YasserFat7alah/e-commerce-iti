import View from "../components/core/view.js";
import Navbar from "../components/landing/Nav.js";
import { ads } from '../data/ads/ads.js'
import HeroSection from "../components/landing/HeroSection.js";
import Slider from "../components/landing/Slider.js";
import Footer from "../components/landing/Footer.js";
import Newsletter from "../components/landing/Newsletter.js";
import Toast from "../components/ui/toast.js";
import CardsSection from "../components/landing/Section.js";
import { localStore, sessionStore } from "../scripts/utils/storage.js";
import FloatBtns from "../components/ui/floating.js";

export default class HomePage extends View {
  constructor(_config, _params = {}) {
    // Call base constructor
    super({
      title: 'Home | AYAAM'
    }, _params);

  }
  template() {
    return `
            <header class="sticky-top bg-white" id='navbar' data-fade></header>
            <div class="toast-body" id="toastMsg"></div>
            <div id="floatBtns"></div>
            <section class="container-fluid" id="hero" data-fade></section>

      <!-- Brands Slider -->
            <section id='slider' data-fade>${Slider()}</section>
      
      <!-- Featured Section -->
            <section id='featured-section' data-fade></section>
      
      <!-- News Letter --> 
            <section id='newsletter' data-fade></section>

            <footer class="bg-dark text-light pt-5 pb-4 mt-5" id='footer' data-fade>${Footer()}</footer>
        `;
  }



  script() {
    const prods = localStore.read('products', [])
      .filter(prod => prod.status === "approved" && prod.sale > 0)
      .sort(()=> Math.random()-0.5)
      .slice(0, 4);
    
    

    this.mount(Toast, "#toastMsg")
    this.mount(Navbar, "#navbar");
    this.mount(FloatBtns, "#floatBtns");
    this.mount(HeroSection, '#hero', { ads });

    this.mount(CardsSection, '#featured-section', {
      id: 'featured',
      title: "Featured Items",
      items: prods,
    })
    this.mount(Newsletter, '#newsletter');

    const _fallback = sessionStore.read('fallback-msg', '')
    if (_fallback) {
      Toast.notify(_fallback, 'danger');
      sessionStore.write('fallback-msg', '');
    }
  }

  render() {
    this.onEnter();

    if (!this.parent) {
      console.warn(`No parent found for ${this.constructor.name}`);
      return;
    }

    this.parent.innerHTML = this.template();
    this.script();
  }
}

