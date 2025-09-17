import { getCurrentUser } from "../../data/authentication.js"

export default function Footer() {
  const currentUser = getCurrentUser()
  return `

  <div class="container text-md-left" data-fade>
    <div class="row text-md-left">

      <!-- Brand / About -->
      <div class="col col-12 col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
        <h5 class="mb-4 font-weight-bold text-uppercase">AYAAM</h5>
        <p>
          AYAAM is the new wave of eCommerce — a space where sellers, shoppers, and creators all play a role. Think of it as a marketplace with personality, built for connection as much as for commerce.
        </p>
      </div>

      <!-- Links -->
      <div class="col col-6 col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
        <h5 class="mb-4 font-weight-bold text-uppercase">Quick Links</h5>
        <p><a href="#/home" class="text-light text-decoration-none" data-route>Home</a></p>
        ${currentUser ?
      `
        <p><a href="#/profile" class="text-light text-decoration-none" data-route>Profile</a></p>
        `
      :
      ` <p><a href="#/login" class="text-light text-decoration-none" data-route>Login</a></p>
          <p><a href="#/signup" class="text-light text-decoration-none" data-route>Sign Up</a></p>
        `
    }
        <p><a href="#/catalog" class="text-light text-decoration-none" data-route>Catalog</a></p>
        <p><a href="#/about" class="text-light text-decoration-none" data-route>About Us</a></p>
        
      </div>

      <!-- Useful Links -->
      <div class=" col col-6 col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
        <h5 class="mb-4 font-weight-bold text-uppercase">Help</h5>
        <p><a href="https://www.facebook.com/ITITantaBranch/" target="_blank" class="text-light text-decoration-none">ITI - Tanta Branch</a></p>
        <p><a href="#/info/policy" class="text-light text-decoration-none">Privacy & Policy</a></p>
        <p><a href="#/info/terms" class="text-light text-decoration-none">Terms of use</a></p>
        <p><a href="#/info/faqs" class="text-light text-decoration-none" data-route>FAQs</a></p>
        ${ (currentUser?.role !== 'admin' && currentUser?.role !== 'seller' )? `<p><a href="#/sell-with-us" class="text-light text-decoration-none" data-route>Sell with AYAAM</a></p>`: ''}
      </div>

      <!-- Contact -->
      <div class="col col-12 col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
        <h5 class="mb-4 font-weight-bold text-uppercase">Contact</h5>
        <p><i class="bi bi-house-fill"></i> Tanta, Gharbia, EG</p>
        <p><a href="mailto:support@ayaam.example" style="text-decoration: none;"><i class="fa-solid fa-envelope"></i> support@ayaam.example </a></p>
        <p><i class="bi bi-phone-fill"></i> +1 234 567 88</p>
        <!-- Social Media -->
        <div class=" ms-0 text-left">
          <a href="#" class='mx-1'><i class="fa-brands fa-facebook fa-fw"></i></a>
          <a href="#" class='mx-1'><i class="fa-brands fa-instagram fa-fw"></i></a>
          <a href="#" class='mx-1'><i class="fa-brands fa-github fa-fw"></i></a>
          <a href="#" class='mx-1'><i class="fa-brands fa-linkedin fa-fw"></i></a>
        </div>
      </div>
    </div>

    <hr class="mb-4">

    
    <div class="row text-center">
      <div class="col col-12">
        <p class="mb-0">© 2025 AYAAM. All rights reserved.</p>
      </div>
      
    </div>
  </div>

    `
}