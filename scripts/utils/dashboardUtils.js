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
 * Renders product stock details (sizes and colors)
 * @param {Object} product - Product object
 * @returns {string} - string showing product stock details
 */
export function renderStockDetails(product) {
    const colors = [...product.stock.map((s) => s.color)];
    // Get unique sizes value and .flat() the array to get 1 dimenssional array cause sizes is in multiple arrays
    const sizes = [
        ...new Set(product.stock.map((s) => s.sizes.map((sz) => sz.name)).flat()),
    ];
    //   console.log(sizes);
    return `
        <div class="mt-1 text-align-start">
            <small class="text-muted d-block">
                <strong>Colors:</strong> ${colors.join(', ')}
            </small>
            <small class="text-muted d-block">
                <strong>Sizes:</strong> ${sizes.join(' , ')}
            </small>
            <small class="text-muted d-block">
                <strong>Qty:</strong> ${getTotalQty(product)}
            </small>
        </div>
    `;
}
export function getTotalQty(product) {
    return product.stock.reduce((total, item) => {
        //outer reduce for stock array
        const sizeTotal = item.sizes.reduce((sum, size) => sum + size.qty, 0); //inner reduce for sizes array
        return total + sizeTotal;
    }, 0);
}

/**
 * Renders product status in colored string
 * @param {Object} product - Product object
 * @returns {string} - string showing product status as a bootstrap badge
 */

export function getProductStatus(product) {
    const status = product.status || 'pending'; // default to pending if no status from mariam(later)

    const prodStatus = {
        pending: { class: 'bg-warning text-dark', text: 'Pending' },
        approved: { class: 'bg-success', text: 'Approved' },
    };
    const config = prodStatus[status.toLowerCase()];
    return `<span class="badge ${config.class}">${config.text}</span>`;
}

/**
 * Capitalize the first letter of each word in a string
 * @example
 * capitalizeWords("ahmed yasser beltagy azza maraiam");
 * // Returns: "Ahmed Yasser Beltagy Azza Maraiam"
 */
export function capitalizeWords(name) {
    if (!name || typeof name !== 'string') return 'N/A';

    return name
        .toLowerCase()
        .split(/\s+/) // split by one or more spaces
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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
        .split(' ')
        .map((word) => word[0])
        .join('')
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
        'bg-primary',
        'bg-success',
        'bg-info',
        'bg-warning',
        'bg-danger',
    ];
    var coloredCircle = `class="rounded-circle ${colors[Math.floor(Math.random() * colors.length)]
        } text-white d-flex align-items-center justify-content-center me-3 p-3"`;
    return coloredCircle;
}

/**
 * Format date string to readable format
 * @param {string|Date} dateString - Date string or Date object
 * @returns {string} - Formatted date string ex:"Aug 1, 2025"
 */
export function formatDate(dateString) {
    const date = new Date(dateString || Date.now());
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Show a Bootstrap alert just above the target element
 * @param {string} message - Alert text
 * @param {string} type - Bootstrap color (success, danger, warning, info...)
 * @param {HTMLElement} target - Element to show the alert above (default: document.body)
 * @param {number|null} duration - Auto remove after  (default: 5000ms, null = keep)
 */
export function showAlert(
    message,
    type = 'success',
    target = document.body,
    duration = 5000
) {
    const alertDiv = document.createElement('div');
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
    alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

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
export function showConfirmDialog(message, title = 'Confirm Action') {
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
        const existingModal = document.getElementById('confirmModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = new bootstrap.Modal(document.getElementById('confirmModal'));

        //event handlers
        //confirmation
        document.getElementById('confirmOk').addEventListener('click', () => {
            modal.hide();
            resolve(true);
        });
        //cancellation
        document.getElementById('confirmCancel').addEventListener('click', () => {
            modal.hide();
            resolve(false);
        });

        // Clean up modal after it's hidden
        document
            .getElementById('confirmModal')
            .addEventListener('hidden.bs.modal', function () {
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
        console.error('Thumbnail error:', err); // if therer is no img
    } //in case there is no image display the colored circle
    return `https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
}

/**
 * Generates a random password of the specified length
 * @param {number}  -Length of the password to generate
 * @returns {string} - Random password
 */
export function generateRandomPassword(length = 6) {
    const charset =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

export function getRoleBadge(role) {
    const roleColors = {
        admin: 'bg-danger',
        seller: 'bg-warning text-dark',
        customer: 'bg-info',
    };

    return `<span class="badge ${roleColors[role] || 'bg-secondary'}">
                ${capitalizeWords(role || 'Customer')}
            </span>`;
}
//Bootstrap      for product images into the view product modal
export function buildCarousel(product, carouselId) {
    // Get all images from product stock
    const images = product.stock.flatMap(variation => variation.images);
    return `
        <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel " >
            <div class="carousel-inner">
                ${images.map((img, index) => `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${img}" class="d-block w-100 rounded" alt="Product Image ${index + 1}"
                     style=" max-height: 150px;  object-fit: contain;"/>
                </div>
                `).join('')}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true" id="carouselPrevBtn"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true" id="carouselNextBtn"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;
}

// .........................for orders page..............................
// Status styling functions (badge & icon) .
export function orderStatusBadge(status) {
    switch(status?.toLowerCase()) {
        case 'pending': return 'bg-warning text-dark';
        case 'cancelled': return 'bg-danger text-white';
        case 'shipped': return 'bg-primary text-white';
        case 'delivered': return 'bg-success text-white';
    default: return 'bg-warning text-dark';
    }
}

export function getStatusIcon(status) {
    switch(status?.toLowerCase()) {
        case 'pending': return '<i class="fas fa-clock"></i>';
        case 'cancelled': return '<i class="fas fa-xmark"></i>';
        case 'shipped': return '<i class="fas fa-truck"></i>';
        case 'delivered': return '<i class="fas fa-check-circle"></i>';
        default: return '<i class="fas fa-clock"></i>';
    }
}
//..................................................................................................


/**
 * Calculates the total value of the inventory based on the given products array.
 * @param {Array.<Object>} products - Array of  objects.
 * @returns {number} Total value of the inventory.
 */

export function inventoryValue(products) {
    let totalQty = 0;
    let totalValue = 0;

    products.forEach(product => {
        const price = product.price;

        product.stock.forEach(stockItem => {
            stockItem.sizes.forEach(size => {
                totalQty += size.qty;
                totalValue += size.qty * price;
            });
        });
    });

    return  totalValue||0;
}