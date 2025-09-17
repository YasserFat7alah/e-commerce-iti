import View from "../components/core/view.js";
import Footer from "../components/landing/Footer.js";
import Navbar from "../components/landing/Nav.js";
import FloatBtns from "../components/ui/floating.js";



export default class AboutPage extends View {
    constructor(_config, _params = {}) {
        // Call base constructor
        super({
            title: 'About Us | AYAAM'
        }, _params);

    }
    template() {
        return `
        <header class="sticky-top bg-white" id='navbar' data-fade></header>
        <div id="floatBtns"></div>
        <main>
            <section class="about-section container " data-fade>
                    <h2 class="col col-12 mb-5" style="font-size: 2.5rem;">About Our Project</h2>
                    <p class="text-muted mb-5">
                        AYAAM is a collaborative milestone project built with passion and curiosity.
                        It was created as a collective effort to apply what we learned during the CST course in the <a href="https://iti.gov.eg/services/programCategory/details/90eb9189-6cd2-4ed1-6890-08dbe5cce072" target="_blank">ITI ITP program</a>. Using native JavaScript, we developed a Single Page Application (SPA), which gave us the chance to explore how SPAs work under the hood. Through this journey, we gained valuable experience, discovered new concepts, and remain eager to continue learning and growing.
                    </p>
                </div>
                <hr>
            </section>


            <div class="container" >
                <div class="row text-center mb-5 w-100" data-fade>
                    <h2 class="col col-12" style="font-size: 2.5rem;">Meet Our Team</h2>
                    <p class="text-muted" s>- The people who brought AYAAM to life -</p>
                </div>

                <div class="our-cards">


    <!-- YASSER -->
                <div class="" data-fade>
                    <div class=" team-card">
                        <img src="/assets/images/us/yas.jpg" alt="Yasser Fathallah" >
                        <div class="team-overlay">
                            <h5>Yasser Fathallah </h5>
                            <h6>Team Leader</h6>
                            <p>Turning ideas into interactive experiences.</p>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/yasserfat7alah/" target="_blank"><i class="fa-brands fa-linkedin"></i></i></a>
                                <a href="https://www.facebook.com/share/17RnqkgCdA/" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                                <a href="https://www.instagram.com/yasserfat7alah?igsh=Znp2bDYwdjJrdTlm" target="_blank"><i class="fab fa-instagram"></i></a>
                                <a href="https://github.com/YasserFat7alah" target="_blank"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

    <!-- BELTAGY -->
                <div class="" data-fade>
                    <div class=" team-card">
                        <img src="/assets/images/us/beltagy.jpg" alt="Yasser Fathallah" >
                        <div class="team-overlay">
                            <h5>Ahmed Beltagy</h5>
                            <p>Full Stack Web Developer.</p>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/yasserfat7alah/" target="_blank"><i class="fa-brands fa-linkedin"></i></i></a>
                                <a href="https://www.facebook.com/share/17RnqkgCdA/" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                                <a href="https://www.instagram.com/yasserfat7alah?igsh=Znp2bDYwdjJrdTlm" target="_blank"><i class="fab fa-instagram"></i></a>
                                <a href="https://github.com/YasserFat7alah" target="_blank"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

    <!-- OSSAMA -->
                <div class="" data-fade>
                    <div class=" team-card">
                        <img src="/assets/images/us/ossama.jpg" alt="Yasser Fathallah" >
                        <div class="team-overlay">
                            <h5>Ahmed Ossama </h5>
                            <p>Full Stack Web Developer.</p>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/yasserfat7alah/" target="_blank"><i class="fa-brands fa-linkedin"></i></i></a>
                                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div class="our-cards">
    <!-- AZZA -->
                <div class="" data-fade>
                    <div class=" team-card">
                        <img src="/assets/images/us/azza.jpg" alt="Yasser Fathallah" >
                        <div class="team-overlay">
                            <h5>Azza Sallam </h5>
                            <p>Full Stack Web Developer.</p>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/azza-sallam512/" target="_blank"><i class="fa-brands fa-linkedin"></i></i></a>
                                <a href="https://www.facebook.com/azza.sallam512"><i class="fa-brands fa-facebook"></i></a>
                                <a href="https://www.instagram.com/azzaa_sallam?igsh=MTlrYXQ4eHA5eWRnNA=="><i class="fab fa-instagram"></i></a>
                                <a href="https://github.com/AzzaSallam"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

    <!-- MARIAM -->
                <div class="" data-fade>
                    <div class=" team-card">
                        <img src="/assets/images/us/mariam.jpg" alt="Yasser Fathallah" >
                        <div class="team-overlay">
                            <h5>Mariam Khaled</h5>
                            <p>Full Stack Web Developer.</p>
                            <div class="social">
                                <a href="https://www.linkedin.com/in/yasserfat7alah/" target="_blank"><i class="fa-brands fa-linkedin"></i></i></a>
                                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </main>
        <footer class="bg-dark text-light pt-5 pb-4 mt-5" id='footer' data-fade>${Footer()}</footer>
        `
    }

    script() {
        this.mount(Navbar, "#navbar");
        this.mount(FloatBtns, "#floatBtns");
    }
    
}