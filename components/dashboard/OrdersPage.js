import { capitalizeWords, truncateText, orderStatusBadge, getStatusIcon } from "../../scripts/utils/dashboardUtils.js";
import { localStore } from "../../scripts/utils/storage.js";
import Toast from "../ui/toast.js";

export function renderOrders(container) {
    const ordersData = localStore.read('orders') || [];

    container.innerHTML = `
        <!--.............................Header Section.......................... -->
        <div class="card border-0 shadow-lg mb-4">
            <div class="card-header bg-primary text-white py-3">
                <div class="row align-items-center">
                    <div class="col">
                        <h2 class="card-title mb-1 h4">
                            <i class="fa fa-shopping-cart me-2"></i>
                            Orders Management
                        </h2>
                        <p class="card-text mb-0 opacity-85">
                            Manage and oversee all Orders in <span class="fw-bold">AYAAM</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
            <!--..............................Stats Row ...........................-->
        <div class="row mb-4 top-quick-stats">
            <!-- Total Orders Card -->
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card border-0 shadow-sm h-100 statsCard-TotalOrders" >
                    <div class="card-body text-white text-center">
                        <i class="fas fa-shopping-cart fa-2x mb-2"></i>
                        <h3 class="mb-1">${ordersData.length}</h3>
                        <p class="mb-0">Total Orders</p>
                    </div>
                </div>
            </div>

            <!-- Pending Orders Card -->
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card border-0 shadow-sm h-100 statsCardPending">
                    <div class="card-body text-white text-center">
                        <i class="fas fa-clock fa-2x mb-2"></i>
                        <h3 class="mb-1">${ordersData.filter(o => (o.state || 'pending') === 'pending').length}</h3>
                        <p class="mb-0">Pending</p>
                    </div>
                </div>
            </div>
            <!-- Cancelled Orders Card -->
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card border-0 shadow-sm h-100 statsCardCancelled">
                    <div class="card-body text-white text-center">
                        <i class="fa fa-xmark fa-2x mb-2"></i>
                        <h3 class="mb-1">${ordersData.filter(o => o.state === 'cancelled').length}</h3>
                        <p class="mb-0">Cancelled</p>
                    </div>
                </div>
            </div>

            <!-- Shipped Orders Card -->
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card border-0 shadow-sm h-100 statsCardShipped">
                    <div class="card-body text-white text-center">
                        <i class="fas fa-truck fa-2x mb-2"></i>
                        <h3 class="mb-1">${ordersData.filter(o => o.state === 'shipped').length}</h3>
                        <p class="mb-0">Shipped</p>
                    </div>
                </div>
            </div>

            <!-- Delivered Orders Card -->
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card border-0 shadow-sm h-100 statsCardDelivered">
                    <div class="card-body text-white text-center">
                        <i class="fas fa-check-circle fa-2x mb-2"></i>
                        <h3 class="mb-1">${ordersData.filter(o => o.state === 'delivered').length}</h3>
                        <p class="mb-0">Delivered</p>
                    </div>
                </div>
            </div>

        </div>
            <!-- Filters and Search -->
            <div class="row mb-4">
                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-search"></i></span>
                        <input type="text" class="form-control" id="orderSearch" placeholder="Search orders by ID, customer name, or email...">
                    </div>
                </div>
                <div class="col-md-4">
                    <select class="form-select" id="statusFilter">
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
            </div>

            <!-- Orders Table -->
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-white d-flex justify-content-between align-items-center">
                            <h6 class="mb-0"><i class="fas fa-list me-2"></i>All Orders</h6>
                            <small class="text-muted">${ordersData.length} orders found</small>
                        </div>
                        <div class="card-body p-0">
                            <div id="ordersTableContainer">
                                ${renderOrdersTable(ordersData)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    `;

    orderEvents();
}

// Orders table render
function renderOrdersTable(orders) {
    if (orders.length === 0) {
        return `
        <div class="text-center py-5">
            <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">No orders found</h5>
            <p class="text-muted">Orders will appear here once customers start purchasing</p>
        </div>`;
    }

    return `
    <div class="table-responsive" style= "min-height: 55vh;">
        <table class="table table-hover mb-0">
            <thead class="table-light admin-th">
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Payment \n Method</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(order => {
        const total = order.orderItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0).toFixed(2);
        const status = order.state || 'pending';
        const statusClass = orderStatusBadge(status);

        return `
                        <tr id="order-row-${order.orderId}">
                            <td><code>${order.orderId}</code></td>
                            <td>
                                <strong>${order.userName}</strong><br>
                                <small class="text-muted">${order.userEmail}</small>
                            </td>
                            <!-- Products -->
                            <td>
                                ${order.orderItems.map(item => `
                                    <div class="d-flex align-items-center mb-2">
                                        <img src="${item.img}" alt="${item.productName}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;margin-right:10px;" />
                                        <div>
                                            <strong style="font-size:0.8rem;">${truncateText(item.productName, 25)}</strong><br>
                                            <small class="text-muted">Qty: ${item.qty} | Size: ${item.size}</small>
                                        </div>
                                    </div>
                                `).join('')}
                            </td>
                            <!-- Status -->
                            <td>
                                <span id="status-badge-${order.orderId}" class="badge ${statusClass}">
                                    ${getStatusIcon(status)} ${capitalizeWords(status)}
                                </span>
                            </td>
                            <td><strong class="text-success">$${total}</strong></td>
                            <td class="text-muted fw-semibold ps-3" >${order.paymentMethod}</td> 
                            <td><small>${order.orderDate}</small></td>
                            <td>
                                <div class="btn-group btn-group-sm" role="group">
                                        <button class="btn btn-sm view-order-btn" 
                                            data-order-id="${order.orderId}" title="View Details" data-action="view-details">
                                            <i class="fas fa-eye text-info"></i>
                                        </button>
                                    <div class="dropdown">
                                        <button class="btn btn-sm  dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                            <i class="fas fa-cog"></i>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><h6 class="dropdown-header">Update Status</h6></li>
                                            <li>
                                                <a class="dropdown-item" href="#" data-action="status-update" data-order-id="${order.orderId}" data-status="pending">
                                                    <i class="fas fa-clock me-2 text-warning"></i>Mark as Pending
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" data-action="status-update" data-order-id="${order.orderId}" data-status="cancelled">
                                                    <i class="fas fa-xmark me-2 text-danger"></i>Mark as Cancelled
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" data-action="status-update" data-order-id="${order.orderId}" data-status="shipped">
                                                    <i class="fas fa-truck me-2 text-primary"></i>Mark as Shipped
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" data-action="status-update" data-order-id="${order.orderId}" data-status="delivered">
                                                    <i class="fas fa-check-circle me-2 text-success"></i>Mark as Delivered
                                                </a>
                                            </li>
                                           
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>`;
    }).join('')}
            </tbody>
        </table>
    </div>`;
}

// .........................event listeners...........................
function orderEvents() {
    document.removeEventListener('click', ordersActions); //not best practice to use doc, but to avoid duplicate listeners (searching for better way)
    document.addEventListener('click', ordersActions);

    // Search and filter listeners
    const searchInput = document.getElementById('orderSearch');
    const statusFilter = document.getElementById('statusFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterOrders);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', filterOrders);
    }
}

// Handle order actions (buttons)
function ordersActions(e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    e.preventDefault();
    const action = target.dataset.action;
    const orderId = target.dataset.orderId;
    switch (action) {
        case 'status-update':
            updateOrderStatus(orderId, target.dataset.status); //target.dataset.status == newStatus
            break;
        case 'view-details':
            viewOrderDetails(orderId);
            break;
    }
}
//...................................................................
// Update order status
//logic for updating order status and canceling order
//if order is cancelled, restore inventory and update status and prevent changing status again
// restoreing inventory (products qty) : stock has colors => sizes => [{name:.., qty:..}] these sizes will be restored when cancelled
//orders have ordersItems(products) 

function updateOrderStatus(orderId, newStatus) {
    const orders = localStore.read("orders") || [];
    const orderIndex = orders.findIndex(o => o.orderId === orderId); //0,1,2,3.. or -1 if not found

    if (orderIndex !== -1) {
        const order = orders[orderIndex];
        const currentStatus = order.state || 'pending';

        // Prevent changing status if order is already cancelled
        if (currentStatus === 'cancelled') {
            Toast.notify(`This order is already cancelled, can't update status`, 'warning');
            return;
        }

        // rstore inventory when order is cancelled
        if (newStatus === 'cancelled') {
            if (restoreInventory(order.orderItems)) { // if the return value from restoreInventory() is true 
                Toast.notify(`Inventory restored for cancelled order #${orderId}`, 'info');
            }
        }

        // Update the order status
        orders[orderIndex].state = newStatus;
        localStore.write("orders", orders);
        // Update the status badge
        const statusBadge = document.getElementById(`status-badge-${orderId}`);
        if (statusBadge) {
            statusBadge.className = `badge ${orderStatusBadge(newStatus)}`;
            statusBadge.innerHTML = `${getStatusIcon(newStatus)} ${capitalizeWords(newStatus)}`;
        }
        // Update stats bar
        updateQuickStats();
        Toast.notify(`Order #${orderId} status updated to ${capitalizeWords(newStatus)}!`, 'success');
    }
}

// restore the cancelled items in the orders to the products stock  
function restoreInventory(orderProducts) {
    const products = localStore.read('products') || []; // to compare the order's products with the products
    let updated = false;

    orderProducts.forEach(item => {
        const productIndex = products.findIndex(p => p.id === item.productId);

        if (productIndex !== -1) {
            const product = products[productIndex];

            // find  by color
            const stockItem = product.stock?.find(s => s.color === item.color);//compare the stock color with the order color

            if (stockItem && stockItem.sizes) {
                // Find the correct size within the stock item
                const sizeItem = stockItem.sizes.find(s => s.name === item.size);//compare the stock size with the order size

                if (sizeItem) {
                    // Restore the quantity
                    sizeItem.qty += parseInt(item.qty);
                    updated = true;
                    console.log(`Restored ${item.qty} units of ${product.name} (${item.color}, ${item.size})`);
                }
            }
        }
    });

    if (updated) {
        localStore.write('products', products);
    }

    return updated;
}
// Update stats bar
function updateQuickStats() {
    const orders = localStore.read('orders') || [];
    const stats = document.querySelectorAll('.top-quick-stats h3'); //only rewrite in h3s inside the card

    if (stats.length >= 4) {
        stats[0].textContent = orders.length;
        stats[1].textContent = orders.filter(o => (o.state || 'pending') === 'pending').length;
        stats[2].textContent = orders.filter(o => o.state === 'cancelled').length;
        stats[3].textContent = orders.filter(o => o.state === 'shipped').length;
        stats[4].textContent = orders.filter(o => o.state === 'delivered').length;
    }
}

// Filter orders (search and filters)
function filterOrders() {
    const searchTerm = document.getElementById('orderSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';

    const orders = localStore.read('orders') || [];
    const filteredOrders = orders.filter(order => { //filter based on both search and status filtering
        // Search filter
        const matchesSearch = !searchTerm ||
            order.orderId.toLowerCase().includes(searchTerm) ||
            order.userName.toLowerCase().includes(searchTerm) ||
            order.userEmail.toLowerCase().includes(searchTerm);
        // Status filter
        const matchesStatus = !statusFilter || (order.state) === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Re-render table with filtered orders
    const tableContainer = document.getElementById('ordersTableContainer');
    if (tableContainer) {
        tableContainer.innerHTML = renderOrdersTable(filteredOrders);
    }
}

// View order details in a modal
function viewOrderDetails(OrderId) {
    const ordersData = localStore.read('orders') || [];
    const order = ordersData.find((o) => o.orderId === OrderId);

    if (order) {
        const total = order.orderItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0).toFixed(2);
        const modalHtml = `
            <div class="modal fade" id="orderDetailsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-box-open me-2"></i>Order Details - #${order.orderId}
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-4">
                            <!-- ..............left side (pictures).......... -->
                                <div class="col-md-4 text-center mt-5 mb-4">
                                    <div class="col-12">
                                        <div class="fw-semibold">
                                            ${order.orderItems.map(item => `
                                                <div class="d-flex align-item-start mb-3">
                                                    <img src="${item.img}" alt="${item.productName}" style="width:50px;height:50px;object-fit:cover;border-radius:6px;margin-right:10px;" />
                                                    <div class="text-start">
                                                        <strong style="font-size:0.8rem;">${truncateText(item.productName, 25)}</strong><br>
                                                        <small class="text-muted">Qty: ${item.qty} | Size: ${item.size} </small><br>
                                                        <small class="text-muted">Color: ${item.color} | Price: ${item.price}</small>
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                                <!-- right side (details) -->
                                <div class="col-8 border-start mt-5" ">
                                    <div class="row g-3">
                                        <div class="col-6 ">
                                            <label class="form-label text-muted small">Order ID:</label>
                                            <div class="fw-semibold">${order.orderId}</div>
                                        </div>
                                        <div class="col-6"
                                            <label class="form-label text-muted small">Customer Name:</label>
                                            <div class="fw-semibold">${order.userName}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">Customer Email:</label>
                                            <div class="fw-semibold"><a href="mailto:${order.userEmail}">${order.userEmail} </a></div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">Order's Date:</label>
                                            <div class="fw-semibold">${order.orderDate}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">Order's Status:</label> <br>
                                            <div class="fw-semibold badge ${orderStatusBadge(order.state)} ">${order.state || 'pending'}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">Total Price:</label>
                                            <div class="fw-semibold">$${total}</div>
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label text-muted small">Payment Method :</label>
                                            <div class="fw-semibold">${order.paymentMethod}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const existingModal = document.getElementById('orderDetailsModal');
        if (existingModal) {
            existingModal.remove();
        }
        // Appending
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
        modal.show();
        // remove modal when hidden
        document.getElementById('orderDetailsModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
    }
}