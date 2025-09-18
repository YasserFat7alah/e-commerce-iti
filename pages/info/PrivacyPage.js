import View from "../../components/core/view.js";



export default class PrivacyPage extends View {

    template() {
        return `
        <!-- Hero -->
  <header class="hero py-5 mb-4">
    <div class="container">
      <div class="row align-items-center justify-content-between g-3">
        <div class="col-lg-8">
          <span class="badge badge-brand rounded-pill mb-3"><i class="fa-solid fa-shield"></i> Privacy First</span>
          <h1 class="display-5 fw-bold mb-2 ">Privacy Policy</h1>
          <p class="lead text-muted mb-0">We respect your privacy and are committed to protecting it across AYAAM.</p>
        </div>
        <div class="col-lg-4 text-lg-end">
          <div class="text-muted">Last updated: <strong class="">August 29, 2025</strong></div>
          <small class="d-block text-muted">Questions? <a href="mailto:support@ayaam.example" class="text-decoration-underline">support@ayaam.example</a></small>
        </div>
      </div>
    </div>
  </header>

  <main class="container pb-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">
        <div class="policy-card p-4 p-md-5 mb-4">
          <h2 class="h4 mb-3">Overview</h2>
          <p class="mb-0 text-muted">This Privacy Policy explains how AYAAM collects, uses, discloses, and protects your information when you use our multi‑actor eCommerce platform. By using AYAAM, you agree to the practices described below.</p>
        </div>

        <!-- Accordion Sections -->
        <div class="accordion policy-card" id="policyAccordion">

<!-- 1. Information We Collect -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                1. Information We Collect
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <ul class="list-check mb-0">
                  <li><strong>Personal Details</strong>: name, email, phone, billing/shipping addresses.</li>
                  <li><strong>Account Data</strong>: login credentials, profile info, preferences.</li>
                  <li><strong>Transaction Data</strong>: orders, payments, invoices, refund history.</li>
                  <li><strong>Usage & Device Data</strong>: IP, browser, device type, pages viewed, session analytics.</li>
                  <li><strong>Cookies & Similar Tech</strong>: identifiers that help us remember your session and improve performance.</li>
                </ul>
              </div>
            </div>
          </div>

<!-- 2. How We Use Information -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                2. How We Use Your Information
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <ul class="list-check mb-0">
                  <li>Provide and operate the platform, including account creation and order fulfillment.</li>
                  <li>Process payments and prevent fraud or abuse.</li>
                  <li>Personalize content, recommendations, and user experience.</li>
                  <li>Communicate about updates, support, security alerts, and promotional messages.</li>
                  <li>Analyze performance, fix bugs, and improve features.</li>
                  <li>Comply with legal obligations and enforce our terms.</li>
                </ul>
              </div>
            </div>
          </div>

<!-- 3. Sharing of Information -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                3. Sharing of Information
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <p>We do not sell or rent your personal information. We may share information with:</p>
                <ul class="list-check">
                  <li><strong>Service Providers</strong> (e.g., hosting, payments, delivery, analytics) under contractual confidentiality.</li>
                  <li><strong>Business Partners</strong> for integrations or promotions when relevant.</li>
                  <li><strong>Authorities</strong> when required by law or to protect our rights, users, and platform integrity.</li>
                </ul>
                <p class="mb-0">We require third parties to handle data in line with this Policy and applicable laws.</p>
              </div>
            </div>
          </div>

          <!-- 4. Cookies -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                4. Cookies & Tracking Technologies
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <p>We use cookies and similar technologies to keep you signed in, remember preferences, maintain your cart, understand usage, and improve performance. You can control cookies through your browser settings; disabling them may affect certain features.</p>
              </div>
            </div>
          </div>

          <!-- 5. Data Security -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFive">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                5. Data Security
              </button>
            </h2>
            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <p>We employ appropriate technical and organizational measures such as encryption in transit, access controls, monitoring, and secure infrastructure. However, no method of transmission over the Internet or storage is completely secure.</p>
              </div>
            </div>
          </div>

          <!-- 6. Your Rights -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingSix">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                6. Your Rights & Choices
              </button>
            </h2>
            <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <ul class="list-check mb-0">
                  <li>Access, correct, or delete your personal data.</li>
                  <li>Download your data where applicable.</li>
                  <li>Opt out of marketing emails via the unsubscribe link.</li>
                  <li>Adjust cookie preferences in your browser.</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 7. Children's Privacy -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingSeven">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                7. Children’s Privacy
              </button>
            </h2>
            <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <p>AYAAM does not knowingly collect personal data from children under 13 (or the age required by your jurisdiction). If you believe a child has provided personal data, please contact us and we will take appropriate steps to remove the information.</p>
              </div>
            </div>
          </div>

<!-- 8. International Transfers -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingEight">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                8. International Data Transfers
              </button>
            </h2>
            <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <p>Your information may be processed in countries outside your own. Where required, we implement safeguards (such as standard contractual clauses) to ensure appropriate protection.</p>
              </div>
            </div>
          </div>

<!-- 9. Third-Party Links -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingNine">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                9. Third‑Party Links & Services
              </button>
            </h2>
            <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <p>AYAAM may contain links to third‑party websites or use integrations provided by third parties. We are not responsible for their privacy practices. Please review their policies before providing personal information.</p>
              </div>
            </div>
          </div>

<!-- 10. Changes to This Policy -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTen">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                10. Changes to This Policy
              </button>
            </h2>
            <div id="collapseTen" class="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <p>We may update this Privacy Policy from time to time. We will post the updated version on this page and revise the “Last updated” date. Continued use of the platform after changes take effect constitutes acceptance of the revised Policy.</p>
              </div>
            </div>
          </div>

<!-- 11. Contact Us -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingEleven">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                11. Contact Us
              </button>
            </h2>
            <div id="collapseEleven" class="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#policyAccordion">
              <div class="accordion-body text-muted">
                <p>If you have questions or requests regarding this Policy, your data, or your rights, contact us at:</p>
                <ul class="mb-0">
                  <li>Email: <a href="mailto:support@ayaam.example">support@ayaam.example</a></li>
                  <li>Website: <a href="#">www.ayaam.example</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
        `
    }

    script() {
      console.log(this.parent.querySelector("#subview-slot"));
    }
    
}