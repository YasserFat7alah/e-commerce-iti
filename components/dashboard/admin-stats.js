import { inventoryValue } from "../../scripts/utils/dashboardUtils.js";
import { localStore } from "../../scripts/utils/storage.js";

export function chartCreation(canvasId, labels, data, colors, type = 'pie') {
    setTimeout(() => { 
        const ctx = document.getElementById(canvasId); // get <canvas> element users, sellers, products
        if (ctx) {
            createChartInstance(ctx, labels, data, colors, type);
        }
    }, 100); //delay to ensure DOM is ready (it worked without delay too) just to be sure
}
// chart creation with cleanup
export function createChartInstance(ctx, labels, data, colors, type) {
    // Destroy existing chart before creating new one
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
        existingChart.destroy();
    }
    // Create new chart
    const newChart = new Chart(ctx, {
        type: type,
        data: {
            labels: labels ,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 0.5,
                hoverBorderWidth: 3,
                hoverOffset: 4
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
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0)|| 1; // to avoid Nan
                            const percentage = ((context.parsed * 100) / total).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    return newChart;
}
export function renderUsersStats(container) {
    const users = localStore.read("users") || [];
    //counting user types
    const totalUsers = users.length; 
    const sellers = users.filter(user => user.role === "seller").length;
    const admins = users.filter(user => user.role === "admin").length;
    const customer = users.filter(user => user.role === "customer").length;
    
    // Calculate growth
    const recentUsers = users.filter(user => {
        if (user.joinDate) {
            const joinDate = new Date(user.joinDate);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return joinDate >= thirtyDaysAgo;
        }
        return false;
    }).length;
    
    // Calculate percentages
    const customerPercentage = totalUsers > 0 ? ((customer / totalUsers) * 100).toFixed(1) : 0;
    const sellerPercentage = totalUsers > 0 ? ((sellers / totalUsers) * 100).toFixed(1) : 0;
    const adminPercentage = totalUsers > 0 ? ((admins / totalUsers) * 100).toFixed(1) : 0;
    
    container.innerHTML = `
        <div class="row mb-4">
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-primary text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-users mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${totalUsers}</h3>
                        <p class="mb-0">Total Users</p>
                        ${recentUsers > 0 ? `<small class="text-light">+${recentUsers} this month</small>` : ''}
                    </div>
                </div>
            </div>
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-success text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-user mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${customer}</h3>
                        <p class="mb-0">Customers</p>
                        <small class="text-light">${customerPercentage}% of total</small>
                    </div>
                </div>
            </div>
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-warning text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-store mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${sellers}</h3>
                        <p class="mb-0">Sellers</p>
                        <small class="text-light">${sellerPercentage}% of total</small>
                    </div>
                </div>
            </div>
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-danger text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-user-shield mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${admins}</h3>
                        <p class="mb-0">Admins</p>
                        <small class="text-light">${adminPercentage}% of total</small>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Users Breakdown</h5>
                    </div>
                    <div class="card-body">
                        <div class="list-group list-group-flush">
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-user text-success me-2"></i>
                                    <strong>Customers</strong>
                                </div>
                                <div>
                                    <span class="badge bg-success rounded-pill me-2">${customer}</span>
                                    <small class="text-muted">${customerPercentage}%</small>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-store text-info me-2"></i>
                                    <strong>Sellers</strong>
                                </div>
                                <div>
                                    <span class="badge bg-info rounded-pill me-2">${sellers}</span>
                                    <small class="text-muted">${sellerPercentage}%</small>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-user-shield text-danger me-2"></i>
                                    <strong>Admins</strong>
                                </div>
                                <div>
                                    <span class="badge bg-danger rounded-pill me-2">${admins}</span>
                                    <small class="text-muted">${adminPercentage}%</small>
                                </div>
                            </div>
                        </div>
                        
                        ${totalUsers === 0 ? 
                            '<div class="alert alert-warning mt-3"><i class="fas fa-exclamation-triangle me-2"></i>No users registered yet</div>' 
                            : ''
                        }
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-chart-pie me-2"></i>User Distribution</h5>
                    </div>
                    <div class="card-body">
                        <div style="position: relative; height: 250px;">
                            <canvas id="usersChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    //chart for users
    const userLabels = ['Customers', 'Sellers', 'Admins'];
    const userData = [customer, sellers, admins];
    const userColors = ['#28a745', '#17a2b8', '#dc3545'];
    
    if (totalUsers > 0) {
        chartCreation('usersChart', userLabels, userData, userColors, 'pie');
    }
}
export function renderSellersStats(container) {
    const users = localStore.read("users") || [];
    const products = localStore.read("products") || [];
    
    // counting sellers
    const allSellers = users.filter(user => user.role === "seller");
    const totalSellers = allSellers.length;
    const activeSellers = allSellers.filter(seller => seller.status === "active").length;
    const inactiveSellers = totalSellers - activeSellers;
    const totalProducts = products.length;
    
    // Calculate average products per seller 
    const avgProductsPerSeller = totalSellers > 0 ? (totalProducts / totalSellers).toFixed(1) : 0;
    const activeSellerPercent = totalSellers > 0 ? ((activeSellers / totalSellers) * 100).toFixed(1) : 0;
    
    // Calculate top 3 sellers by product count
    const sellerProductCounts = allSellers.map(seller => ({
        name: seller.name || `Seller ${seller.id}`,
        count: products.filter(product => product.sellerId === seller.id).length
    }));
    
    const top3Sellers = sellerProductCounts
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .filter(seller => seller.count > 0);
    
    container.innerHTML = `
        <div class="row mb-4">
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-primary text-white shadow-sm h-100">
                    <div class="card-body text-center">
                        <i class="fas fa-store mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${totalSellers}</h3>
                        <p class="mb-0">Total Sellers</p>
                    </div>
                </div>
            </div>
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-success text-white shadow-sm h-100">
                    <div class="card-body text-center">
                        <i class="fas fa-check-circle mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${activeSellers}</h3>
                        <p class="mb-0">Active Sellers</p>
                        <small class="text-light">${activeSellerPercent}% active</small>
                    </div>
                </div>
            </div>
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-warning text-white shadow-sm h-100">
                    <div class="card-body text-center">
                        <i class="fas fa-box mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${totalProducts}</h3>
                        <p class="mb-0">Products Listed</p>
                        <small class="text-light">Across all sellers</small>
                    </div>
                </div>
            </div>
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-danger text-white shadow-sm h-100">
                    <div class="card-body text-center">
                        <i class="fas fa-chart-line mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${avgProductsPerSeller}</h3>
                        <p class="mb-0">Avg Products/Seller</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-info-circle me-2"></i>Sellers Information</h5>
                    </div>
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-6 border-end">
                                <h4 class="text-success">${activeSellers}</h4>
                                <small class="text-muted">Active</small>
                            </div>
                            <div class="col-6">
                                <h4 class="text-secondary">${inactiveSellers}</h4>
                                <small class="text-muted">Inactive</small>
                            </div>
                        </div>
                        <hr>
                        
                        <div class="d-flex justify-content-between">
                            <span>Total sellers:</span>
                            <strong>${totalSellers}</strong>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Total products:</span>
                            <strong>${totalProducts}</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <span>Avg. Products per seller:</span>
                            <strong>${avgProductsPerSeller}</strong>
                        </div>
                        
                        ${top3Sellers.length > 0 ? `
                        <div class="mb-2">
                            <strong><i class="fas fa-trophy text-warning me-1"></i> Top Performers:</strong>
                        </div>
                        ${top3Sellers.map((seller, index) => `
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="small">
                                    <span class="badge badge-sm ${index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : 'bg-dark'}">${index + 1}</span>
                                    ${seller.name}
                                </span>
                                <small class="text-muted">${seller.count} products</small>
                            </div>
                        `).join('')}
                        ` : ''}
                        
                        ${totalSellers === 0 ? 
                            '<div class="alert alert-info mt-3"><i class="fas fa-info-circle me-2"></i>No sellers registered yet</div>' 
                            : ''
                        }
                    </div>
                </div>
            </div>
            <div class="col-md-8 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-chart-pie me-2"></i>Seller Status Distribution</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div style="position: relative; height: 250px;">
                                    <canvas id="sellersChart"></canvas>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mt-3">
                                    <h6 class="mb-3">Activity Status</h6>
                                    <div class="progress mb-3" style="height: 20px;">
                                        <div class="progress-bar bg-success" role="progressbar" 
                                             style="width: ${activeSellerPercent}%" 
                                             aria-valuenow="${activeSellerPercent}" aria-valuemin="0" aria-valuemax="100">
                                            ${activeSellerPercent}% Active
                                        </div>
                                    </div>
                                    
                                    <div class="row text-center">
                                        <div class="col-6">
                                            <div class="border rounded p-2">
                                                <div class="text-success h5">${activeSellers}</div>
                                                <small class="text-muted">Active Now</small>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="border rounded p-2">
                                                <div class="text-secondary h5">${inactiveSellers}</div>
                                                <small class="text-muted">Inactive</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create enhanced chart for seller status
    const sellerLabels = ['Active', 'Inactive'];
    const sellerData = [activeSellers, inactiveSellers];
    const sellerColors = ['#28a745', '#6c757d'];
    
    if (totalSellers > 0) {
        chartCreation('sellersChart', sellerLabels, sellerData, sellerColors, 'doughnut');
    }
}
export function renderProductsStats(container) {
    const products = localStore.read("products") || [];
    const users = localStore.read("users") || [];
    
    // count categories (excluding "other")
    const men = products.filter(product => product.category === "Men").length;
    const women = products.filter(product => product.category === "Women").length;
    const unisex = products.filter(product => product.category === "Unisex").length;
    
    // Calculate prices with basic metrics
    const prices = products.map(product => parseFloat(product.price) || 0);
    const totalPrice = prices.reduce((sum, price) => sum + price, 0);
    // console.log(totalPrice);
    const  totalValue  = inventoryValue(products);
    const avgPrice = products.length > 0 ? totalPrice / products.length : 0;
    
    // Price analytics
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    const minPrice = prices.length > 0 ? Math.min(...prices.filter(p => p > 0)) : 0;
    
    // Calculate price range distribution
    const priceRanges = {
        '$1-50': prices.filter(price => price >= 1 && price <= 50).length,
        '$51-100': prices.filter(price => price > 50 && price <= 100).length,
        '$101-200': prices.filter(price => price > 100 && price <= 200).length,
        '$201-500': prices.filter(price => price > 200 && price <= 500).length,
        '$500+': prices.filter(price => price > 500).length
    };
    
    // Calculate top 3 sellers by product count
    const allSellers = users.filter(user => user.role === "seller");
    const sellerProductCounts = allSellers.map(seller => ({
        name: seller.name || `Seller ${seller.id}`,
        count: products.filter(product => product.sellerId === seller.id).length
    }));
    
    const top3Sellers = sellerProductCounts
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .filter(seller => seller.count > 0);
    
    // Calculate category percentages
    const menPercentage = products.length > 0 ? ((men / products.length) * 100).toFixed(1) : 0;
    const womenPercentage = products.length > 0 ? ((women / products.length) * 100).toFixed(1) : 0;
    const unisexPercentage = products.length > 0 ? ((unisex / products.length) * 100).toFixed(1) : 0;
    
    container.innerHTML = `
        <div class="row mb-4">
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-primary text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-boxes mb-2" style="font-size: 1.5rem;"></i>
                        <h4 class="mb-1">${products.length}</h4>
                        <p class="mb-0 small">Total Products</p>
                    </div>
                </div>
            </div>
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-warning text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-mars mb-2" style="font-size: 1.5rem;"></i>
                        <h4 class="mb-1">${men}</h4>
                        <p class="mb-0 small">Men's Items</p>
                    </div>
                </div>
            </div>
            <div class="col col-6 g-2 col-md col-lg">
                <div class="card bg-danger text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-venus mb-2" style="font-size: 1.5rem;"></i>
                        <h4 class="mb-1">${women}</h4>
                        <p class="mb-0 small">Women's Items</p>
                    </div>
                </div>
            </div>
            <div class="col col-6 g-2 col-md col-lg ">
                <div class="card bg-info text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-users mb-2" style="font-size: 1.5rem;"></i>
                        <h4 class="mb-1">${unisex}</h4>
                        <p class="mb-0 small">Unisex Items</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row ">
            <div class="col-md-6 mb-3 ">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-list me-2"></i>Product Categories</h5>
                    </div>
                    <div class="card-body">
                        <div class="list-group list-group-flush">
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-mars text-warning me-2"></i>
                                    <strong>Men</strong>
                                </div>
                                <div>
                                    <span class="badge bg-warning rounded-pill me-2">${men}</span>
                                    <small class="text-muted">${menPercentage}%</small>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-venus text-danger me-2"></i>
                                    <strong>Women</strong>
                                </div>
                                <div>
                                    <span class="badge bg-danger rounded-pill me-2">${women}</span>
                                    <small class="text-muted">${womenPercentage}%</small>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-users text-info me-2"></i>
                                    <strong>Unisex</strong>
                                </div>
                                <div>
                                    <span class="badge bg-info rounded-pill me-2">${unisex}</span>
                                    <small class="text-muted">${unisexPercentage}%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 mb-3">
                <div class="card shadow-sm ">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-calculator me-2"></i>Price Analytics</h5>
                    </div>
                    <div class="card-body">
                        <div class="row text-center mb-3">
                            <div class="col-4">
                                <div class="border rounded p-2">
                                    <div class="text-success h5">${minPrice.toFixed(0)}</div>
                                    <small class="text-muted">Min Price</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="border rounded p-2">
                                    <div class="text-primary h5">${avgPrice.toFixed(0)}</div>
                                    <small class="text-muted">Avg Price</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="border rounded p-2">
                                    <div class="text-danger h5">${maxPrice.toFixed(0)}</div>
                                    <small class="text-muted">Max Price</small>
                                </div>
                            </div>
                        </div>
                        
                        <hr>
                        
                        <div class="d-flex justify-content-between">
                            <span><i class="fas fa-coins text-info me-1"></i> Total inventory value:</span>
                            <strong>$ ${totalValue.toFixed(2)}</strong>
                        </div>
                        ${products.length === 0 ? '<div class="alert alert-warning mt-3">No products available</div>' 
                            : ''
                        }
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-chart-pie me-2"></i>Category Distribution</h5>
                    </div>
                    <div class="card-body">
                        <div style="position: relative;">
                            <canvas id="productsChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Price Range Distribution</h5>
                    </div>
                    <div class="card-body">
                        <div style="position: relative;">
                            <canvas id="priceRangeChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        ${top3Sellers.length > 0 ? `
        <div class="row">
            <div class="col-md-12 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-trophy me-2"></i>Top 3 Sellers by Products</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            ${top3Sellers.map((seller, index) => `
                            <div class="col-md-4 mb-2">
                                <div class="card ${index === 0 ? 'border-warning' : index === 1 ? 'border-secondary' : 'border-dark'}">
                                    <div class="card-body text-center">
                                        <div class="mb-2">
                                            ${index === 0 ? '<i class="fas fa-crown text-warning" style="font-size: 1.5rem;"></i>' : 
                                              index === 1 ? '<i class="fas fa-medal text-secondary" style="font-size: 1.5rem;"></i>' : 
                                              '<i class="fas fa-award text-dark" style="font-size: 1.5rem;"></i>'}
                                        </div>
                                        <h6 class="mb-1">${seller.name}</h6>
                                        <p class="mb-0">${seller.count} products</p>
                                        <small class="text-muted">#${index + 1} seller</small>
                                    </div>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}
    `;
    
    //chart for product categories 
    const productLabels = ['Men', 'Women', 'Unisex'];
    const productData = [men, women, unisex];
    const productColors = ['#ffc107', '#dc3545', '#17a2b8'];
    
    if (products.length > 0) {
        chartCreation('productsChart', productLabels, productData, productColors, 'doughnut');
    }
    
    //chart for price range distribution
    const priceRangeLabels = Object.keys(priceRanges);
    const priceRangeData = Object.values(priceRanges);
    const priceRangeColors = ['#28a745', '#17a2b8', '#ffc107', '#fd7e14', '#dc3545'];
    if (products.length > 0) {
        chartCreation('priceRangeChart', priceRangeLabels, priceRangeData, priceRangeColors, 'doughnut');
    }
}