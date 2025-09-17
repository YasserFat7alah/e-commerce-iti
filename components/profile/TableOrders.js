import { navigate } from "../../scripts/utils/navigation.js";
import { localStore, sessionStore } from "../../scripts/utils/storage.js";
import View from "../core/view.js";




export default class TableOrders extends View {
    template() {
        
        const currentUserData = sessionStore.read("currentUser"); 
        const orders = localStore.read("orders")||[];
        
        const userOrders = orders.filter(order => order.userId === currentUserData?.id);
        // console.log(userOrders , "Current user orders");

        const stateIcons = {
            pending: "⏳",
            shipped: "🚚",
            delivered: "✅", 
            cancelled: "❌"
        };

        

        return `
            <div class="accordion card shadow-none" id="ordersAccordion">
                <tale class="orders-table-container p-2">
                ${userOrders.length === 0 ?  `<div class="text-center">
                        <h6>No Orders Have Been Made Yet....</h6>
                        <button type="button" class="btn brand-bg mt-2" id="satrt-shopping"> Start Shopping Now </button>
                    </div>`  
                    :userOrders.map((order, i) => {
                        const icon = stateIcons[order.state] || "❓";

                        return `
                        <div class="accordion-item orderTable">
                            <h2 class="accordion-header" id="heading-${i}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="false" aria-controls="collapse-${i}">
                                    Order ${i + 1} - ${order.orderDate} - ${icon} ${order.state}
                                </button>
                            </h2>
                            <div id="collapse-${i}" class="accordion-collapse collapse" aria-labelledby="heading-${i}" data-bs-parent="#ordersAccordion">
                                <div class="accordion-body p-0 table-responsive orderTable">
                                    <table class="table table-sm table-borderless mb-0 text-center ">
                                        <tr class="bg-light">
                                            <th>Product</th>
                                            <th>Name</th>
                                            <th>Color</th>
                                            <th>Category</th>
                                            <th>Size</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                        ${order.orderItems.map(item => `
                                            <tr>
                                                <td><img class="img-order" src="${item.img}" style="width:50px;"/></td>
                                                <td>${item.productName}</td>
                                                <td>${item.color}</td>
                                                <td>${item.category}</td>
                                                <td>${item.size || "No Size"}</td>
                                                <td>${item.qty}</td>
                                                <td>$${item.price}</td>
                                            </tr>
                                        `).join('')}
                                    </table>
                                </div>
                            </div>
                        </div>
                    

                        `
                    }
                        
                    ).join('')
                }
                
                </tale>
            </div>

        `
    }

    script() {
        const shoppingBtn = document.getElementById("satrt-shopping");
        if (shoppingBtn) {
            shoppingBtn.addEventListener("click", () => {
                navigate('/catalog');
            });
        }
    }
    
}