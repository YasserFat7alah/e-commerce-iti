import Toast from "../../components/ui/toast.js";
import { localStore, sessionStore } from "../utils/storage.js";


export function CartManager() {
  // Get local data to work on
  this.products = localStore.read("products", []);

  // Get user cart from session
  this.cart = sessionStore.read("shoppingCart", []);

  // Get detailed cart items
  this.getCartItem = function () {
    return this.cart.map(item => {
      const product = this.products.find(p => p.id === item.id);
      const stockItem = product?.stock.find(s => s.color === item.color);
      const sizeInStock = stockItem?.sizes.find(sz => sz.name === item.size);

      return {
        ...item,
        description: product?.description || "",
        realPrice: product?.price || 0,
        brand: product?.brand || "",
        category: product?.category || "",
        subcategory: product?.subcategory || "",
        offers: ["Free Shipping"],
        stockQty: sizeInStock?.qty || 0,
        total: Number((item.price * item.qty).toFixed(2)),
        images: stockItem?.images || [],
        img: stockItem?.images
          ? stockItem.images[0]
          : ""
      };
      
    });
  };

  // Save cart to session
  this.saveCart = function () {
    sessionStore.write("shoppingCart", this.cart);
  };

  // Calculate totals
  this.calculateTotal = function () {
    const totals = this.cart.reduce((acc, item) => {
      const product = this.products.find(p => p.id === item.id);
      if (!product) return acc;
  
      const qty = item.qty || 0;
      const priceAfterDiscount = item.price;
  
      acc.subtotal += product.price * qty;
      acc.total += priceAfterDiscount * qty;
      return acc;
    }, { subtotal: 0, total: 0 });
  
    totals.discountTotal = totals.subtotal - totals.total;
    return totals;
  };
  
  // Update totals in DOM
  this.updateTotalUI = function (totals) {
     const subtotalEls = document.querySelectorAll(".subtotal");
    const totalEls = document.querySelectorAll(".total");
    const discountEls = document.querySelectorAll(".discount");
    const totalItemsEls = document.querySelectorAll('#totalItems');
    const hNoItems = document.querySelector('#no-items');
  
    subtotalEls.forEach(el => el.innerText =`SubTotal : $ ${ totals.subtotal.toFixed(2)}`);
    totalEls.forEach(el => el.innerText =  totals.total.toFixed(2));
    discountEls.forEach(el => el.innerText =`Discount :$ ${totals.discountTotal.toFixed(2)}` );
    totalItemsEls.forEach(el => el.innerText = `${this.itemCount()} Items`);
  
    // console.log(this.calculateTotal().subtotal)
  };
  

  // Increase item quantity
  this.increaseQty = function(id, color, size) {
        const item = this.cart.find(
          i => i.id === id && i.color === color && i.size === size
        );
        
        const product = this.products.find(p => p.id === id);
        const stockItem = product?.stock.find(s => s.color === color);
        const sizeObj = stockItem?.sizes.find(sz => sz.name === size) || {};

        const qtyTxt = document.querySelector('.qty');

        if (item.qty < (sizeObj.qty )) {
          item.qty += 1;
          Toast.notify(`✅ Quantity updated! Total: ${item.qty}`, "info");
          // console.log( item);
          const totals = this.calculateTotal();
          this.updateTotalUI(totals);
          this.saveCart();
        } 

        if(item.qty >= (sizeObj.qty )) Toast.notify(`✅ End Of Stock`, "danger");

        
  };

  
  // Decrease item quantity
  this.decreaseQty = function(id, color, size) {
        const item = this.cart.find(i => i.id === id && i.color === color && i.size === size);
        if (!item) return;

        const qtyTxt = document.querySelector('.qty');

        if (item.qty > 1) {
          item.qty -= 1;
          Toast.notify(`⚠️ Quantity decreased . Total: ${item.qty}`, "warning");
          
          this.saveCart();
        } else {
          this.removeItem(id, color, size);
        }

        const totals = this.calculateTotal();
        this.updateTotalUI(totals);
    };


    //Remove item from cart
   this.removeItem = function(id, color, size) {
          this.cart = this.cart.filter(
            i => !(i.id === id && i.color === color && i.size === size)
        );
          Toast.notify("❌ Item Removed", "danger");         

        this.saveCart();

        const totals = this.calculateTotal();
        this.updateTotalUI(totals);
        // console.log(this.cart)
    };

  
  
  // Count total items in cart
  this.itemCount = function () {    
    return  this.cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  };

}
