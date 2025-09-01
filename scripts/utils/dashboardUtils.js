/**
 * check all products that are in stock
 * @param {Object} product - Product object
 * @returns {string} - In Stock or Out of Stock
 */
export function checkStock(product) {
    for (const item of product.stock) {
        for (const quantity of item.sizes) {
            if (quantity.qty > 0) {
                return `In Stock`;
            }
        }
        return `Out Of Stock`;
        // `<span class="badge bg-success">In Stock</span>`
        // `<span class="badge bg-danger">Out of Stock</span>`
    }
}

/**
 * Capitalize the first letter of each word in a string
 * @example
 * capitalizeWords("ahmed yasser beltagy azza maraiam"); 
 * // Returns: "Ahmed Yasser Beltagy Azza Maraiam"
 */
export function capitalizeWords(name) {
    if (!name || typeof name !== "string") return "N/A";

    return name
        .toLowerCase()
        .split(/\s+/) // split by one or more spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

/**
 * Generate unique ID
 * @param {string} prefix - Prefix for the ID (optional)
 * @param {string} second - Second string (first two words only)
 * @returns {string} - Unique ID (1st letter of prefix + 1st letter of first word + 1st letter of second word + last 6 digits of timestamp)
 */
export function generateId(prefix = '', second = '') {
    const fLetter = prefix ? prefix[0].toUpperCase() : '';
    const words = second.trim().split(/\s+/);
    const first = words[0] ? words[0][0].toUpperCase() : '';
    const secondLetter = words[1] ? words[1][0].toUpperCase() : '';

    const timestamp = Date.now().toString();
    const last6 = timestamp.slice(-6);

    return `${fLetter}${first}${secondLetter}${last6}`;
}

/**
 * Get initials from a name string
 * @param {string} name - Full name
 * @returns {string} - Initials in uppercase (first letter of each word)
 */
export function getInitials(name) {
    if (!name || typeof name !== 'string') return 'N/A';

    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
}

/**
 * Get a random Bootstrap color class for bg
 * get flex circular shape with white text
 * @returns {rounded-cricle with custom bootstrap style} => 
 * may needs styling ex: style="width: 40px; height: 40px; font-size: 0.875rem; font-weight: bold;
 */
export function getRandomColor() {
    const colors = [
        "bg-primary",
        "bg-success",
        "bg-info",
        "bg-warning",
        "bg-danger",
    ];
    var coloredCircle = `class="rounded-circle ${colors[Math.floor(Math.random() * colors.length)]} text-white d-flex align-items-center justify-content-center me-3 p-3"`;
    return coloredCircle;
}

/**
 * Format date string to readable format
 * @param {string|Date} dateString - Date string or Date object
 * @returns {string} - Formatted date string ex:"Aug 1, 2025"
 */
export function formatDate(dateString) {
    const date = new Date(dateString || Date.now());
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

/**
 * Show a Bootstrap alert just above the target element
 * @param {string} message - Alert text
 * @param {string} type - Bootstrap color (success, danger, warning, info...)
 * @param {HTMLElement} target - Element to show the alert above (default: document.body)
 * @param {number|null} duration - Auto remove after  (default: 5000ms, null = keep)
 */
export function showAlert(message, type = "success", target = document.body, duration = 5000) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-2`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert alert just before the target
    if (target.parentNode) {
        target.parentNode.insertBefore(alertDiv, target);
    } else {
        document.body.appendChild(alertDiv);
    }

    //  Scroll to the alert so it's visible
    alertDiv.scrollIntoView({ behavior: "smooth", block: "center" });

    // Auto remove after duration
    if (duration) {
        setTimeout(() => alertDiv.remove(), duration);
    }
}

/**
 * Show confirmation dialog
 * @param {string} message - Confirmation message
 * @param {string} title - Modal title (optional)
 * @returns {Promise<boolean>} - Promise that resolves to true if confirmed
 * Dont forget to use await before using it ex: const confirmed = await showConfirmDialog(...);
 * if its inside function make sure the function is async
 */
export function showConfirmDialog(message, title = "Confirm Action") {
    return new Promise((resolve) => {
        const modalHtml = `
            <div class="modal fade" id="confirmModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-question-circle me-2 text-danger"></i>
                                ${title}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            ${message}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="confirmCancel">
                                Cancel
                            </button>
                            <button type="button" class="btn btn-danger" id="confirmOk">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById("confirmModal");
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to DOM
        document.body.insertAdjacentHTML("beforeend", modalHtml);
        const modal = new bootstrap.Modal(document.getElementById("confirmModal"));

        //event handlers
        //confirmation
        document.getElementById("confirmOk").addEventListener("click", () => {
            modal.hide();
            resolve(true);
        });
        //cancellation
        document.getElementById("confirmCancel").addEventListener("click", () => {
            modal.hide();
            resolve(false);
        });

        // Clean up modal after it's hidden
        document.getElementById("confirmModal").addEventListener("hidden.bs.modal", function () {
            this.remove();
        });

        modal.show();
    });
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @returns {string} - Truncated text with ellipsis 
 */
export function truncateText(text, maxLength = 50) {
    if (!text || typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Returns the product thumbnail image URL from the data
 * @param {object}  - Product object data
 * @returns {string} - URL of the product thumbnail image
 */
export function getProductThumbnail(product) {
    try {
        if (
            product.category &&
            product.subcategory &&
            product.id &&
            product.stock?.length > 0 &&
            product.stock[0].images?.length > 0
        ) {
            return `${product.stock[0].images[0]}`;
        }
    } catch (err) {
        console.error("Thumbnail error:", err);// if therer is no img
    }//in case there is no image display the colored circle
    return `https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
}

/**
 * Generates a random password of the specified length
 * @param {number}  -Length of the password to generate
 * @returns {string} - Random password
 */
export function generateRandomPassword(length = 6) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

export function getRoleBadge(role) {
    const roleColors = {
        admin: 'bg-danger',
        seller: 'bg-warning text-dark',
        customer: 'bg-info'
    };

    return `<span class="badge ${roleColors[role] || 'bg-secondary'}">
                ${capitalizeWords(role || 'Customer')}
            </span>`;
}
