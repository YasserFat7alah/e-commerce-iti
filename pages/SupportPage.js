import View from "../components/core/view.js";
import Footer from "../components/landing/Footer.js";
import Navbar from "../components/landing/Nav.js";
import Toast from "../components/ui/toast.js";
import FaqsPage from "./info/FaqsPage.js";
import PrivacyPage from "./info/PrivacyPage.js";
import ReachUsPage from "./info/ReachUs.js";
import TermsPage from "./info/TermsPage.js";
import FloatBtns from "../components/ui/floating.js";

export default class SupportPage extends View {
  template() {
    return `
      <header class="sticky-top bg-white" id='navbar'></header>
      <div class="toast-body" id="toastMsg"></div>
      <div id="floatBtns"></div>
      <section>
        <nav class="tabs-nav">
          <a href="#/info/policy" class="tab-link" data-route>Privacy & Policy</a>
          <a href="#/info/terms" class="tab-link" data-route>Terms & Conditions</a>
          <a href="#/info/faqs" class="tab-link" data-route>FAQs</a>
          <a href="#/info/reach-us" class="tab-link" data-route>Reach Us</a>
        </nav>
        <div id="subview-slot"></div>
      </section>
      <footer class="bg-dark text-light pt-5 pb-4 mt-5" id='footer'>${Footer()}</footer>
    `;
  }

  script() {
    this.mount(Toast, "#toastMsg")
    this.mount(Navbar, "#navbar");
    this.mount(FloatBtns, "#floatBtns");

    console.log(this.parent.querySelector("#subview-slot"));

    // register subviews
    this.subview(TermsPage, {
      parent: "subview-slot",
      route: "terms",
      title: "Terms & Conditions | AYAAM"
    });

    this.subview(PrivacyPage, {
      parent: "subview-slot",
      route: "policy",
      title: "Privacy Policy | AYAAM"
    });

    this.subview(FaqsPage, {
      parent: "subview-slot",
      route: "faqs",
      title: "FAQs | AYAAM"
    });

    this.subview(ReachUsPage, {
      parent: "subview-slot",
      route: "reach-us",
      title: "Reach us | AYAAM"
    });

    // default route if hash empty
    if (!location.hash || !location.hash.startsWith("#/info/")) {
      location.hash = "#/info/policy";
    }

    this.updateActiveTab();
    window.addEventListener("hashchange", () => this.updateActiveTab());
  }

  updateActiveTab() {
    const currentHash = location.hash;
    const links = document.querySelectorAll(".tabs-nav .tab-link");
    links.forEach(link => {
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
}