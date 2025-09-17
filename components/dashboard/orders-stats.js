import { truncateText } from "../../scripts/utils/dashboardUtils.js";
import { localStore } from "../../scripts/utils/storage.js";
export function renderOrdersAnalytics(container) {
    const orders = localStore.read('orders') || [];
    const stats = calculateOrderStats(orders);
    const chartData = prepareChartData(orders);

    container.innerHTML = `
        <div class="container-fluid ">
            <!-- Dashboard Header -->
            <div class="row mb-4">
                <div class="col-12 d-flex justify-content-between align-items-center">
                    <div>
                        <h2 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Orders Analytics</h2>
                        <p class="text-muted">Overview of <span class="fw-bold text-primary">AYAAM</span>'s Orders</p>
                    </div>
                </div>
            </div>

            <!-- ............................................Stats Cards....................................... -->
            <!-- First Row - 2 Cards (Total Revenue & Total Orders) -->
            <div class="row mb-4">
                ${renderStatCard('$' + stats.totalRevenue, 'Total Revenue', 'fa-dollar-sign', 'statsCard-totalRrevenue', 'col-6 col-sm-6 g-2 col-md-6 col-lg-6')}
                ${renderStatCard(stats.totalOrders, 'Total Orders', 'fa-shopping-cart', 'statsCard-TotalOrders', 'col-6 col-sm-6 g-2 col-md-6 col-lg-6')}
            </div>

            <!-- Second Row - 4 Cards (Order Status Cards) -->
            <div class="row mb-4">
                ${renderStatCard(stats.pendingOrders, 'Pending Orders', 'fa-clock', 'statsCardPending', 'col-6 col-sm-6 g-2 col-md-3 col-lg-3 ')}
                ${renderStatCard(stats.cancelledOrders, 'Cancelled Orders', 'fa-xmark', 'statsCardCancelled', 'col-6 col-sm-6 g-2 col-md-3 col-lg-3')}
                ${renderStatCard(stats.shippedOrders, 'Shipped Orders', 'fa-truck', 'statsCardShipped', 'col-6 col-sm-6 g-2 col-md-3 col-lg-3  ')}
                ${renderStatCard(stats.deliveredOrders, 'Delivered Orders', 'fa-check-circle', 'statsCardDelivered', 'col-6 col-sm-6 g-2 col-md-3 col-lg-3')}
            </div>

            <!-- Charts Row -->
            <div class="row mb-4">
                <div class="col-sm-12 col-lg-4 p-3">
                    ${renderChartCard('Orders by Category', 'categoryChart', 'fa-tags')}
                </div>
                <div class="col-sm-12  col-lg-4 p-3">
                    ${renderChartCard('Orders by Status', 'statusChart', 'fa-chart-pie')}
                </div>
                <div class="col-sm-12  col-lg-4">
                    ${renderTopProductsCard(chartData.topProducts)}
                </div>
            </div>

            <!-- Revenue by date chart -->
            <div class="row">
                <div class="col-lg-8">
                    ${renderChartCard('Revenue by Date', 'revenueChart', 'fa-chart-line')}
                </div>
                <div class="col-lg-4">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-header bg-white">
                            <h6 class="mb-0"><i class="fas fa-info-circle me-2"></i>Key Insights</h6>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <small class="text-muted">Average Order Value</small>
                                <h4 class="text-primary">$${(stats.totalRevenue / stats.totalOrders || 0).toFixed(2)}</h4>
                            </div>
                            <div class="mb-3">
                                <small class="text-muted">Completion Rate</small>
                                <h4 class="text-success">${((stats.deliveredOrders / stats.totalOrders) * 100 || 0).toFixed(1)}%</h4>
                            </div>
                            <div>
                                <small class="text-muted">Orders This Month</small>
                                <h4 class="text-info">${stats.totalOrders}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => initOrderCharts(chartData), 100);
}
// helper functions 
export function calculateOrderStats(orders) {
    let totalRevenue = 0;
    let pendingOrders = 0;
    let cancelledOrders = 0;
    let shippedOrders = 0;
    let deliveredOrders = 0;

    orders.forEach(order => {
        // Calculate total revenue for every order
        const status = (order.state || 'pending').toLowerCase();
        const orderTotal = order.orderItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);
        if (status !== 'cancelled') {
            totalRevenue += orderTotal;// rev for all orders (card1) except cancelled orders
        }
        // Handle cases

        switch (status) {
            case 'cancelled':
                cancelledOrders++;
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
    //retur object (using)
    return {
        totalRevenue: totalRevenue.toFixed(2),
        totalOrders: orders.length,
        pendingOrders,
        cancelledOrders,
        shippedOrders,
        deliveredOrders
    };
}
export function renderStatCard(value, label, icon, bgClass, columnClasses = 'col col-12') {
    return `
    <div class="${columnClasses}">
        <div class="card border-0 shadow-sm h-100 ${bgClass}">
            <div class="card-body text-white text-center">
                <i class="fas ${icon} fa-2x mb-2"></i>
                <h3 class="mb-1">${value}</h3>
                <p class="mb-0">${label}</p>
            </div>
        </div>
    </div>`;
}
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
export function prepareChartData(orders) {
    const statusData = { pending: 0, cancelled: 0, shipped: 0, delivered: 0 }; //1st
    const revenueByDate = {}; // for revenue chart  2nd
    const categoryData = {};//3rd
    const productRevenue = {}; //4th

    const activeOrders = orders.filter(order => (order.state || 'pending').toLowerCase() !== 'cancelled');

    orders.forEach(order => {
        // counter for status of orders in statusData object{ pending,shipped,delivered: count}
        const status = (order.state || 'pending').toLowerCase();
        statusData[status] = (statusData[status] || 0) + 1;  //1st
    });
    activeOrders.forEach(order => {
        // Calculate total for this order
        const orderTotal = order.orderItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);

        // Group revenue by date  in revenueByDate object{ 30/8/2025: totalRevenue}
        const orderDate = order.orderDate;
        revenueByDate[orderDate] = (revenueByDate[orderDate] || 0) + orderTotal;  //2nd

        order.orderItems.forEach(item => {
            // Count by category in categoryData object { category: count}
            categoryData[item.category] = (categoryData[item.category] || 0) + 1;//3rd
            // Track product revenue in productRevenue object { productName: { revenue:.., orders:.. } }
            const revenue = parseFloat(item.price) * item.qty; //rev for every item
            const productId = item.productId || item.id;
            // if the odrer already has the product (not the first time)=>  inc revenue and orders
            if (productRevenue[productId]) {//4th
                productRevenue[productId].revenue += revenue;;
                productRevenue[productId].orders++;;
                productRevenue[productId].totalQty += parseInt(item.qty);
                //  console.log( productRevenue);
                //else if the odrer doesn't have the product (first time)=> add the product
            } else {
                productRevenue[productId] = {
                    name: item.productName,
                    revenue,
                    orders: 1,
                    totalQty: parseInt(item.qty)

                };
            }
        });
    });
    //top products by revenue
    const topProductsData = Object.entries(productRevenue).map(([productId, data]) => ({
        id: productId,
        name: truncateText(data.name, 30),
        revenue: data.revenue.toFixed(2),
        orders: data.orders,//how many orders included this product
        totalQty: data.totalQty
    }))
    const topProducts = topProductsData.sort((a, b) => b.revenue - a.revenue).slice(0, 5); // Top 5 products ,desc
    // console.log(topProducts);
    // ....................Prepare revenue chart.................
    const sortedRevenueDates = Object.keys(revenueByDate).sort((a, b) => new Date(a) - new Date(b));// Sorted ARRAY of keys of revenueByDate obj (asc dates)
    // console.log(revenueByDate);
    // console.log(sortedRevenueDates);
    const revenueData = {
        labels: sortedRevenueDates, //the sorted array of orders dates
        values: sortedRevenueDates.map(date => revenueByDate[date]) // revenueByDate["30/8/2025"] => totalRevenue
    };

    return { categoryData, statusData, topProducts, revenueData };
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
                            <h6 class="mb-1" style="font-size:1.1rem;">${product.name}</h6>
                            <small class="text-muted">Sold in ${product.orders} ${product.orders > 1 ? 'orders' : 'order'}</small><br>
                            <small class="text-muted">Qty: ${product.totalQty} units</small>
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
export function initOrderCharts(chartData) {
    //removing charts from window if exist to avoid overlap (error in console)
    cleanupCharts()
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        window.categoryChartInstance = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(chartData.categoryData),
                datasets: [{
                    data: Object.values(chartData.categoryData),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                    borderWidth: 0.5,
                    hoverBorderWidth: 3,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                plugins: {
                    legend: {
                        position: 'bottom', labels: { usePointStyle: true }
                    }
                }
            }
        });
    }
    //status chart pie chart
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        window.statusChartInstance = new Chart(statusCtx, {
            type: 'pie',
            data: {
                labels: ['Pending', 'Cancelled', 'Shipped', 'Delivered'],
                datasets: [{
                    data: [
                        chartData.statusData.pending,
                        chartData.statusData.cancelled,
                        chartData.statusData.shipped,
                        chartData.statusData.delivered
                    ],
                    backgroundColor: ['#FFC107', '#b81717ff', '#007BFF', '#28A745'],
                    borderWidth: 0.5,
                    hoverBorderWidth: 3,
                    hoverOffset: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true } }
                }
            }
        });
    }

    // Revenue Chart (Line Chart)
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        window.revenueChartInstance = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: chartData.revenueData.labels,
                datasets: [{
                    label: 'Revenue',
                    data: chartData.revenueData.values,
                    borderColor: '#4facfe',
                    backgroundColor: 'rgba(79, 172, 254, 0.1)',
                    borderWidth: 3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateScale: true,
                },
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}
// Cleanup charts only
function cleanupCharts() {
    if (window.categoryChartInstance) {
        window.categoryChartInstance.destroy();
        window.categoryChartInstance = null;
    }
    if (window.statusChartInstance) {
        window.statusChartInstance.destroy();
        window.statusChartInstance = null;
    }
    if (window.revenueChartInstance) {
        window.revenueChartInstance.destroy();
        window.revenueChartInstance = null;
    }
}