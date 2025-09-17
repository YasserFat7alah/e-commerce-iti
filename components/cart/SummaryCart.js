import Component from "../core/component.js";
import { CartManager } from "../../scripts/cartScripts/cartManager.js";
import { navigate } from "../../scripts/utils/navigation.js";
import { sessionStore } from "../../scripts/utils/storage.js";
import Toast from "../ui/toast.js";





export default class SummaryCart extends Component {

    template() {
        const cartManager = new CartManager();
        return `
             <h2 class='mb-4 mt-5 mt-md-2 mt-md-0'>Summary</h2>

                    <div class="pointer mb-2">
                        <a class="d-flex align-items-center justify-content-between text-secondary text-decoration-none"
                            data-bs-toggle="collapse" href="#promoDiv" role="button" aria-expanded="false" aria-controls="promoDiv">
                            <span>Do you have a Promo Code?</span>
                            <span id="arrow-down"><i class="fa-solid fa-chevron-down"></i></span>
                            <span id="arrow-up" class="d-none"><i class="fa-solid fa-chevron-up"></i></span>
                        </a>
                    </div>

                    <div class="collapse mt-2" id="promoDiv">
                        <div class="d-flex gap-2 mb-2">
                            <input type="text" class="form-control w-75 rounded-3 border-code px-2"/>
                            <button class="btn btn-outline-secondary rounded-pill py-2 px-3 fw-bold w-25 text-center">Apply</button>
                        </div>
                    </div>
                    <p class="subtotal">SubTotal : $ <span>${(cartManager.calculateTotal().subtotal).toFixed(2)}</span> </p>
                    <p>Estimated Shipping & Handling : $Free </p>
                    <p>Estimated Tax : __ </p>

                    <div class='d-none d-md-block position-sticky bottom-0 start-0 w-100 bg-white py-3 py-md-0  gap-3 px-2 px-md-0  border-top bordernoneMD'>
                        <h5 class='totalCart py-1 py-md-3 mb-md-3 '> Total : $ <span class="total">${(cartManager.calculateTotal().total).toFixed(2)}</span>  </h5>
                        <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar brand-bg text-center text-white" style="width: 75%">75% Confirm Your Order</div>
                        </div>
                        <div class='d-flex gap-1'>
                            <button class=' w-50 py-3 fw-bold border-0 rounded-pill brand-bg-check bg-black text-white mt-3 btn-orange checkout-btn'>
                                CheckOut
                            </button>
                            <button class=' w-50 py-3 fw-bold border-0 rounded-pill brand-bg-check bg-black text-white mt-3 checkoutBTN back-shoping'>
                                Back to Catalog
                            </button>
                        </div>
                    </div>
                    
                    </div>

                    <div class=' d-md-none position-sticky bottom-0 start-0 w-100 bg-white py-3 py-md-0  gap-3 px-2 px-md-0  border-top bordernoneMD'>
                        <h5 class='totalCart py-1 py-md-3 mb-md-3 '> Total : $ <span class="total">${(cartManager.calculateTotal().total).toFixed(2)}</span>  </h5>
                        <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar brand-bg text-center text-white" style="width: 75%">75% Confirm Your Order</div>
                        </div>
                        <button class='w-100 py-3 fw-bold border-0 rounded-pill brand-bg-check bg-black text-white mt-3 btn-orange  checkout-btn'>
                            CheckOut
                        </button>
                        <button class='w-100 py-3 fw-bold border-0 rounded-pill brand-bg-check bg-black text-white mt-3 checkoutBTN back-shoping'>
                            Back to Catalog
                        </button>
                    </div>
            </div>
        `
    }

    script() {
        const cartManager = new CartManager();
        document.querySelectorAll('.checkout-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                
                const shoppingCartItems = sessionStore.read("shoppingCart");
                    if (!shoppingCartItems || shoppingCartItems.length === 0) {
                        if (typeof Toast !== 'undefined') {
                            Toast.notify("Please choose an item before checkout!", "warning");
                            setTimeout(() => {
                                navigate('/catalog');
                            }, 1000);
                        }
                        return;
                    }


                navigate('/checkout');
                sessionStore.write("currentTotal" , cartManager.calculateTotal().total);
            })
        });

        document.querySelector('.back-shoping').addEventListener('click' , ()=>{
            navigate('/catalog');
        })

        document.addEventListener('cartUpdated', () => {
            const cartManager = new CartManager(); 
            const totals = cartManager.calculateTotal();

            document.querySelectorAll(".subtotal").forEach(el => {
                el.innerHTML = `SubTotal : $ <span>${totals.subtotal.toFixed(2)}</span>`;
            });

            document.querySelectorAll(".total").forEach(el => {
                el.innerText = totals.total.toFixed(2);
            });

            document.querySelectorAll(".discount").forEach(el => {
                el.innerText = `Discount :$ ${totals.discountTotal.toFixed(2)}`;
            });

            document.querySelectorAll('#totalItems').forEach(el => {
                el.innerText = `${cartManager.itemCount()} Items`;
            });
        });

    }
}