import { capitalizeWords, truncateText } from "../../scripts/utils/dashboardUtils.js";
import { localStore } from "../../scripts/utils/storage.js";    
import Toast from "../ui/toast.js";

// Render dashboard
export function renderOrdersDashboard(container) {
    const ordersData = localStore.read('orders') || [];
    // Calculate statistics
    const stats = calculateOrderStats(ordersData);
    // Prepare chart data
    const chartData = prepareChartData(ordersData);

    container.innerHTML = `
        <div class="container-fluid py-4">
            <!-- Dashboard Header -->
            <div class="row mb-4">
                <div class="col-12">
                    <h2 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Orders Dashboard</h2>
                    <p class="text-muted">Overview of <span class="fw-bold text-primary">AYAAM</span>'s order performance</p>
                </div>
            </div>

            <!-- Stats Cards -->
            <div class="row mb-4">
                ${renderStatCard('$' + stats.totalRevenue, 'Total Revenue', 'fa-dollar-sign', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')}
                ${renderStatCard(stats.totalOrders, 'Total Orders', 'fa-shopping-cart', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)')}
                ${renderStatCard(stats.pendingOrders, 'Pending Orders', 'fa-clock', 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)')}
                ${renderStatCard(stats.shippedOrders, 'Shipped Orders', 'fa-truck', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)')}
                ${renderStatCard(stats.deliveredOrders, 'Delivered Orders', 'fa-check-circle', 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)')}
            </div>

            <!-- Charts Row -->
            <div class="row mb-4">
                <div class="col-md-4">
                    ${renderChartCard('Orders by Category', 'categoryChart', 'fa-tags')}
                </div>
                <div class="col-md-4">
                    ${renderChartCard('Orders by Status', 'statusChart', 'fa-chart-pie')}
                </div>
                <div class="col-md-4">
                    ${renderTopProductsCard(chartData.topProducts)}
                </div>
            </div>

            <!-- Orders Table -->
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-white d-flex justify-content-between align-items-center">
                            <h6 class="mb-0"><i class="fas fa-list me-2"></i>Recent Orders</h6>
                        </div>
                        <div class="card-body p-0">
                            ${renderOrdersTable(ordersData)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => initializeOrdersDashboard(chartData), 100);
}

// Reusable stat card
export function renderStatCard(value, label, icon, gradient) {
    return `
    <div class="col col-12 col-md-2 col-lg">
        <div class="card border-0 shadow-sm h-100" style="background:${gradient};">
            <div class="card-body text-white text-center">
                <i class="fas ${icon} fa-2x mb-2"></i>
                <h3 class="mb-1">${value}</h3>
                <p class="mb-0">${label}</p>
            </div>
        </div>
    </div>`;
}

//chart card
export function renderChartCard(title, canvasId, icon) {
    return `
    <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white">
            <h6 class="mb-0"><i class="fas ${icon} me-2"></i>${title}</h6>
        </div>
        <div class="card-body">
            <canvas id="${canvasId}" width="300" height="200"></canvas>
        </div>
    </div>`;
}

// Top products card
export function renderTopProductsCard(topProducts) {
    return `
    <div class="card border-0 shadow-sm h-100">
        <div class="card-header bg-white">
            <h6 class="mb-0"><i class="fas fa-star me-2"></i>Top Products</h6>
        </div>
        <div class="card-body">
            <div class="top-products-list">
                ${topProducts.map((product, index) => `
                    <div class="d-flex align-items-center mb-3 ${index < topProducts.length - 1 ? 'border-bottom pb-3' : ''}">
                        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width:30px;height:30px;font-size:0.8rem;">
                            ${index + 1}
                        </div>
                        <div class="ms-3 flex-grow-1">
                            <h6 class="mb-1" style="font-size:0.9rem;">${product.name}</h6>
                            <small class="text-muted">${product.orders} orders</small>
                        </div>
                        <div class="text-end">
                            <strong class="text-success">$${product.revenue}</strong>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>`;
}

// Orders table
export function renderOrdersTable(orders) {
    //no rders
    if (orders.length === 0) {
        return `
        <div class="text-center py-5">
            <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">No orders yet</h5>
            <p class="text-muted">Orders will appear here once customers start purchasing</p>
        </div>`;
    }
    // Render orders inside table
    return `
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead class="table-light">
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(order => {
                    const total = order.orderItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0).toFixed(2);// for total col(price*qty)
                    
                    const status = order.state || 'pending'; // for status col
                    
                    const statusClass = getStatusBadgeClass(status);
                    // display odrers data in each row (the whole order with all items knside the row)
                    //tr id is = order id
                    return `
                        <tr id="order-row-${order.orderId}">
                            <td><code>${order.orderId}</code></td>
                            <td>
                                <strong>${order.userName}</strong><br>
                                <small class="text-muted">${order.userEmail}</small>
                            </td>
                            <td>
                                ${order.orderItems.map(item => `
                                    <div class="d-flex align-items-center mb-2">
                                        <img src="${item.img}" alt="${item.productName}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;margin-right:10px;" />
                                        <div>
                                            <strong style="font-size:0.8rem;">${truncateText(item.productName,25) }</strong><br>
                                            <small class="text-muted">Qty: ${item.qty} | Size: ${item.size}</small>
                                        </div>
                                    </div>
                                `).join('')}
                            </td>
                            <td>
                                <span id="status-badge-${order.orderId}" class="badge ${statusClass}">
                                    ${getStatusIcon(status)} ${capitalizeWords(status)}
                                </span>
                            </td>
                            <td><strong class="text-success">${total}</strong></td>
                            <td><small>${order.orderDate}</small></td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-sm  dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a class="dropdown-item }" href="#" data-action="status-update" data-order-id="${order.orderId}" data-status="pending">
                                                <i class="fas fa-clock me-2 text-warning"></i>Mark as Pending
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item }" href="#" data-action="status-update" data-order-id="${order.orderId}" data-status="confirmed">
                                                <i class="fas fa-check me-2 text-info"></i>Mark as Confirmed
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item }" href="#" data-action="status-update" data-order-id="${order.orderId}" data-status="shipped">
                                                <i class="fas fa-truck me-2 text-primary"></i>Mark as Shipped
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item }" href="#" data-action="status-update" data-order-id="${order.orderId}" data-status="delivered">
                                                <i class="fas fa-check-circle me-2 text-success"></i>Mark as Delivered
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>`;
                }).join('')}
            </tbody>
        </table>
    </div>`;
}

// Initialize dashboard functionality
export function initializeOrdersDashboard(chartData) {
    setupEventListeners();
    initializeOrderCharts(chartData);
}

// Event listeners (remove old listener then add new)
export function setupEventListeners() {
    document.removeEventListener('click', updateStatus);
    document.addEventListener('click', updateStatus);
}

// Handle clicks
export function updateStatus(event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    event.preventDefault();
    const action = target.dataset.action;

    switch(action) {
        case 'status-update':
            quickStatusUpdate(target.dataset.orderId, target.dataset.status);
            break;
    }
}

// Calculate statistics
export function calculateOrderStats(orders) {
    let totalRevenue = 0;
    let pendingOrders = 0;
    let confirmedOrders = 0;
    let shippedOrders = 0;
    let deliveredOrders = 0;

    orders.forEach(order => {
        const orderTotal = order.orderItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);
        totalRevenue += orderTotal;

        // Handle cases
        const status = (order.state || 'pending').toLowerCase();
        
        switch(status) {
            case 'confirmed': 
                confirmedOrders++;
                break;
            case 'shipped': 
                shippedOrders++;
                break;
            case 'delivered': 
                deliveredOrders++;
                break;
            default: 
                pendingOrders++;
                break;
        }
    });

    return {
        totalRevenue: totalRevenue.toFixed(2),
        totalOrders: orders.length,
        pendingOrders,
        confirmedOrders,
        shippedOrders,
        deliveredOrders
    };
}

// Chart data
export function prepareChartData(orders) {
    const categoryData = {};
    const statusData = { pending: 0, confirmed: 0, shipped: 0, delivered: 0 };
    const productRevenue = {};

    orders.forEach(order => {
        // Handle cases where state might be undefined
        const status = (order.state || 'pending').toLowerCase();
        statusData[status] = (statusData[status] || 0) + 1;

        order.orderItems.forEach(item => {
            categoryData[item.category] = (categoryData[item.category] || 0) + 1;

            const revenue = parseFloat(item.price) * item.qty;
            if (productRevenue[item.productName]) {
                productRevenue[item.productName].revenue += revenue;
                productRevenue[item.productName].orders++;
            } else {
                productRevenue[item.productName] = { revenue, orders: 1 };
            }
        });
    });

    const topProducts = Object.entries(productRevenue)
        .map(([name, data]) => ({
            name: name.length > 30 ? name.slice(0, 30) + '...' : name,
            revenue: data.revenue.toFixed(2),
            orders: data.orders
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    return { categoryData, statusData, topProducts };
}

// Status styling functions (badge & icon) ........................................................
function getStatusBadgeClass(status) {
    switch(status?.toLowerCase()) {
        case 'pending': return 'bg-warning text-dark';
        case 'confirmed': return 'bg-info text-white';
        case 'shipped': return 'bg-primary text-white';
        case 'delivered': return 'bg-success text-white';
    default: return 'bg-warning text-dark';
    }
}

function getStatusIcon(status) {
    switch(status?.toLowerCase()) {
        case 'pending': return '<i class="fas fa-clock"></i>';
        case 'confirmed': return '<i class="fas fa-check"></i>';
        case 'shipped': return '<i class="fas fa-truck"></i>';
        case 'delivered': return '<i class="fas fa-check-circle"></i>';
        default: return '<i class="fas fa-clock"></i>';
    }
}
//..................................................................................................
// Initialize charts
export function initializeOrderCharts(chartData) {
    if (window.categoryChartInstance) window.categoryChartInstance.destroy();
    if (window.statusChartInstance) window.statusChartInstance.destroy();

    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        window.categoryChartInstance = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(chartData.categoryData),
                datasets: [{ 
                    data: Object.values(chartData.categoryData), 
                    backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF'] 
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                    legend: { position: 'bottom' } 
                } 
            }
        });
    }

    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        window.statusChartInstance = new Chart(statusCtx, {
            type: 'pie',
            data: {
                labels: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
                datasets: [{ 
                    data: [
                        chartData.statusData.pending, 
                        chartData.statusData.confirmed,
                        chartData.statusData.shipped,
                        chartData.statusData.delivered
                    ], 
                    backgroundColor: ['#FFC107','#17A2B8','#007BFF','#28A745'] 
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                    legend: { position: 'bottom' } 
                } 
            }
        });
    }
}

//status update function
export function quickStatusUpdate(orderId, newStatus) {
    const orders = localStore.read("orders") || [];
    const orderIndex = orders.findIndex(o => o.orderId === orderId); //0,1,2,3.. or -1 if not found

    if (orderIndex !== -1) { //if found
        // Update the order status
        orders[orderIndex].state = newStatus;
        // Save the updated orders
        localStore.write("orders", orders);
        // Update the status badge
        updateStatusBadge(orderId, newStatus);
        // Update statistics cards 
        const updatedOrders = localStore.read("orders") || [];
        updateStatisticsCards(updatedOrders);
        // Update charts 
        const chartData = prepareChartData(updatedOrders);
        initializeOrderCharts(chartData);

        Toast.notify(`Order #${orderId} status updated to ${capitalizeWords(newStatus)}!`, 'success');
    } else {
        console.error('Order not found:', orderId);
        Toast.notify(`Error: Order #${orderId} not found!`, 'error');
    }
}

// Update status badge
function updateStatusBadge(orderId, newStatus) {
    const statusBadge = document.getElementById(`status-badge-${orderId}`);
    if (statusBadge) {
        // Update badge class and content
        statusBadge.className = `badge ${getStatusBadgeClass(newStatus)}`;
        statusBadge.innerHTML = `${getStatusIcon(newStatus)} ${capitalizeWords(newStatus)}`;
    }
}

// Update statistics cards in real time
function updateStatisticsCards(orders) {
    const stats = calculateOrderStats(orders);
    
    // Update each stat card
    const statCards = document.querySelectorAll('.card h3');
    if (statCards.length >= 5) {
        statCards[0].textContent = '$' + stats.totalRevenue;
        statCards[1].textContent = stats.totalOrders;
        statCards[2].textContent = stats.pendingOrders;
        statCards[3].textContent = stats.shippedOrders;
        statCards[4].textContent = stats.deliveredOrders;
    }
}

// Cleanup (destroing charts and removing listeners)
export function cleanupOrdersDashboard() {
    document.removeEventListener('click', updateStatus);
    if (window.categoryChartInstance) { 
        window.categoryChartInstance.destroy(); 
        window.categoryChartInstance = null; 
    }
    if (window.statusChartInstance) { 
        window.statusChartInstance.destroy(); 
        window.statusChartInstance = null; 
    }
}