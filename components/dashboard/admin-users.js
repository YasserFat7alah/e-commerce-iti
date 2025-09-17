import { capitalizeWords, generateId, getInitials, getRandomColor,getRoleBadge, formatDate, showConfirmDialog, generateRandomPassword } from "../../scripts/utils/dashboardUtils.js";
import User from "../../data/_schema/UserModel.js";
import { localStore } from "../../scripts/utils/storage.js";
import Toast from "../ui/toast.js";

let currentSort = { field: null, direction: 'asc' }; // global var for sorting
export function renderUsers(container) {
    const users = localStore.read("users") || [];

    container.innerHTML = ` 
        <!--.............................Header Section.......................... -->
        <div class="card border-0 shadow-lg mb-4">
            <div class="card-header bg-primary text-white py-3">
                <div class="row align-items-center">
                    <div class="col">
                        <h2 class="card-title mb-1 h4">
                            <i class="fas fa-users me-2"></i>
                            Users Management
                        </h2>
                        <p class="card-text mb-0 opacity-85">
                            Manage and oversee all user accounts in <span class="fw-bold">AYAAM</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!--.............................. Stats Row.................................-->
        <div class="row g-2 mb-4">
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-primary mb-1">${users.length}</div>
                        <small class="text-muted text-uppercase fw-semibold">Total Users</small>
                    </div>
                </div>
            </div>
            <div class="col-6 col-md-4">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-success mb-1">
                            ${users.filter((u) => u.status === "active" || !u.status).length}
                        </div>
                        <small class="text-muted text-uppercase fw-semibold">Active</small>
                    </div>
                </div>
            </div>
            
            <div class="col-6 col-md-4">
                <div class="card border-0 shadow-lg h-100">
                    <div class="card-body text-center">
                        <div class="h4 text-info mb-1">
                            ${users.filter((u) => u.joinDate &&
                            // check if the user joined in the last 30 days and return the length
                            new Date(u.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                        </div>
                        <small class="text-muted text-uppercase fw-semibold">New This Month</small>
                    </div>
                </div>
            </div>
        </div>

        <!-- .................................Toolbar ................................-->
        <div id="toolbarStart"></div>
        <div class="card border-0 shadow-lg mb-4">
            <div class="card-body">
                <div class="row g-3 align-items-center">
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="input-group">
                            <span class="input-group-text bg-white border-end-0">
                                <i class="fas fa-search text-muted"></i>
                            </span>
                            <input type="text" class="form-control  border-start-0" 
                                placeholder="Search users..." id="searchInput">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <select class="form-select" id="roleFilter">
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="seller">Seller</option>
                            <option value="customer">Customer</option>
                        </select>
                    </div>
                    <div class="col-12 col-lg-4 ms-auto text-end">
                        <button class="btn btn-primary" id="addUserBtn">
                            <i class="fas fa-plus me-2"></i>Add New User
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ..............Bulk Actions Bar (Display: none by default) ...............-->
        <!-- ..........only displayed when any of the checkboxes is checked........-->
        <div class="card border-0 shadow-sm mb-4 d-none" id="bulkActionsBar">
            <div class="card-body py-2">
                <div class="row align-items-center">
                    <div class="col">
                        <span class="fw-semibold">
                            <span id="selectedCount">0</span> user(s) selected
                        </span>
                    </div>
                    <div class="col-auto">
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-success" id="bulkActivateBtn">
                                <i class="fas fa-check me-1"></i>Activate
                            </button>
                            <button class="btn btn-outline-warning" id="bulkDeactivateBtn">
                                <i class="fas fa-pause me-1"></i>Deactivate
                            </button>
                            <button class="btn btn-outline-danger" id="bulkDeleteBtn">
                                <i class="fas fa-trash me-1"></i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--.......................... Users Table .................................-->
        <div class="card border-1 shadow-sm mb-4">
        <!--.................Table Title...................-->
            <div class="card-header bg-white py-2 shadow-sm ">
                <h5 class="card-title mb-0">
                    <i class="fas fa-table me-2 text-primary"></i>
                    Users List
                </h5>
            </div>
        <!-- .......display user table if there are users , if its empty display empty state..........-->
            <div class="card-body p-0">
                ${users.length > 0 ? renderUsersTable(users) : renderEmptyState()}
            </div>
        </div>

        <!-- ..................................Add User Form ............................-->
        <!-- .......Display none by default, only displayed when add new user button is clicked ....................-->

        <div class="card border-0 shadow-lg d-none" id="userForm">
            <div class="card-header bg-primary text-white">
                <h5 class="card-title mb-0">
                    <i class="fas fa-user-plus me-2"></i>
                    Add New User
                </h5>
            </div>
            <div class="card-body">
                ${renderUserForm()}
            </div>
        </div>
    `;

    UserEvents(container);
    return container;
}

export function renderUsersTable(users) {
    return `
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead class="table-primary admin-th">
                    <tr>
                        <th scope="col" class="ps-4">
                            <input type="checkbox" class="form-check-input" id="selectAll">
                        </th>
                        <th scope="col" class="sortable-header" data-sort="id" style="cursor: pointer;">
                            ID  <i class="fas fa-sort ms-1" data-field="id"></i></th>
                        <th scope="col" class="sortable-header" data-sort="user" style="cursor: pointer;">
                            User  <i class="fas fa-sort ms-1" data-field="user"></i></th>
                        <th scope="col" class="sortable-header" data-sort="email" style="cursor: pointer;">
                            Email  <i class="fas fa-sort ms-1" data-field="email"></i></th>
                        <th scope="col" class="sortable-header" data-sort="role" style="cursor: pointer;">
                            Role  <i class="fas fa-sort ms-1" data-field="role"></i></th>
                        <th scope="col" class="sortable-header" data-sort="status" style="cursor: pointer;">
                            Status  <i class="fas fa-sort ms-1" data-field="status"></i></th>
                        <th scope="col" class="sortable-header" data-sort="joiningDate" style="cursor: pointer;">
                            Joining Date <i class="fas fa-sort ms-1" data-field="joiningDate"></i></th>
                        <th scope="col" class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody id="usersTableBody">
                    ${users.map(user => renderUserRow(user)).join("")}
                </tbody>
            </table>
        </div>
    `;
}

export function renderUserRow(user) {
    return `
        <tr>
            <td class="ps-4">
                <!--...............the check box holds the userid value...............-->
                <input type="checkbox" class="form-check-input user-checkbox" value="${user.id}">
            </td>
            <td>
                <div class="fw-small">${user.id}</div>
            </td>
            <td>
                <!--....the user's name in circle with random colors formatted with initials(1st letters capital).....-->
                <div class="d-flex align-items-center">
                    <div  ${getRandomColor()}" 
                    style="width: 40px; height: 40px; font-size: 0.875rem; font-weight: bold;">
                        ${getInitials(user.name)}
                    </div>
                    <div>
                        <div class="fw-semibold">${user.name}</div>
                        <small class="text-muted">${user.phone || "No Phone"}</small>
                    </div>
                </div>
            </td>
            <td>
                <a href="mailto:${user.email}" class="text-decoration-none">
                    ${user.email}
                </a>
            </td>
            <td>
                ${getRoleBadge(user.role)}
            </td>
            <td>
                <span class="badge ${user.status === "active" ? "bg-success" : user.status === "inactive" ? "bg-secondary" : "bg-danger"}">
                    <i class="fas fa-circle me-1" style="font-size: 0.5rem;"></i>
                    ${capitalizeWords(user.status || "Active")}
                </span>
            </td>
            <td>${formatDate(user.joinDate)}</td>
            <!--...............the action buttons(assigned to each user by id)...........-->
            <td class="text-center">
                <div class="btn-group btn-group-sm" role="group">
                    <button class="btn btn-sm view-user-btn" 
                        data-user-id="${user.id}"
                        title="View Details"
                        data-bs-toggle="tooltip">
                        <i class="fas fa-eye text-info"></i>
                    </button>
                    <button class="btn btn-sm edit-user-btn" 
                        data-user-id="${user.id}"
                        title="Edit User"
                        data-bs-toggle="tooltip">
                        <i class="fas fa-edit text-primary"></i>
                    </button>
                    <button class="btn btn-sm remove-user" 
                        data-id="${user.id}" 
                        data-name="${user.name}"
                        title="Delete User"
                        data-bs-toggle="tooltip">
                        <i class="fas fa-trash text-danger"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

// when there are no users render the empty state 
export function renderEmptyState() {
    return `
        <div class="text-center py-5">
            <i class="fas fa-users text-muted" style="font-size: 4rem;"></i>
            <h4 class="text-muted mt-3">No Users Found</h4>
            <p class="text-muted">Start by adding your first user to <span class="fw-bold text-primary">AYAAM</span></p>
        </div>
    `;
}

//adding new user form
export function renderUserForm() {
    return `
        <form id="newUserForm" class="needs-validation" novalidate>
            <div class="row g-3">
                <div class="col-md-6">
                    <label for="userName" class="form-label">
                        <i class="fas fa-user me-1 text-primary"></i>Full Name
                    </label>
                    <input type="text" class="form-control" id="userName" 
                        placeholder="Enter full name" required>
                    <div class="invalid-feedback">
                        Please provide a valid name.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="userEmail" class="form-label">
                        <i class="fas fa-envelope me-1 text-primary"></i>Email Address
                    </label>
                    <input type="email" class="form-control" id="userEmail" 
                        placeholder="Enter email address" required>
                    <div class="invalid-feedback">
                        Please provide a valid email address.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="userPassword" class="form-label">
                        <i class="fas fa-lock me-1 text-primary"></i>Password
                    </label>
                    <input type="password" class="form-control" id="userPassword" 
                        placeholder="Enter password" required minlength="6">
                    <div class="invalid-feedback">
                        Password must be at least 6 characters long.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="userPhone" class="form-label">
                        <i class="fas fa-phone me-1 text-primary"></i>Phone Number
                    </label>
                    <input type="tel" class="form-control" id="userPhone" 
                        placeholder="Enter phone number" required>
                    <div class="invalid-feedback">
                        Please enter a valid phone number.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="userRole" class="form-label">
                        <i class="fas fa-user-tag me-1 text-primary"></i>Role
                    </label>
                    <select class="form-select" id="userRole" required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="seller">Seller</option>
                        <option value="customer">Customer</option>
                    </select>
                    <div class="invalid-feedback">
                        Please select a role.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="userStatus" class="form-label">
                        <i class="fas fa-toggle-on me-1 text-primary"></i>Status
                    </label>
                    <select class="form-select" id="userStatus">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary me-2">
                        <i class="fas fa-check me-2"></i>
                        <span>Save User</span>
                    </button>
                    <button type="button" class="btn btn-outline-secondary" id="cancelBtn">
                        <i class="fas fa-times me-2"></i>Cancel
                    </button>
                </div>
            </div>
        </form>
    `;
}
//Event Listeners
export function UserEvents(container) {
    // Add user button
    document.getElementById("addUserBtn")?.addEventListener("click", () => {
        const form = document.getElementById("userForm");
        form.classList.toggle("d-none");
        if (!form.classList.contains("d-none")) {
            document.getElementById("userName").focus();
        }
    });

    // Cancel button
    document.getElementById("cancelBtn")?.addEventListener("click", () => {
        document.getElementById("userForm").classList.add("d-none");
        document.getElementById("newUserForm").reset();
        document.getElementById("newUserForm").classList.remove("was-validated");
    });
    // Form submission
    document.getElementById("newUserForm")?.addEventListener("submit", handleUserFormSubmit);
    // Delete user buttons (in action column)
    document.querySelectorAll(".remove-user")?.forEach((btn) => {
        btn.addEventListener("click", handleUserDelete);
    });
    // Edit user buttons 
    document.querySelectorAll(".edit-user-btn")?.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const userId = btn.getAttribute("data-user-id");
            editUser(userId);
        });
    });
    // View user buttons
    document.querySelectorAll(".view-user-btn")?.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const userId = btn.getAttribute("data-user-id");
            viewUserDetails(userId);
        });
    });
    // Search functionality
    document.getElementById("searchInput")?.addEventListener("input", handleUserSearch);
   

    // Role filter functionality
    document.getElementById("roleFilter")?.addEventListener("change", handleRoleFilter);


    // Bulk action buttons
    document.getElementById("bulkActivateBtn")?.addEventListener("click", () => bulkAction("activate"));

    document.getElementById("bulkDeactivateBtn")?.addEventListener("click", () => bulkAction("deactivate"));

    document.getElementById("bulkDeleteBtn")?.addEventListener("click", () => bulkAction("delete"));

    // Select all checkbox
    document.getElementById("selectAll")?.addEventListener("change", function () {
            const checkboxes = container.querySelectorAll(".user-checkbox");
            checkboxes.forEach((cbox) => (cbox.checked = this.checked));
            toggleBulkActions();
        });
    

    // Individual checkboxes
    container.querySelectorAll(".user-checkbox")?.forEach((checkbox) => {
        checkbox.addEventListener("change", toggleBulkActions);
    });

    // Initialize tooltips ( to use the bootstrap tooltip title attribute as the tooltip content )
    const tooltipTriggerList = container.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList?.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl); //is a must to trigger it
    });

    // Sorting table
    container.querySelectorAll(".sortable-header")?.forEach((header) => {
        header?.addEventListener("click", handleSort);
    });


    toggleBulkActions();
}

// Event Handlers
export function handleUserFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.checkValidity()) {
        const users = localStore.read("users") || [];

        // Check if email already exists
        if (users.find((u) => u.email === document.getElementById("userEmail").value)) {
            Toast.notify("Email address already exists!", "warning");
            return;
        }
        // if everything is ok, add new user>>>
        const formattedName = capitalizeWords(document.getElementById("userName").value); // capitalize Full Name
        const uName = document.getElementById("userName").value;
        const userRole = document.getElementById("userRole").value;

        const newUser = new User(
            generateId(capitalizeWords(userRole), `${uName}`), // generate unique ID
            formattedName,
            document.getElementById("userEmail").value,
            document.getElementById("userPassword").value,
            userRole,
            document.getElementById("userPhone").value,
            document.getElementById("userStatus").value,
            new Date(), //creation date (joinDate)
        );
        users.push(newUser);
        localStore.write("users", users);

        // Reset form and hide it
        e.target.reset();
        e.target.classList.remove("was-validated");
        document.getElementById("userForm").classList.add("d-none");
        Toast.notify("New user has been successfully added", "success");

        // Re-render users
        const container = document.getElementById("adminContent");
        renderUsers(container);
    }

    e.target.classList.add("was-validated");
}

async function handleUserDelete(e) {
    e.preventDefault();
    const button = e.target.closest('button');
    if (!button) return;

    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    if (!id || !name) return;

    const confirmed = await showConfirmDialog(`Are you sure you want to delete ${name}?`, `Delete ${name}`);
    if (!confirmed) return;

    const users = localStore.read("users") || [];
    const updated = users.filter((u) => u.id !== id);
    localStore.write("users", updated);

    Toast.notify(`${name} has been successfully deleted.`,"success");

    const container = document.getElementById("adminContent");
    renderUsers(container);
}

function handleUserSearch() {
    const searchTerm = this.value.toLowerCase();
    const container = document.getElementById("adminContent");
    const rows = container.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        const id = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        const name = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
        const email = row.querySelector("td:nth-child(4)").textContent.toLowerCase();

        if ( id.includes(searchTerm) || name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function handleRoleFilter() {
    const selectedRole = this.value.toLowerCase();
    const container = document.getElementById("adminContent");
    const rows = container.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        const roleCell = row.querySelector("td:nth-child(5)"); // Role column
        const roleText = roleCell.textContent.toLowerCase();

        if (selectedRole === "" || roleText.includes(selectedRole)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// User Management Functions
export function viewUserDetails(userId) {
    const users = localStore.read("users") || [];
    const user = users.find((u) => u.id == userId);

    if (user) {
        const modalHtml = `
            <div class="modal fade" id="userDetailsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-user-circle me-2"></i>User Details
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-4">
                                <div class="col-md-4 text-center mt-5">
                                    <h4 class="fw-bold mb-4">${user.name}</h4>
                                    <span class="badge bg-primary mb-2">
                                        ${capitalizeWords(user.role || 'Customer')}
                                    </span>
                                    <br>
                                    <span class="badge ${user.status === "active" || !user.status ? "bg-success" : "bg-secondary"}">
                                        ${(capitalizeWords(user.status || "Active"))}
                                    </span>
                                </div>
                                <div class="col-md-8">
                                    <div class="row g-3">
                                        <div class="col-12">
                                            <label class="form-label text-muted small">EMAIL ADDRESS</label>
                                            <div class="fw-semibold">${user.email}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">PHONE NUMBER</label>
                                            <div class="fw-semibold">${user.phone || "Not provided"}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">USER ID</label>
                                            <div class="fw-semibold">#${user.id}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">ROLE</label>
                                            <div class="fw-semibold">${capitalizeWords(user.role || 'Customer')}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">JOINING DATE</label>
                                            <div class="fw-semibold">${formatDate(user.joinDate)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="editUserFromDetailsBtn" data-user-id="${user.id}">
                        <i class="fas fa-pencil me-2"></i>Edit User
                        </button>
                        <a href="mailto:${user.email}" class="btn btn-success">
                        <i class="fas fa-envelope me-2"></i>Send Email
                        </a>
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById("userDetailsModal");
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to DOM and show it
        document.body.insertAdjacentHTML("beforeend", modalHtml);
        const modal = new bootstrap.Modal(document.getElementById("userDetailsModal"));
        modal.show();

        // Add event listener for edit button in modal
        const editBtn = document.getElementById("editUserFromDetailsBtn");
        if (editBtn) {
            editBtn.addEventListener("click", function () {
                const userId = this.getAttribute("data-user-id");
                modal.hide();
                editUser(userId);
            });
        }

        // Clean up modal after it's hidden
        document.getElementById("userDetailsModal").addEventListener("hidden.bs.modal", function () {
            this.remove();
        });
    }
}

export function editUser(userId) {
    const users = localStore.read("users") || [];
    const user = users.find((u) => u.id == userId);

    if (user) {
        const editModalHtml = `
            <div class="modal fade" id="editUserModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-edit me-2"></i>Edit User
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editUserForm" class="needs-validation" novalidate>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="editUserName" class="form-label">
                                            <i class="fas fa-user me-1 text-primary"></i>Full Name
                                        </label>
                                        <input type="text" class="form-control" id="editUserName" 
                                               value="${user.name}" required>
                                        <div class="invalid-feedback">
                                            User name is required.
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="editUserEmail" class="form-label">
                                            <i class="fas fa-envelope me-1 text-primary"></i>Email Address
                                        </label>
                                        <input type="email" class="form-control" id="editUserEmail" 
                                               value="${user.email}" required>
                                        <div class="invalid-feedback">
                                            Please provide a valid email address.
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="editUserPhone" class="form-label">
                                            <i class="fas fa-phone me-1 text-primary"></i>Phone Number
                                        </label>
                                        <input type="tel" class="form-control" id="editUserPhone" 
                                               value="${user.phone || ""}" placeholder="Enter phone number" required >
                                    </div>
                                    <div class="col-md-6">
                                        <label for="editUserRole" class="form-label">
                                            <i class="fas fa-user-tag me-1 text-primary"></i>Role
                                        </label>
                                        <select class="form-select" id="editUserRole">
                                            <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
                                            <option value="seller" ${user.role === "seller" ? "selected" : ""}>Seller</option>
                                            <option value="customer" ${user.role === "customer" ? "selected" : ""}>Customer</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="editUserStatus" class="form-label">
                                            <i class="fas fa-toggle-on me-1 text-primary"></i>Status
                                        </label>
                                        <select class="form-select" id="editUserStatus">
                                            <option value="active" ${user.status === "active" || !user.status ? "selected" : ""}>Active</option>
                                            <option value="inactive" ${user.status === "inactive" ? "selected" : ""}>Inactive</option>
                                            <option value="banned" ${user.status === "banned" ? "selected" : ""}>Banned</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger " id="resetPasswordBtn" data-user-id="${user.id}">
                                <i class="fas fa-key me-2"></i>Reset Password
                            </button>
                            <button type="button" class="btn btn-primary " id="updateUserBtn" data-user-id="${user.id}">
                                <i class="fas fa-save me-2"></i>Update User
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Remove existing modal if any
        document.getElementById("editUserModal")?.remove();
        // Add modal to DOM and show it
        document.body.insertAdjacentHTML("beforeend", editModalHtml);
        const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
        modal.show();

        //............................Add event listeners..................
        // update btn
        document.getElementById("updateUserBtn")?.addEventListener("click", function () {
            const userId = this.getAttribute("data-user-id");
            updateUser(userId);
        });
        //reset password randomly btn
        document.getElementById("resetPasswordBtn")?.addEventListener("click", function () {
            const userId = this.getAttribute("data-user-id");
            const users = localStore.read("users") || [];
            const userIndex = users.findIndex((u) => u.id == userId);

            if (userIndex !== -1) {// if the index is found
                // Generate new password
                const newPassword = generateRandomPassword(6);
                // Update password in localStorage
                users[userIndex].password = newPassword;
                localStore.write("users", users);
                Toast.notify(`New password has been changed and sent to ${users[userIndex].email}`, "success");
            }
        });

        // Clean up modal after it's hidden
        document.getElementById("editUserModal").addEventListener("hidden.bs.modal", function () {
            this.remove();
        });
    }
}
export function updateUser(userId) {
    const users = localStore.read("users") || [];
    //check if user exists then returns its index or -1 if not found
    const userIndex = users.findIndex((u) => u.id == userId);

    if (userIndex !== -1) {
        const form = document.getElementById("editUserForm");

        if (form.checkValidity()) {
            const updatedName = document.getElementById("editUserName").value;
            const updatedEmail = document.getElementById("editUserEmail").value;
            const updatedPhone = document.getElementById("editUserPhone").value;
            const updatedRole = document.getElementById("editUserRole").value;
            const updatedStatus = document.getElementById("editUserStatus").value;

            // Check if email already exists for other users except the one being updated
            const emailExists = users.find((u) => u.email === updatedEmail && u.id != userId);
            if (emailExists) {
                Toast.notify("Email address already exists for another user!", "danger");
                return;
            }
            // Update user data
            users[userIndex].name = updatedName;
            users[userIndex].email = updatedEmail;
            users[userIndex].phone = updatedPhone;
            users[userIndex].role = updatedRole;
            users[userIndex].status = updatedStatus;

            // Save to localStorage
            localStore.write("users", users);

            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById("editUserModal"));
            modal.hide();

            Toast.notify(`${updatedName} has been successfully updated.`, "success");

            // Re-render the users table
            const container = document.getElementById("adminContent");
            renderUsers(container);
        } else {
            form.classList.add("was-validated");
        }
    }
}

// Bulk Actions
function toggleBulkActions() {
    const selectedCheckboxes = document.querySelectorAll(".user-checkbox:checked");
    const bulkActionsBar = document.getElementById("bulkActionsBar");

    if (selectedCheckboxes.length > 0) {
        if (bulkActionsBar) {
            bulkActionsBar.classList.remove("d-none");
            bulkActionsBar.querySelector("#selectedCount").textContent = selectedCheckboxes.length;
        }
    } else {
        if (bulkActionsBar) {
            bulkActionsBar.classList.add("d-none");
        }
    }
}

export async function bulkAction(action) {
    const selectedCheckboxes = document.querySelectorAll(".user-checkbox:checked");
    const selectedIds = Array.from(selectedCheckboxes).map((cbox) => cbox.value);
    let users = localStore.read("users") || [];

    if (action === "delete") {
        // await is a must for async function (to prevent deleting users before confirmation)
        const confirmed = await showConfirmDialog(`Are you sure you want to delete ${selectedIds.length} selected user(s)?`);
        if (!confirmed) {
            return; // User cancelled, exit function
        }
        //filter out users that are not selected 
        users = users.filter((u) => !selectedIds.includes(u.id.toString()));
        Toast.notify(`${selectedIds.length} user(s) have been deleted successfully.`,"success");
    }
    else {//activate or deactivate (needs confirmation too)
        const confirmed = await showConfirmDialog(`Are you sure you want to delete ${selectedIds.length} selected user(s)?`);
        if (!confirmed) {
            return; // User cancelled, exit function
        }
        users.forEach((user) => {
            if (selectedIds.includes(user.id.toString())) {
                user.status = action === "activate" ? "active" : "inactive";
            }
        });
        Toast.notify(`${selectedIds.length} user(s) have been ${action}d successfully.`,"success");
    }

    localStore.write("users", users);
    // Re-render table
    const container = document.getElementById("adminContent");
    renderUsers(container);
}
// Sorting Functions
function handleSort(e) {
    const header = e.currentTarget;
    const field = header.getAttribute('data-sort'); //id, name, category, price, stock

    // Toggle direction if same field
    if (currentSort.field === field) { //If same col clicked again =>change sorting direction value "asc , desc"
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.field = field; // instead of default "null"
        currentSort.direction = 'asc'; //if diff col clicked =>change sorting direction value to "asc" default
    }

    // Sort Users
    sortUsers(field, currentSort.direction);
}

function sortUsers(field, direction) {
    const users = localStore.read("users") || [];

    const sortedUsers = [...users].sort((a, b) => {
        let aVal, bVal;

        switch (field) {
            case 'id':
                aVal = a.id;
                bVal = b.id;
                break;
            case 'user':
                aVal = a.name.toLowerCase();
                bVal = b.name.toLowerCase();
                break;
            case 'email':
                aVal = a.email.toLowerCase();
                bVal = b.email.toLowerCase();
                break;
            case 'role':
                aVal = a.role.toLowerCase();
                bVal = b.role.toLowerCase()
                break;
            case 'status':
                aVal = a.status.toLowerCase();
                bVal = b.status.toLowerCase();
                break;
            case 'joiningDate':
                aVal = a.joinDate;
                bVal = b.joinDate;
                break;
            default:
                return 0;
        }

        // string comparison
        if (typeof aVal === 'string' && typeof bVal === 'string') {
            if (direction === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        }

        // Handle numeric comparison
        if (direction === 'asc') {
            return aVal - bVal;
        } else {
            return bVal - aVal;
        }
    });

    // Re-render table body
    const tbody = document.getElementById('usersTableBody');
    if (tbody) {
        tbody.innerHTML = sortedUsers.map(user => renderUserRow(user)).join("");
        attachRowEventListeners()
    }
}
//reattaching events after sorting cause somehow it gets lost after rendering
function attachRowEventListeners() {
    // Re-attach delete buttons
    document.querySelectorAll(".remove-user").forEach((btn) => {
        btn.addEventListener("click", handleUserDelete);
    });
    // Re-attach edit buttons
    document.querySelectorAll(".edit-user-btn")?.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const userId = btn.getAttribute("data-user-id");
            editUser(userId);
        });
    });

    // Re-attach view buttons
    document.querySelectorAll(".view-user-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("data-user-id");
            viewUserDetails(userId);
        });
    });

    // Re-attach checkboxes
    document.querySelectorAll(".user-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", toggleBulkActions);
    });

    // Re-attach tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tp) => {
        new bootstrap.Tooltip(tp);
    });
}