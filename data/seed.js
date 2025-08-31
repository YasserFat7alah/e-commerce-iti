import { localStore } from "../scripts/utils/storage.js";
import { fakeCards } from "./creditcart/cards.js";
import { products } from "./products/products.js";
import { users } from "./users/users.js";

/* ============== SEEDING DATA ================= */
/**
 * Seed initial data into storage if not already present.
 * This ensures localStorage/sessionStorage always has base data.
 * 
 * @param {StorageManager} store - StorageManager instance (usually localStore).
 */
export default function seedData() {
  // Seed Users
  if (!localStore.exists("users", true)) {
    localStore.write("users", users);
  }

  // Seed Products
  if (!localStore.exists("products", true)) {
    localStore.write("products", products);
  }

  // Seed Orders
  if (!localStore.exists("orders", false)) {
    localStore.write("orders", []);
  }

  // Seed Credit Cards
  if (!localStore.exists("creditCard", true)) {
    localStore.write("creditCard", fakeCards);
  }


  // localStorage.setItem("orders", JSON.stringify([
  //   {
  //     "orderId": "1756486109839-master57842",
  //     "userId": "master57842",
  //     "userName": "Yasser",
  //     "userEmail": "yasser@example.com",
  //     "orderDate": "29/08/2025",
  //     "orderItems": [
  //       {
  //         "productId": "uha003",
  //         "productName": "Jordan Rise",
  //         "qty": 2,
  //         "price": "27.97",
  //         "size": "M",
  //         "category": "Unisex",
  //         "color": "Cyan",
  //         "img": "./data/imgs/products/unisex/hat/uha003/cyan-top.png",
  //         "state": "pending"
  //       }
  //     ]
  //   },
  //   {
  //     "orderId": "1756486291207-master57842",
  //     "userId": "master57842",
  //     "userName": "Yasser",
  //     "userEmail": "yasser@example.com",
  //     "orderDate": "29/08/2025",
  //     "orderItems": [
  //       {
  //         "productId": "mbbl001",
  //         "productName": "Classic Blazer",
  //         "qty": 1,
  //         "price": "220.00",
  //         "size": "S",
  //         "category": "Men",
  //         "color": "Blue",
  //         "img": "./data/imgs/products/men/top/mbbl001/BHblueblazer1.jpg",
  //         "state": "pending"
  //       },
  //       {
  //         "productId": "wsh002",
  //         "productName": "Sports Shoes",
  //         "qty": 1,
  //         "price": "59.99",
  //         "size": "36",
  //         "category": "Women",
  //         "color": "Beige",
  //         "img": "./data/imgs/products/women/shoes/wsh002/Shoes4.jpeg",
  //         "state": "pending"
  //       },
  //       {
  //         "productId": "uha003",
  //         "productName": "Jordan Rise",
  //         "qty": 1,
  //         "price": "27.97",
  //         "size": "L",
  //         "category": "Unisex",
  //         "color": "Cyan",
  //         "img": "./data/imgs/products/unisex/hat/uha003/cyan-top.png",
  //         "state": "pending"
  //       }
  //     ]
  //   },
  //   {
  //     "orderId": "1756486969458-master57842",
  //     "userId": "master57842",
  //     "userName": "Yasser",
  //     "userEmail": "yasser@example.com",
  //     "orderDate": "29/08/2025",
  //     "orderItems": [
  //       {
  //         "productId": "uha004",
  //         "productName": "Unisex Denim Strapback",
  //         "qty": 2,
  //         "price": "27.99",
  //         "size": "M",
  //         "category": "Unisex",
  //         "color": "Light blue",
  //         "img": "./data/imgs/products/unisex/hat/uha004/lightblue-face.png",
  //         "state": "pending"
  //       }
  //     ]
  //   }
  // ]));
}