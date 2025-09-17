import { getCurrentUser } from "../../data/authentication.js";
import { CartManager } from "../../scripts/cartScripts/cartManager.js";
import { navigate } from "../../scripts/utils/navigation.js";
import { localStore, sessionStore } from "../../scripts/utils/storage.js";
import Component from "../core/component.js";
import Toast from "../ui/toast.js";


export default class CheckOutForm extends Component{
    template(){
        return `
            <form id="checkout-form" class="needs-validation" novalidate>
                <div class="row g-3">
                    <!--  ____________________ Name Inputs ____________________  -->
                    <div class="col-md-6">
                        <label class="form-label">First Name*</label>
                        <input type="text" class="form-control" placeholder="First name" id="fname" required>
                        <div class="invalid-feedback">Please enter your first name.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Last Name*</label>
                        <input type="text" class="form-control" placeholder="Last name" id="lname" required>
                        <div class="invalid-feedback">Please enter your last name.</div>
                    </div>

                    <!-- ____________________ Email ____________________ -->
                    <div class="col-md-6">
                        <label class="form-label">Email*</label>
                        <input type="email" class="form-control" placeholder="you@example.com" id="email" required>
                        <div class="invalid-feedback">Please enter a valid email.</div>
                    </div>

                    <!-- ______________Phone_______________-->
                    <div class="col-md-6">
                        <label class="form-label">Phone Number*</label>
                        <div class="input-group">
                            <select class="form-select" style="max-width: 100px;">
                                <option selected>EGY</option>
                                <option>IND</option>
                                <option>USA</option>
                            </select>
                            <input type="text" class="form-control" placeholder="+20 1222365478" id="phone" required>
                        </div>
                        <div class="invalid-feedback">Please enter your phone number.</div>
                    </div>

                    <!-- ______________City_______________-->
                    <div class="col-md-4">
                        <label class="form-label">City*</label>
                        <input type="text" class="form-control" placeholder="City" id="city" required>
                        <div class="invalid-feedback">Please enter your city.</div>
                    </div>

                    <!-- ______________State_______________-->
                    <div class="col-md-4">
                        <label class="form-label">State*</label>
                        <input type="text" class="form-control" placeholder="State" id="state" required>
                        <div class="invalid-feedback">Please enter your state.</div>
                    </div>

                    <!-- ______________Zip Code_______________-->
                    <div class="col-md-4">
                        <label class="form-label">Zip Code*</label>
                        <input type="text" class="form-control" placeholder="Zip" id="zip-code" required>
                        <div class="invalid-feedback">Please enter your zip code.</div>
                    </div>

                    <!-- ______________Detailed Address_______________-->
                    <div class="col-12">
                        <label class="form-label">Address in Detail*</label>
                        <textarea class="form-control" rows="3" placeholder="Enter your address in detail...." id="adrs-detail" required></textarea>
                        <div class="invalid-feedback">Please enter your address details.</div>
                    </div>

                    <!-- ______________Payment Method_______________-->
                    <div class="col-12">
                        <label class="form-label">Payment Method*</label>
                        <div class="row g-3">
                            <!-- __________ Cash ___________ -->
                            <div class="col-md-6">
                                <div class="card shadow-sm p-3 border rounded h-100">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="pay-method" id="cash" value="cash" required>
                                        <label class="form-check-label w-100" for="cash">
                                            <i class="fa-solid fa-money-bill-1-wave"></i>
                                            Cash
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- __________ Visa ___________ -->
                            <div class="col-md-6">
                                <div class="card shadow-sm p-3 border rounded h-100" id="visa-card">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="pay-method" id="visa" value="visa" required>
                                        <label class="form-check-label w-100 d-flex justify-content-between align-items-center" for="visa">
                                            <div>
                                                <i class="fa-solid fa-credit-card"></i>
                                                Visa
                                            </div>
                                            <i class="fa-solid fa-chevron-down" id="arrow-down"></i>
                                            <i class="fa-solid fa-chevron-up" id="arrow-up"></i> 
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Collapse div -->
                            <div class="collapse mt-3" id="visa-info">
                                <div class="card card-body">
                                    <h5 class="mb-2">Visa Information</h5>
                                    <div class="mb-3">
                                        <label class="form-label">Card Number*</label>
                                        <input type="text" class="form-control" id="card-num" placeholder="---- ---- ---- ----">
                                        <div class="invalid-feedback">Please enter a valid 16-digit card number.</div>
                                    </div>

                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="form-label">EXP.*</label>
                                            <input type="text" class="form-control" id="exp-date" placeholder="MM/YY">
                                            <div class="invalid-feedback">Please enter expiration date of your card.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">CVV*</label>
                                            <input type="text" class="form-control" id="cvv" placeholder="---" maxlength="3">
                                            <div class="invalid-feedback">Please enter CVV.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invalid-feedback">Please select a payment method.</div>
                    </div>

                    <button class='w-50 m-auto py-3 fw-bold border-0 rounded-pill brand-bg text-white mt-3 checkoutBTN checkout-btn' id="submit-btn" type="submit">Confirm Payment</button>
                </div>
            </form>
        `
    }

    script() {
          const fnameEl = document.getElementById('fname');
        const lnameEl = document.getElementById('lname');
        const emailEl = document.getElementById('email');
        const phoneEl = document.getElementById('phone');
        const cityEl = document.getElementById('city');
        const stateEl = document.getElementById('state');
        const zipCodeEl = document.getElementById('zip-code');
        const addressDetailEl = document.getElementById('adrs-detail');
        const cardNum = document.getElementById('card-num');
        const expDate = document.getElementById('exp-date');
        const cvv = document.getElementById('cvv');
        
        // Read user info from session storage
        const userData = getCurrentUser();
        // console.log(userData);


        function getDigits(s) {
            return String(s || "").replace(/\D/g, "");
        }

        // Update validity for card
        function updateCardValidationClasses() {
            const digits = getDigits(cardNum.value);
            if (digits.length !== 16 && digits.length > 0) {
                cardNum.setCustomValidity("Card must be 16 digits");
            } else {
                cardNum.setCustomValidity("");
            }
            cardNum.classList.remove("is-valid", "is-invalid");
            if (digits.length === 16) cardNum.classList.add("is-valid");
            else if (digits.length > 0) cardNum.classList.add("is-invalid");
        }

        // Update exp date validity
        function updateExpValidationClasses() {
            const v = (expDate.value || "").trim();
            if (v.length === 0) {
                expDate.setCustomValidity("");
                expDate.classList.remove("is-valid", "is-invalid");
                return;
            }
            if (!validateExpDate(v)) {
                expDate.setCustomValidity("Invalid expiration");
                expDate.classList.remove("is-valid");
                expDate.classList.add("is-invalid");
            } else {
                expDate.setCustomValidity("");
                expDate.classList.remove("is-invalid");
                expDate.classList.add("is-valid");
            }
        }

        // Update CVV validity
        function updateCvvValidationClasses() {
            const digits = getDigits(cvv.value);
            if (digits.length !== 3 && digits.length > 0) {
                cvv.setCustomValidity("Invalid CVV");
                cvv.classList.remove("is-valid");
                cvv.classList.add("is-invalid");
            } else {
                cvv.setCustomValidity("");
                cvv.classList.remove("is-invalid");
                if (digits.length === 3) cvv.classList.add("is-valid");
            }
        }

        // _____________________Collapse Visa ________________________________
        const visaCollapse = new bootstrap.Collapse(document.getElementById('visa-info'), { toggle: false });
        const arrUp = document.getElementById('arrow-up');
        const arrDown = document.getElementById('arrow-down');
        const paymentMethods = document.querySelectorAll('input[name="pay-method"]');

        arrUp.style.display = 'none';  
        arrDown.style.display = 'inline-block';

        let visaOpen = false;

        paymentMethods.forEach(payMethod => {
            payMethod.addEventListener('click', (e) => {
                // console.log(e.target.value);
                if (e.target.value === 'visa') {
                    visaCollapse.show();
                    visaOpen = true;
                    arrUp.style.display = 'inline-block';
                    arrDown.style.display = 'none';
                } else {
                    visaCollapse.hide();
                    visaOpen = false;
                    arrUp.style.display = 'none';
                    arrDown.style.display = 'inline-block';
                    
                    // Clear visa validation when switching to cash
                    cardNum.classList.remove("is-valid", "is-invalid");
                    expDate.classList.remove("is-valid", "is-invalid");
                    cvv.classList.remove("is-valid", "is-invalid");
                    cardNum.setCustomValidity("");
                    expDate.setCustomValidity("");
                    cvv.setCustomValidity("");
                }
            });
        });

        // Pre-fill user data if available
        if (userData && userData.name) {
            const nameParts = userData.name.split(" ");
            fnameEl.value = nameParts[0] || "";
            lnameEl.value = nameParts.slice(1).join(" ") || "";

            if (userData.email) emailEl.value = userData.email;
            if (userData.phone) phoneEl.value = userData.phone;

            // Load address from localStorage if exists
            if (userData.city || userData.state || userData.address) {
                cityEl.value = userData.city || "";
                stateEl.value = userData.state || "";
                addressDetailEl.value =userData.city + " , "+userData.state || "";
            }

            // Disable pre-filled fields
            document.querySelectorAll("#fname, #lname, #email, #phone").forEach(input => {
                input.disabled = true;
            });
        }


        // Card number formatting and validation
        cardNum.addEventListener("input", function (e) {
            let value = getDigits(e.target.value).substring(0, 16);
            e.target.value = value.match(/.{1,4}/g)?.join("-") || value;
            updateCardValidationClasses();
        });

        cardNum.addEventListener("blur", function (e) {
            updateCardValidationClasses();
        });


        // Function to validate exp date
        function validateExpDate(exp) {
            // Check format MM/YY
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
                return false;
            }

            let [month, year] = exp.split("/").map(Number);
            year += 2000; // Convert YY to YYYY

            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth() + 1;

            // Check if the card is expired
            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                return false;
            }

            return true;
        }

        // Expiration date formatting and validation
        expDate.addEventListener("input", function (e) {
            let value = e.target.value.replace(/[^\d\/]/g, ""); 
            
            // Auto-add slash after 2 digits
            if (value.length === 2 && !value.includes("/")) {
                value = value + "/";
            }
            
            value = value.substring(0, 5); // Limit to MM/YY
            e.target.value = value;

            updateExpValidationClasses();
        });

        expDate.addEventListener("blur", function (e) {
            updateExpValidationClasses();
        });

        // CVV validation
        cvv.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            value = value.substring(0, 3);
            e.target.value = value;
            updateCvvValidationClasses();
        });

        cvv.addEventListener("blur", function (e) {
            updateCvvValidationClasses();
        });

        // Form submission
        const form = document.querySelector('#checkout-form');
        
        form.addEventListener('submit', event => {
            event.preventDefault();
            event.stopPropagation();
            
            const selectedPayment = document.querySelector('input[name="pay-method"]:checked');
            
            // Handle visa field requirements dynamically
            if (selectedPayment && selectedPayment.value === 'visa') {
                cardNum.setAttribute("required", "true");
                expDate.setAttribute("required", "true");
                cvv.setAttribute("required", "true");
            } else {
                cardNum.removeAttribute("required");
                expDate.removeAttribute("required");
                cvv.removeAttribute("required");

                cardNum.setCustomValidity("");
                expDate.setCustomValidity("");
                cvv.setCustomValidity("");
            }

            // update custom validations BEFORE checkValidity
            if (selectedPayment && selectedPayment.value === 'visa') {
                updateCardValidationClasses();
                updateExpValidationClasses();
                updateCvvValidationClasses();
            }


            let isValid = form.checkValidity();
            let customValidationPassed = true;

            // Custom validation for visa fields
            if (selectedPayment && selectedPayment.value === 'visa') {
                const cardValue = getDigits(cardNum.value);
                const cvvValue = getDigits(cvv.value);
                const expValid = validateExpDate(expDate.value);

                // Card number validation
                if (cardValue.length === 16) {
                    cardNum.classList.remove("is-invalid");
                    cardNum.classList.add("is-valid");
                } else {
                    cardNum.classList.add("is-invalid");
                    cardNum.classList.remove("is-valid");
                    customValidationPassed = false;
                    setTimeout(()=>{
                        Toast.notify("⚠️ Enter valid Cridit Card", "warning");
                    } , 100)
                    
                }

                // Expiration date validation
                if (!expValid) {
                    expDate.classList.add("is-invalid");
                    expDate.classList.remove("is-valid");
                    customValidationPassed = false;
                    if (typeof Toast !== 'undefined') {
                        setTimeout(()=>{
                            Toast.notify("⚠️ Enter valid expiration date in MM/YY format", "warning");
                        } , 800)
                    }
                } else {
                    expDate.classList.remove("is-invalid");
                    expDate.classList.add("is-valid");
                    expDate.setCustomValidity("");
                }

                // CVV validation
                if (cvvValue.length !== 3) {
                    cvv.classList.add("is-invalid");
                    cvv.classList.remove("is-valid");
                    cvv.setCustomValidity("Invalid CVV");
                    customValidationPassed = false;
                    setTimeout(()=>{
                        Toast.notify("⚠️ Enter valid CVV number", "warning");
                    } , 1200)

                } else {
                    cvv.classList.remove("is-invalid");
                    cvv.classList.add("is-valid");
                    cvv.setCustomValidity("");
                }
            }

            // Check if shopping cart has items
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

            // If form is not valid, show validation feedback
            if (!isValid || !customValidationPassed) {
                form.classList.add('was-validated');
                return;
            }

            // Process visa payment if selected
            if (selectedPayment && selectedPayment.value === 'visa') {
                try {
                    const currentAmount = parseFloat(sessionStore.read("currentTotal")) || 0;
                    const credits = localStore.read("creditCard") || [];
                    
                    const credit = credits.find(
                        card => card.cardNumber === cardNum.value.replace(/-/g, "") &&
                        card.expDate === expDate.value &&
                        card.cvv === cvv.value
                    );
                    
                    if (!credit) {
                        if (typeof Toast !== 'undefined') {
                            Toast.notify("❌ Invalid credit card details!", "error");
                        }
                        return;
                    }

                    // Check if sufficient balance
                    if (credit.balance < currentAmount) {
                        if (typeof Toast !== 'undefined') {
                            Toast.notify(`Insufficient funds! Available: $${credit.balance}, Required: $${currentAmount}`, "error");
                        }
                        return;
                    }

                    // Process payment
                    credit.balance -= currentAmount;
                    localStore.write("creditCard", credits);
                    if (typeof Toast !== 'undefined') {
                        Toast.notify(`Payment successful! Remaining balance: $${credit.balance.toFixed(2)}`, "success");
                    }
                    sessionStore.write("currentTotal", "");
                    
                } catch (error) {
                    // console.error("Error processing payment:", error);
                    if (typeof Toast !== 'undefined') {
                        Toast.notify("Payment processing error occurred!", "error");
                    }
                    return;
                }
            }

            // Collect form data
            const formData = {
                name: userData ? userData.name : `${fnameEl.value} ${lnameEl.value}`,
                email: userData ? userData.email : emailEl.value,
                phone: userData ? userData.phone : phoneEl.value,
                city: cityEl.value,
                state: stateEl.value,
                address: userData ? `${userData.city} ${userData.state}` : `${cityEl.value} ${stateEl.value}`,
                zipCode: zipCodeEl.value,
                payMethod: selectedPayment ? selectedPayment.value : "",
                cardNumber: selectedPayment && selectedPayment.value === 'visa' ? cardNum.value : "",
                expDate: selectedPayment && selectedPayment.value === 'visa' ? expDate.value : "",
                cvv: selectedPayment && selectedPayment.value === 'visa' ? cvv.value : "",
            };

            // console.log("Form Data:", formData);
            
            // Update user data in session
            if (userData) {
                const newData = { ...userData, ...formData };
                sessionStore.write("currentUser", newData);

               const allUsers = localStore.read("users") || [];

                for (let i = 0; i < allUsers.length; i++) {
                    if (allUsers[i].id === userData.id) {
                        allUsers[i] = { ...allUsers[i], ...formData };
                        localStore.write("users", allUsers); 
                        // console.log("Updated User:", allUsers[i]); 
                        
                    }
                }
            }

            // Load address to inputs
            if (userData.city || userData.state) {
                cityEl.value = userData.city || "";
                stateEl.value = userData.state || "";
                addressDetailEl.value = userData.city +" , " +userData.state || "";
            } else {
                cityEl.value = "";
                stateEl.value = "";
                addressDetailEl.value = "";
            }


            // Update product stock
            const cartManager = new CartManager();
            const items = cartManager.getCartItem();
            const localProducts = localStore.read("products", []);

            items.forEach(cartItem => {
                const product = localProducts.find(p => p.id === cartItem.id);
                if (!product) return;

                const stockItem = product.stock.find(s => s.color === cartItem.color);
                if (!stockItem) return;

                const sizeObj = stockItem.sizes.find(sz => sz.name === cartItem.size);
                if (!sizeObj) return;

                sizeObj.qty = Math.max(0, sizeObj.qty - cartItem.qty);
            });

            localStore.write("products", localProducts);
            
            // Create order
            const orderLocal = localStore.read("orders") || [];
            const today = new Date();
            const day = String(today.getDate()).padStart(2, "0");       
            const month = String(today.getMonth() + 1).padStart(2, "0"); 
            const year = today.getFullYear();  
                            

            const order = {
                            orderId: Date.now() + "-" + userData.id,
                            userId : userData.id,
                            userName: userData.name,
                            userEmail: userData.email,
                            paymentMethod:formData.payMethod ,
                            orderDate: `${day}/${month}/${year}` ,
                            state: "pending" ,
                            orderItems: items.map(item => ({
                                productId: item.id,
                                productName: item.name,
                                qty: item.qty,
                                price: item.price,
                                size: item.size,
                                category: item.category,
                                color: item.color,
                                img: item.img,
                            })),
                }
                    
            orderLocal.push(order);
            localStore.write("orders", orderLocal);
            sessionStore.write("shoppingCart", []);

            // Clear form
            form.reset();
            form.classList.remove('was-validated');
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
                el.setCustomValidity("");
            });

            // Hide visa collapse if it was open
            if (visaOpen) {
                visaCollapse.hide();
                arrUp.style.display = 'none';
                arrDown.style.display = 'inline-block';
                visaOpen = false;
            }

            // console.log("Order created:", order);
            if (typeof Toast !== 'undefined') {
                Toast.notify("Your order has been placed successfully!", "success");
            }
            
            setTimeout(() => {
                if (typeof navigate !== 'undefined') {
                    navigate('/profile');
                }
            }, 1000);
        });
    }
}

