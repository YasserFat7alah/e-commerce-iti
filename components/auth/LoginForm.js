import { getCurrentUser, login, logout, redirect, signup, validateEmail, validatePassword } from '../../data/authentication.js';
import { navigate } from '../../scripts/utils/navigation.js';
import Component from '../core/component.js';
import Toast from '../ui/toast.js';

export default class LoginForm extends Component {
    template() {
        return `
    <!-- LOGIN FORM -->
              <form id="loginForm" class="" data-fade>

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

        <!-- Remember Me Checkbox -->
                <div class="mb-4 form-check">
                    <input type="checkbox" class="form-check-input" id="remember" />
                    <label class="form-check-label" for="remember">Keep Me Logged In</label>
                </div>

        <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-100 py-2">
                    Log In
                </button>
            </form>
                  `
    }

    script() {
        const currentUser = getCurrentUser();
        if (currentUser) {
            redirect(currentUser.role);
        }

        const form = this.parent.querySelector('#loginForm');
        const emailF = document.getElementById('email');
        const passwordF = document.getElementById('password');
        const rememberF = document.getElementById('remember');


        // Real-time validation for email
        emailF.addEventListener('blur', checkEmail);
        emailF.addEventListener('input', () => { clearError(emailF) });

        let rememberMe = false;
        // Real-time Remember Check
        rememberF.addEventListener('change', () => {
            if (rememberF.checked) {
                rememberMe = true;
            } else {
                rememberMe = false;

            }
        })

        // Form Submission
        form.addEventListener('submit', function (e) {

            e.preventDefault();

            const isEmailValid = checkEmail();
            if (!isEmailValid) {
                return;
            }

            const user = login(emailF.value.toLowerCase(), passwordF.value, rememberMe);

            //Case: invalid email/password
            if (!user) {
                Toast.notify("❌ Invalid Email or Password!", "danger")
                const emailError = document.getElementById('emailError');
                const pwError = document.getElementById('passwordError');
                emailError.textContent = 'Invalid Email Or Password';
                pwError.textContent = 'Invalid Email Or Password';
                emailF.classList.add("is-invalid");
                passwordF.classList.add("is-invalid");
                return;
            }

            //Case: banned users
            if (user && user.status === "banned") {
                Toast.notify("🚫 Your account has been banned. Contact support.", "danger");
                emailF.classList.add("is-invalid");
                passwordF.classList.add("is-invalid");
                logout();
                return;
            }

            //Case: seller inactive
            if (user.role === "seller" && user.status !== "active") {
                Toast.notify(" Your seller account is not active yet. Please wait for approval.", "warning");
                setTimeout(() => navigate('/home'), 1500);
                return;
            }

            //Normal success
            Toast.notify("✅ Logged In Successfully! Redirecting...", "success");
            setTimeout(() => redirect(user.role), 1500);

        });

        /* ============== VALIDATION FUNCTIONS ================================ */

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

        /* === CLEAR ERROR */
        function clearError(_element) { //takes a form input and resets it as valid
            _element.classList.remove('is-invalid')
        }

    }
}