import { capitalizeWords, getInitials, getRandomColor, formatDate } from "../../scripts/utils/dashboardUtils.js";
import View from "../../components/core/view.js";
import { sessionStore } from "../../scripts/utils/storage.js";
import { localStore } from "../../scripts/utils/storage.js";
import Toast from "../../components/ui/toast.js";

export class AdminProfile extends View {
    template() {
        const currentUser = sessionStore.read("currentUser");
        
        //error handling for missing user (happens when deleting session storage manually)
        if (!currentUser) {
            return `
                <div class="alert alert-danger m-3" role="alert">
                    Unable to load profile information. Please log in again.
                </div>
            `;
        }

        return `
        <!--  Profile  Modal -->
        <div id="admin-profile-container" class="admin-profile-container p-4">
            <!-- Profile Picture Section -->
            <div class="text-center mb-4 admin-profile-header">
                <div class="admin-profile-avatar">
                    ${getInitials(currentUser.name)}
                </div>
                <h4 class="admin-profile-name mb-3 mt-3">${currentUser.name}</h4>
                <span class="badge admin-profile-role-badge px-3 py-2">
                ${currentUser.role === 'admin' ? `<i class="fas fa-crown me-2"></i>${'Admin'}`
                    :`<i class="fa-regular fa-user me-2"></i>
                    ${'Seller'}`
                }
                    
                </span>
            </div>

            <!-- Profile Information Grid -->
            <div class="row g-3 admin-profile-grid">
                <!-- Name -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2">NAME</div>
                        <div class="admin-profile-info-value">${currentUser.name}</div>
                    </div>
                </div>
                
                <!-- User ID -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2">USER ID</div>
                        <div class="admin-profile-info-value">#${currentUser.id}</div>
                    </div>
                </div>
                
                <!-- Role -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2">ROLE</div>
                        <div class="admin-profile-info-value">${capitalizeWords(currentUser.role || 'Admin')}</div>
                    </div>
                </div>
                
                <!-- Join Date -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2">MEMBER SINCE</div>
                        <div class="admin-profile-info-value">${formatDate(currentUser.joinDate) || "Not provided"}</div>
                    </div>
                </div>
                
                <!-- Phone -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2 d-flex justify-content-between align-items-center">
                            PHONE
                            <button class="admin-profile-edit-btn" id="edit-phone-btn">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                        <div id="admin-phone-display" class="admin-profile-info-value">${currentUser.phone || "Not provided"}</div>
                        <!-- Phone Edit Section (hidden by default) -->
                        <div id="admin-phone-edit" class="d-none">
                            <input type="tel" id="admin-phone-input" class="form-control form-control-sm admin-profile-input mb-2" value="${currentUser.phone || ""}" placeholder="Enter phone number">
                            <div id="phone-error" class="text-danger small mb-2 d-none"></div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm admin-profile-btn-save flex-fill" id="save-phone-btn">
                                    <i class="fas fa-check me-1"></i> Save
                                </button>
                                <button class="btn btn-sm admin-profile-btn-cancel flex-fill" id="cancel-phone-btn">
                                    <i class="fas fa-times me-1"></i> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Password -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2 d-flex justify-content-between align-items-center">
                            PASSWORD
                            <div class="d-flex gap-1">
                                <button class="admin-profile-password-toggle-btn" id="toggle-password-btn">
                                    <i id="admin-password-icon" class="fas fa-eye"></i>
                                </button>
                                <button class="admin-profile-edit-btn" id="edit-password-btn">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>
                        <div id="admin-password-display" class="admin-profile-info-value">
                            <span id="admin-password-text" class="text-muted">••••••••••</span>
                        </div>
                        <!-- Password Edit Section (hidden by default) -->
                        <div id="admin-password-edit" class="d-none">
                            <input type="password" id="admin-password-input" class="form-control form-control-sm admin-profile-input mb-2" placeholder="Enter new password (min 6 characters)">
                            <div id="password-error" class="text-danger small mb-2 d-none"></div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm admin-profile-btn-save flex-fill" id="save-password-btn">
                                    <i class="fas fa-check me-1"></i> Save
                                </button>
                                <button class="btn btn-sm admin-profile-btn-cancel flex-fill" id="cancel-password-btn">
                                    <i class="fas fa-times me-1"></i> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    
    script() {
        // Password toggle functionality
        const togglePasswordBtn = document.getElementById('toggle-password-btn');
        const passwordText = document.getElementById('admin-password-text');
        const passwordIcon = document.getElementById('admin-password-icon');
        
        togglePasswordBtn?.addEventListener('click', () => {
            const currentUser = sessionStore.read("currentUser");
            
            if (passwordIcon.classList.contains('fa-eye')) {
                passwordText.textContent = currentUser.password;
                passwordText.className = '';
                passwordIcon.className = 'fas fa-eye-slash';
            } else {//eye-slash
                passwordText.textContent = '••••••••••';
                passwordText.className = 'text-muted';
                passwordIcon.className = 'fas fa-eye';
            }
        });

        // Phone editing functionality
        const editPhoneBtn = document.getElementById('edit-phone-btn');
        const savePhoneBtn = document.getElementById('save-phone-btn');
        const cancelPhoneBtn = document.getElementById('cancel-phone-btn');
        const phoneDisplay = document.getElementById('admin-phone-display');
        const phoneEdit = document.getElementById('admin-phone-edit');
        const phoneInput = document.getElementById('admin-phone-input');
        const phoneError = document.getElementById('phone-error');

        editPhoneBtn?.addEventListener('click', () => {
            phoneDisplay.classList.add('d-none');
            phoneEdit.classList.remove('d-none');// switch to edit mode
            phoneInput.focus();
        });

        // Phone validation function
        const validatePhone = (phone) => {
            if (!phone.trim()) {
                return "Phone number cannot be empty";
            }
            // Check if phone contains only numbers
            const phoneRegex = /^\d+$/;
            if (!phoneRegex.test(phone)) {
                return "Phone number can only contain numbers";
            }
            return null; // Valid
        };

        savePhoneBtn?.addEventListener('click', () => {
            const newPhone = phoneInput.value.trim();
            const validationError = validatePhone(newPhone);
            
            if (validationError) {
                phoneError.textContent = validationError;
                phoneError.classList.remove('d-none');
                phoneInput.classList.add('is-invalid');
                return;
            }

            // Clear any previous errors
            phoneError.classList.add('d-none');
            phoneInput.classList.remove('is-invalid');
            
            const currentUser = sessionStore.read("currentUser");
            const users = localStore.read("users") || [];
            
            // Update current user
            currentUser.phone = newPhone;
            const userIndex = users.findIndex(user => user.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex].phone = newPhone;
            }
            
            // Save to both storages
            sessionStore.write("currentUser", currentUser);
            localStore.write("users", users);
            
            // Update display
            phoneDisplay.textContent = newPhone || "Not provided";
            phoneDisplay.classList.remove('d-none');
            phoneEdit.classList.add('d-none');

            Toast.notify("Phone number updated successfully!", "success");
        });

        cancelPhoneBtn?.addEventListener('click', () => {
            const currentUser = sessionStore.read("currentUser");
            phoneInput.value = currentUser.phone || "";
            phoneInput.classList.remove('is-invalid');
            phoneError.classList.add('d-none');
            phoneDisplay.classList.remove('d-none');
            phoneEdit.classList.add('d-none');
        });

        // Password editing functionality
        const editPasswordBtn = document.getElementById('edit-password-btn');
        const savePasswordBtn = document.getElementById('save-password-btn');
        const cancelPasswordBtn = document.getElementById('cancel-password-btn');
        const passwordDisplay = document.getElementById('admin-password-display');
        const passwordEdit = document.getElementById('admin-password-edit');
        const passwordInput = document.getElementById('admin-password-input');
        const passwordError = document.getElementById('password-error'); // div under input

        editPasswordBtn?.addEventListener('click', () => {
            passwordDisplay.classList.add('d-none');// hide display mode
            passwordEdit.classList.remove('d-none');// show edit mode
            passwordInput.focus();
        });

        // Password validation function
        const validatePassword = (password) => {
            if (!password.trim()) {
                return "Password cannot be empty";
            }
            
            if (password.length < 6) {
                return "Password must be at least 6 characters long";
            }
            
            return null; // Valid
        };

        savePasswordBtn?.addEventListener('click', () => {
            const newPassword = passwordInput.value.trim();
            const validationError = validatePassword(newPassword);
            
            if (validationError) {
                passwordError.textContent = validationError;
                passwordError.classList.remove('d-none');// show error div with its txtontent
                passwordInput.classList.add('is-invalid');
                return;
            }

            // Clear any previous errors
            passwordError.classList.add('d-none'); // rehide error div
            passwordInput.classList.remove('is-invalid');
            
            const currentUser = sessionStore.read("currentUser");
            const users = localStore.read("users") || [];
            
            // Update current user object
            currentUser.password = newPassword;
            
            // Update in users array (local storage)
            const userIndex = users.findIndex(user => user.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
            }
            
            // Save to both storages
            sessionStore.write("currentUser", currentUser);
            localStore.write("users", users);
            
            // Reset password display and hide edit mode
            passwordText.textContent = '••••••••••';
            passwordText.className = 'text-muted';
            passwordIcon.className = 'fas fa-eye';
            passwordInput.value = '';
            passwordInput.classList.remove('is-invalid');
            passwordDisplay.classList.remove('d-none');// show display mode
            passwordEdit.classList.add('d-none');// hide edit mode
            
            Toast.notify("Password updated successfully!", "success");
        });

        cancelPasswordBtn?.addEventListener('click', () => {
            passwordInput.value = '';
            passwordInput.classList.remove('is-invalid');
            passwordError.classList.add('d-none');// rehide error div
            passwordDisplay.classList.remove('d-none');// show display mode
            passwordEdit.classList.add('d-none');// hide edit mode
        });

        // validation on input   #1 phone
        phoneInput?.addEventListener('input', () => {
            const validationError = validatePhone(phoneInput.value);
            if (validationError) {
                phoneInput.classList.add('is-invalid');
                phoneError.textContent = validationError;
                phoneError.classList.remove('d-none'); //show error div
            } else {
                phoneInput.classList.remove('is-invalid');
                phoneError.classList.add('d-none');// rehide error div
            }
        });
        // validation on input    #2 password
        passwordInput?.addEventListener('input', () => {
            const validationError = validatePassword(passwordInput.value);
            if (validationError) {
                passwordInput.classList.add('is-invalid');
                passwordError.textContent = validationError;
                passwordError.classList.remove('d-none'); //show error div
            } else {
                passwordInput.classList.remove('is-invalid');
                passwordError.classList.add('d-none'); //rehide error div
            }
        });
    }
}