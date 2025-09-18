import View from "../../components/core/view.js";
import { getCurrentUser } from "../../data/authentication.js";
import { localStore, sessionStore } from "../../scripts/utils/storage.js";

export default class SalesHistory extends View {
  template() {
    const currentSeller = getCurrentUser()
    const allProducts = localStore.read("products");

    const sellerProducts = allProducts.filter(
      (product) => product.sellerId == currentSeller.id
    );


    return `
      <div class="sales-history container" data-theme="light">
        <h1 class=" text-primary text-center">Sales History Dashboard</h1>
        <div class="controls mb-2">
            <input type="text" placeholder="Search for product...">
        </div>
        <div class="stats">
            <div class="stat best" id="bestSeller">Best Seller: </div>
            <div class="stat least" id="leastSeller">Least Seller: </div>
            <div class="stat total" id="totalSales">Total Sales: </div>
        </div>
        <table >
            <thead class="head-table">
                <tr>
                    <th>Product</th>
                    <th>Sold</th>
                    <th>In Stock</th>
                    <th>Last Sold</th>
                </tr>
            </thead>
             <tbody id="productTable">
          
        </tbody>
        </table>
        <div class="chart-container">
            <div class="chart-card">
                <canvas id="salesChart"></canvas>
            </div>
        </div>
      </div>
    `;
  }

  script() {
   // Use a flag inside the closure to prevent re-initialization
let isInitialized = false;

if (isInitialized) {
  //console.log("SalesHistory already initialized, skipping.");
  return;
}
isInitialized = true;

// Get DOM elements
const tableBody = document.getElementById("productTable");
const salesChartCanvas = document.getElementById("salesChart");
if (!tableBody || !salesChartCanvas) {
  console.error("DOM elements not found. Check if template is rendered.");
  return;
}

// Read current seller data
    const currentSeller = getCurrentUser();
if (!currentSeller || !currentSeller.id) {
  console.error("Current seller data is missing or invalid.");
  tableBody.innerHTML = '<tr><td colspan="4">Seller information not available.</td></tr>';
  return;
}

//console.log("Current Seller:", currentSeller);

// Read all products and filter by seller
const allProducts = localStore.read("products");
let rawOrders = localStore.read("orders");

// Debug: Log raw data
//console.log("All Products:", allProducts);
//console.log("Raw Orders:", rawOrders);

// Filter products for current seller
const rawProducts = allProducts ? allProducts.filter(
  (product) => product.sellerId === currentSeller.id
) : [];

//console.log("Seller Products (filtered):", rawProducts);

// Ensure products is an array
if (!rawProducts || !Array.isArray(rawProducts)) {
  console.error("Seller products data is missing or invalid.");
  tableBody.innerHTML = '<tr><td colspan="4">No products available for this seller.</td></tr>';
  return;
}

// Check if seller has any products
if (rawProducts.length === 0) {
  console.warn("No products found for current seller.");
  tableBody.innerHTML = '<tr><td colspan="4">No products found for this seller.</td></tr>';
  return;
}

// Ensure orders is an array
if (!rawOrders || !Array.isArray(rawOrders)) {
  console.warn("Orders data is missing or invalid in localStorage.");
  rawOrders = [];
}

// Process seller's products only
const products = rawProducts.map((product) => {
  const stockTotal = (product.stock || []).reduce((total, stockItem) => {
    return total + (stockItem.sizes || []).reduce((sum, size) => sum + (size.qty || 0), 0);
  }, 0);
  return {
    Id: product.id || "unknown",
    Name: product.name || "Unknown",
    Stock: stockTotal,
    Subcategory: product.subcategory || "Unknown",
  };
});

// Debug: Log processed seller products
//console.log("Processed Seller Products:", products);

// Function to parse DD/MM/YYYY date format
const parseCustomDate = (dateStr) => {
  if (!dateStr) return null;
  // Handle DD/MM/YYYY format
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    // Convert to YYYY-MM-DD for Date constructor
    const isoDate = `${year}-${month}-${day}`;
    const parsedDate = new Date(isoDate);
    if (!isNaN(parsedDate)) return parsedDate;
  }
  // Fallback to try parsing as is
  const fallbackDate = new Date(dateStr);
  return !isNaN(fallbackDate) ? fallbackDate : null;
};

// Process sales data for seller's products only
const salesData = products.map((product) => {
  // Filter orders for this product and attach order-level date to items
  const productOrders = rawOrders
    .flatMap((order) => {
      // Log all keys and values in the order object
      // console.log(`Order keys and values:`, order);
      const orderDateFields = [
        order.orderDate, order.date, order.createdAt, order.timestamp, 
        order.order_date, order.created_at, order.orderTime, order.created, 
        order.orderTimeStamp, order.time, order.order_date_time, order.purchaseDate,
        order.createdDate, order.purchase_date, order.orderTimeStamp, order.order_time
      ].find(field => field !== undefined && field !== null);
      return (order.orderItems || []).map(item => {
        // Log all keys and values in the orderItem object
        // console.log(`Order item keys and values for product ${product.Name}:`, item);
        return {
          ...item,
          orderDate: item.orderDate || item.date || item.createdAt || item.timestamp || 
                    item.order_date || item.created_at || item.orderTime || 
                    item.created || item.orderTimeStamp || item.time || 
                    item.order_date_time || item.purchaseDate || item.createdDate || 
                    item.purchase_date || item.orderTimeStamp || item.order_time || 
                    orderDateFields || null
        };
      });
    })
    .filter((item) => {
      if (!item || !item.productId) {
        console.warn(`Invalid order item:`, item);
        return false;
      }
      const match = String(item.productId).toLowerCase() === String(product.Id).toLowerCase();
      if (!match) {
        // console.log(`No match for product ID ${product.Id} with order item productId ${item.productId}`);
      }
      return match;
    })
    .sort((a, b) => {
      const dateA = a.orderDate ? parseCustomDate(a.orderDate) : new Date(0);
      const dateB = b.orderDate ? parseCustomDate(b.orderDate) : new Date(0);
      return dateB - dateA; // Sort by latest date
    });

  // Debug: Log orders for this product
  // console.log(`Product ID: ${product.Id}, Name: ${product.Name}, Product Orders:`, productOrders);

  // Calculate total sold
  const totalSold = productOrders.reduce((sum, item) => sum + (item.qty || 0), 0);

  // Determine last sold date
  let lastSold = "Not Sold";
  if (productOrders.length) {
    const firstOrder = productOrders[0];
    // console.log(`Checking order date for ${product.Name}:`, firstOrder.orderDate, "Full order:", firstOrder);
    if (firstOrder.orderDate) {
      const parsedDate = parseCustomDate(firstOrder.orderDate);
      if (parsedDate) {
        try {
          lastSold = parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } catch (error) {
          console.error(`Invalid order date for product ${product.Name}:`, firstOrder.orderDate, error);
          lastSold = "Invalid Date";
        }
      } else {
        console.error(`Failed to parse order date for product ${product.Name}:`, firstOrder.orderDate);
        lastSold = "Invalid Date";
      }
    } else {
      console.warn(`Order date missing for product ${product.Name} in order:`, firstOrder);
      // console.log(`Available keys in order item for ${product.Name}:`, Object.keys(firstOrder));
      // Find the parent order and log its keys and values
      const parentOrder = rawOrders.find(order => order.orderItems?.some(item => item.productId === firstOrder.productId)) || {};
      // console.log(`Parent order keys and values for ${product.Name}:`, parentOrder);
    }
  }

  return {
    name: product.Name,
    sold: totalSold,
    inStock: product.Stock,
    lastSold,
  };
});

// Debug: Log sales data
// console.log("Seller Sales Data:", salesData);

// Populate table
tableBody.innerHTML = "";
if (salesData.length === 0) {
  console.warn("No sales data to display for seller.");
  tableBody.innerHTML = '<tr><td colspan="4">No sales data available for this seller.</td></tr>';
} else {
  salesData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name || "N/A"}</td>
      <td>${item.sold || 0}</td>
      <td>${item.inStock || 0}</td>
      <td>${item.lastSold}</td>
    `;
    tableBody.appendChild(row);
  });
  // console.log("Table populated with seller's product rows:", tableBody.innerHTML);
}

// Update stats for seller's products only
const totalSales = salesData.reduce((sum, item) => sum + (item.sold || 0), 0);
const bestSeller = salesData.reduce(
  (max, item) => ((max.sold || 0) > (item.sold || 0) ? max : item),
  { sold: -Infinity, name: "N/A" }
).name;
const leastSeller = salesData.reduce(
  (min, item) => ((min.sold || 0) < (item.sold || 0) ? min : item),
  { sold: Infinity, name: "N/A" }
).name;

document.getElementById("bestSeller").textContent = `Best Seller: ${bestSeller}`;
document.getElementById("leastSeller").textContent = `Least Seller: ${leastSeller}`;
document.getElementById("totalSales").textContent = `Total Sales: ${totalSales} items`;

// Initialize chart with seller's data
const ctx = salesChartCanvas.getContext("2d");
if (ctx) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: salesData.map((item) => item.name || "N/A"),
      datasets: [
        {
          label: "Sales per Product",
          data: salesData.map((item) => item.sold || 0),
          backgroundColor: "var(--primary-4)",
          borderColor: "var(--primary-5)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: { y: { beginAtZero: true } },
    },
  });
  // console.log("Chart initialized with seller's data:", salesData);
} else {
  console.error("Chart context not available.");
}

// Search functionality
const searchInput = document.querySelector(".sales-history .controls input");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row) => {
      const product = row.cells[0].textContent.toLowerCase();
      row.style.display = product.includes(searchTerm) ? "" : "none";
    });
    // console.log("Search applied with term:", searchTerm);
  });
} else {
  console.warn("Search input not found.");
}

// Apply theme
const container = document.querySelector(".sales-history");
const theme = container.getAttribute("data-theme") || "light";
if (theme === "dark") {
  container.style.backgroundColor = "var(--bgcolor-2)";
  container.style.color = "var(--grey-2)";
}}

}