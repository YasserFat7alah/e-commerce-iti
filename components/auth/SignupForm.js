import { getCurrentUser, login, redirect, signup, validateEmail, validatePassword } from '../../data/authentication.js';
import TermsPage from '../../pages/info/TermsPage.js';
import { localStore } from '../../scripts/utils/storage.js';
import Component from '../core/component.js';
import Toast from '../ui/toast.js';
import Modal from './modal.js';

export default class SignupForm extends Component {
    template() {
        const terms = new TermsPage
        return `
    <!-- SIGNUP FORM -->
              <form id="signupForm" class="" data-fade>
        <!-- Name Field -->
                <div class="mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="name" required />
                    <div id="nameError" class="invalid-feedback">
                    Please enter your full name.
                    </div>
                </div>

        <!-- Email Field -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="email" required />
                    <div id="emailError" class="invalid-feedback">
                    Please enter a valid email.
                    </div>
                </div>

        <!-- Password Field -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                    type="password"
                    class="form-control"
                    id="password"
                    required
                    />
                    <div id="passwordError" class="invalid-feedback">
                    Password must be at least 8 characters.
                    </div>
                </div>

        <!-- Repeat Password Field -->
                <div class="mb-3">
                    <label for="repeatedPassword" class="form-label"
                    >Repeat Password</label
                    >
                    <input
                    type="password"
                    class="form-control"
                    id="repeatedPassword"
                    required
                    />
                    <div id="passwordMatchMessage" class="mt-1 small"></div>
                </div>

        <!-- Terms Checkbox -->
                <div class="mb-4 form-check">
                    <input
                    type="checkbox"
                    class="form-check-input"
                    id="terms"
                    required
                    />
                    <label class="form-check-label" for="terms"
                    >I agree to the
                    <a href=""
                        data-bs-toggle="modal" data-bs-target="#termsModal">Terms & Conditions</a> and <a href='#/info/policy' target='_blank' >Privacy Policy</a>.</label>
                    <div id="termsError" class="invalid-feedback d-none">
                    You must accept the terms.
                    </div>
                </div>

        <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-100 py-2">
                    Sign Up
                </button>
            </form>

            <!-- The Invalid Modal -->
            <div class="modal fade" id="emailExistsModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">⚠️ Already Registered!</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            This account is already registered, proceed to login?
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <a href="#/login" class="btn btn-primary" data-route data-bs-dismiss="modal">Login</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- The Terms Modal -->
            ${Modal()}
            
            </form>
                  `
    }

    script() {
        const currentUser = getCurrentUser();
        if (currentUser) {
            redirect(currentUser.role);
        }


        const form = document.getElementById('signupForm');
        const nameF = document.getElementById('name');
        const emailF = document.getElementById('email');
        const passwordF = document.getElementById('password');
        const repeatedPasswordF = document.getElementById('repeatedPassword');
        const termsF = document.getElementById('terms');

        // Real-time validation for name
        nameF.addEventListener('blur', checkName);
        nameF.addEventListener('input', () => { clearError(nameF) });

        // Real-time validation for email
        emailF.addEventListener('blur', checkEmail);
        emailF.addEventListener('input', () => { clearError(emailF) });

        // Real-time validation for password
        passwordF.addEventListener('blur', checkPassword);
        passwordF.addEventListener('input', () => { clearError(passwordF) });

        // Real-time password matching
        repeatedPasswordF.addEventListener('input', validatePasswordMatch);

        // Real-time Terms Check
        termsF.addEventListener('change', () => {
            const termsErr = document.getElementById('termsError')
            if (termsF.checked) {
                termsErr.classList.add('d-none');
                termsErr.classList.remove('d-block');
            } else {
                termsErr.classList.remove('d-none');
                termsErr.classList.add('d-block');

            }
        })

        // Form submission
        form.addEventListener('submit', function (event) {

            event.preventDefault();

            // Validate all fields
            const isNameValid = checkName();
            const isEmailValid = checkEmail();
            const isPasswordValid = checkPassword();
            const isPasswordMatchValid = validatePasswordMatch();
            const isTermsValid = termsF.checked;
            const termsErr = document.getElementById('termsError')

            if (!isTermsValid) {
                termsErr.classList.remove('d-none');
                termsErr.classList.add('d-block');
            } else {
                termsErr.classList.add('d-none');
                termsErr.classList.remove('d-block');
            }

            // If any validation fails, prevent form submission
            if (!isNameValid || !isEmailValid || !isPasswordValid || !isPasswordMatchValid || !isTermsValid) {
                return;
            }
            
            const name = nameF.value.trim();
            const email = emailF.value.toLowerCase().trim();
            const password = passwordF.value;
            const repeatedPassword = repeatedPasswordF.value;

            const users = localStore.read('users', []);
            const existing = users.find(_user => _user.email === email);

            if (existing) {
                Toast.notify("This Email is already Registered.", "warning")
                const modal = new bootstrap.Modal(document.getElementById("emailExistsModal"));
                modal.show();
                return;
            }

            const newUser = signup(name, email, password, repeatedPassword);

            if (!newUser) {
                Toast.notify("❌ Something went wrong while creating your account!", "danger");
                return;
            }

            Toast.notify("Account created successfully!", "success");
            const user = login(email, password, true);

            setTimeout(() => {
                redirect(user.role);
            }, 1500);
        });



        /* ============== VALIDATION FUNCTIONS ================================ */
        /* === NAME === */
        function checkName() {
            const nameValue = nameF.value.trim();
            const nameError = document.getElementById('nameError');

            if (!nameValue) {
                nameError.textContent = 'Name cannot be empty!';
                nameF.classList.add('is-invalid');
                return false;
            }

            if (nameValue.split(" ").length < 2) {
                nameError.textContent = 'Please enter your full name (first and last name)';
                nameF.classList.add('is-invalid');
                return false;
            }

            nameF.classList.remove('is-invalid');
            return true;
        }


        /* === EMAIL === */
        function checkEmail() {
            const emailValue = emailF.value.trim();
            const emailError = document.getElementById('emailError');

            if (!emailValue) {
                emailError.textContent = 'Email cannot be empty!';
                emailF.classList.add('is-invalid');
                return false;
            }

            if (!validateEmail(emailValue)) {
                emailError.textContent = 'Please enter a valid email address';
                emailF.classList.add('is-invalid');
                return false;
            }

            emailF.classList.remove('is-invalid');
            return true;
        }


        /* === PASSWORD === */
        function checkPassword() {
            const passwordValue = passwordF.value;
            const passwordError = document.getElementById('passwordError');

            if (!passwordValue) {
                passwordError.textContent = 'Password cannot be empty!';
                passwordF.classList.add('is-invalid');
                return false;
            }

            if (!validatePassword(passwordValue)) {
                passwordError.textContent = 'Password must have : \n - atleast 8 digits. \n- atleast 1 Capital letter \n- atleast 1 small letter \n- a special character';
                passwordF.classList.add('is-invalid');
                return false;
            }

            passwordF.classList.remove('is-invalid');
            return true;
        }


        /* === RE PASSWORD === */
        function validatePasswordMatch() {
            const passwordValue = passwordF.value;
            const repeatedPasswordValue = repeatedPasswordF.value;
            const matchMessage = document.getElementById('passwordMatchMessage');

            if (!repeatedPasswordValue) {
                matchMessage.textContent = 'Enter Password again';
                matchMessage.className = 'mt-1 small text-danger d-block';
                return false;
            }

            if (passwordValue !== repeatedPasswordValue) {
                matchMessage.textContent = '✗ Passwords do not match';
                matchMessage.className = 'mt-1 small text-danger d-block';
                return false;
            }

            repeatedPasswordF.classList.remove('is-invalid');
            matchMessage.textContent = '✓ Passwords match';
            matchMessage.className = 'mt-1 small text-success d-block';
            return true;
        }

        /* === CLEAR ERROR */
        function clearError(_element) { //takes a form input and resets it as valid
            _element.classList.remove('is-invalid')
        }

    }
}