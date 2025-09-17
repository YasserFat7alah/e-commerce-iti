// import { signup, login, getCurrentUser, logout } from "./data/authentication.js";
// import { localStore, sessionStore } from "./scripts/utilities/storage.js";

// localStore.remove("users");
// localStore.remove("currentUser");
// sessionStore.remove("currentUser");


// console.log("===== SIGNUP =====");
// const user1 = signup("Yasser", "yasser@example.com", "Yasser@14523", "Yasser@14523", "01019719364", "master");
// console.log("Users after signup:", localStore.read('users'));
// console.log("LOGGED IN ? local", getCurrentUser)
// console.log("LOGGED IN ? session", getCurrentUser)


// console.log("===== LOGIN (wrong password) =====");
// const wrongLogin = login("yasser@example.com", "wrongpass");
// console.log("Wrong login:", wrongLogin);

// //Try login with correct password
// console.log("===== LOGIN (correct) =====");
// const loggedUser = login("yasser@example.com", "Yasser@14523", false); // true = remember me
// console.log("Logged in:", loggedUser);

// // Get current user
// console.log("===== GET CURRENT USER =====");
// const current = getCurrentUser();
// console.log("Current User:", current);

// // Logout
// console.log("===== LOGOUT =====");
// logout();

// // Check current user after logout
// console.log("Current User after logout:", getCurrentUser());
