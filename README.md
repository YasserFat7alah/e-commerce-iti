# 🛍️ AYAAM — E-Commerce SPA

An **SPA-based E-commerce web app** built with **Vanilla JavaScript, Bootstrap, and CSS**, designed for **customers, sellers, and admins**.  
It uses **JavaScript modules**, **hash-based routing**, and **LocalStorage/SessionStorage** for state management.  

---

## 🌐 Live Demo & Repository
- **Live Website:** [Deployed App Link](https://e-commerce-iti-delta.vercel.app/)  
- **GitHub Repository:** [GitHub Repo Link](https://e-commerce-iti-delta.vercel.app/)  


---

## 1. Project Overview
**AYAAM** is a modular **Single Page Application (SPA)** that simulates a modern online shop.  
It supports different roles (**customer, seller, admin**) with role-based access control.  

- **Type:** Web Application (SPA)  
- **Routing:** Hash-based Router (`#/home`, `#/login`, etc.)  
- **Tech Stack:** Vanilla JS (ES Modules), Bootstrap, CSS, FontAwesome  

---

## 2. Features

### 👤 Customer
- Sign up / Login / Logout  
- Browse catalog & filter products (category, brand, size, color, price, discount, offers)  
- Add to cart, checkout, and view order history  
- Manage profile  

### 🛒 Seller
- Add / Edit / Delete products  
- Manage stock, offers, and discounts  
- View sales dashboard & incoming orders  

### 🛠️ Admin
- Manage users (CRUD)  
- Review and approve/reject products  
- Full control over catalog and reports  

---

## 3. Technical Details
- **SPA Routing:** Custom hash router with lazy-loaded pages  
- **Modules:** Separation of concerns (auth, filters, product list, utils, shared components)  
- **State Management:** LocalStorage & SessionStorage  
- **UI Framework:** Bootstrap + FontAwesome  
- **No Backend API:** Data is seeded and persisted in local/session storage  

---

## 4. Data Structure

### 🛍️ Product Example
\`\`\`js
{
  id: 'uha005',
  name: "Mercedes AMG Driver Cap",
  description: "Official F1 team cap",
  price: 50,
  sale: 0.2, // 20% discount
  offers: [],
  sellerId: 'seller_123',
  category: "Unisex",
  subCategory: "Hat",
  stock: [
    {
      color: "Black",
      images: ['black-front.png', 'black-back.png'],
      sizes: [ { name: 'M', qty: 2 }, { name: 'L', qty: 3 } ]
    }
  ],
  material: "Recycled Polyester",
  brand: "Adidas",
  status: "approved"
}
\`\`\`

### 👤 User Example
\`\`\`js
{
  id: 'yasser',
  name: "Yasser",
  email: "yasser@example.com",
  password: "123456",
  role: "master", // master | admin | seller | user
  phone: "01008348640",
  status: "active",
  joinDate: "2025-08-01"
}
\`\`\`

### 📦 Order Example
\`\`\`js
{
  id: "order001",
  customerId: "azza",
  items: [ { productId: "uha005", color: "Black", size: "M", qty: 2, price: 50 } ],
  total: 100,
  address: "Cairo, Egypt",
  payment: "Cash",
  status: "processing"
}
\`\`\`

---

## 5. Pages & Routes
| Route          | Page                | Role Access |
|----------------|---------------------|-------------|
| \`#/home\`       | Home Page           | Public      |
| \`#/about\`      | About Page          | Public      |
| \`#/catalog\`    | Product Catalog     | Public      |
| \`#/product\`    | Single Product      | Public      |
| \`#/cart\`       | Cart Page           | Public      |
| \`#/checkout\`   | Checkout            | User, Seller, Admin |
| \`#/profile\`    | Profile             | User        |
| \`#/login\`      | Login               | Public      |
| \`#/signup\`     | Signup              | Public      |
| \`#/admin\`      | Admin Dashboard     | Admin, Master |
| \`#/seller\`     | Seller Dashboard    | Seller      |
| \`#/info\`       | Support Page        | Public      |
| \`#/404\`        | Not Found           | Public      |

---

## 6. Technical Architecture
- **Router:** Hash-based, with support for lazy-loading modules and role-based access  
- **Modules:**  
  - \`auth/\` → authentication, authorization  
  - \`filters/\` → category, size, color, price, discount, offers  
  - \`utils/\` → navigation, storage, loader  
  - \`components/\` → ProductCard, Navbar, etc.  
  - \`pages/\` → Each view (Home, Catalog, Cart, Seller Dashboard, etc.)  

---

## 7. How to Run
1. Clone repo:
   \`\`\`bash
   git clone https://github.com/YasserFat7alah/e-commerce-iti.git
   cd ayaam-ecommerce
   \`\`\`
2. Open \`index.html\` in your browser (no build needed).  
3. Use \`Live Server\` in VSCode for SPA routing to work smoothly.  

---

## 8. Team Contributions
- **Yasser** → Authentication & Authorization (login, logout, roles, homepage)  
- **Ahmed Beltagy** → Product Card, Catalog (filter system, search, single product page)  
- **Azza** → Checkout page, Save orders, Order history  
- **Mariam** → Seller Dashboard (add/edit/delete products, orders, sales history)  
- **Ahmed Osama** → Admin Dashboard (manage users, CRUD products, reports)  

---

## 9. Resources & Links
- **GitHub Repository:** [https://github.com/YasserFat7alah/e-commerce-iti.git](https://github.com/YasserFat7alah/e-commerce-iti.git)  
- **Live Website:** [https://e-commerce-iti-delta.vercel.app/#/home](https://e-commerce-iti-delta.vercel.app/#/home)  

---

⚡ Built with ❤️ by **Team AYAAM**
