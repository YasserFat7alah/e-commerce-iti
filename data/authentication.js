import { generateID, toUser } from "../scripts/utils/data.js";
import { navigate } from "../scripts/utils/navigation.js";
import { localStore, sessionStore } from "../scripts/utils/storage.js";

/* ======================= SIGNUP =========================== */
export function signup(_name, _email, _password, _repeatedPassword, _phone = '01000000000', _role = 'customer') {
    const users = localStore.read('users', []);

    const name = _name;
    const email = _email;
    const password = _password;
    const repeatedPassword = _repeatedPassword;
    const role = _role;
    const status = (role == 'customer') ? 'active' : 'pending';
    const phone = _phone;
    const joinDate = new Date().toISOString();

    const existingEmail = users.find(_user => _user.email === email);

    /* VALIDATE EMAIL */
    if (!validateEmail(email)) {
        console.warn("ENTER A VALID EMAIL...");
        return null;
    }

    /* CHECK IF EMAIL EXISTS */
    if (existingEmail) {
        console.warn("USER ALREADY EXISTS LOGIN...");
        return null;
    }

    /* VALIDATE PASSOWRD */
    if (!validatePassword(password)) {
        console.warn(` Passwords must have:
            - atleast 8 digits
            - atleast 1 Capital letter
            - atleast 1 small letter
            - a special character
            `);
        return null;
    }

    /* CHECK IF PW AND RPW MATCH */
    if (password !== repeatedPassword) {
        console.warn("Passwords MUST Match...");
        return null;
    }

    const createdAt = Date.now();

    let newUser = {
        id: generateID(role),
        name, email, password, role, status, phone, joinDate
    }

    newUser = toUser(newUser);
    users.push(newUser);

    localStore.write('users', users);

    return navigate('/login');

}

/* ======================= LOGIN ============================ */
/**
 * Try to login a user with email & password.
 * @param {string} _identifier
 * @param {string} _password
 * @param {boolean} _remember - If true, keep logged in using localStorage
 * @returns {null} The logged-in user object or null if failed
 */
export function login(_identifier, _password, _remember = false) {
    const users = localStore.read("users", []);
    const user = users.find(_user => _user.email === _identifier && _user.password === _password);

    if (!user) {
        console.warn("Invalid email or password!!!!!");
        return null;
    }

    // Block banned users
    if (user.status === "banned") {
        console.warn("This account is banned.");
    }

    // Save session
    sessionStore.write("currentUser", user);

    // Optional keep logged in
    if (_remember) {
        localStore.write("currentUser", user);
    }

    console.log("Logged in:", user.name);
    return user;
}

/* ==================== GET CURRENT USER ======================== */
/**
 * Get the currently logged-in user (from session or local).
 * @returns {object|null}
 */
export function getCurrentUser() {
    return (
        sessionStore.read("currentUser", null) ||
        localStore.read("currentUser", null)
    );
}

/* ==================== UPADTE CURRENT USER ======================== */
/**
 * Get the currently logged-in user update then save it to local storage.
 * @param {string} _updated
 * @returns {null}
 */
export function updateUser(_updated) {
    let users = localStore.read('users', []);

    users = users.map(user => {
        if (user.email === _updated.email) {
            return _updated;
        }
        return user;
    });

    localStore.write("users", users);
    if (localStore.exists('currentUser', true)) localStore.write('currentUser', _updated);
    sessionStore.write('currentUser', _updated)
}

/* ======================= LOGOUT =========================== */
/**
 * Logout current user from session (and local if exists).
 */
export function logout() {
    let currentP = sessionStore.read('currentProduct', '');
    let fallback = sessionStore.read('fallback-msg', '');
    sessionStore.clear();
    sessionStore.write('currentProduct', currentP, '');
    sessionStore.write('fallback-msg', fallback, '');
    localStore.remove("currentUser");
    navigate('/login');

}

/* ===========function to validate email======= */
export function validateEmail(_email) {
    // Regular expression for email validation
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Return true if email matches regex, false otherwise
    return regex.test(_email);
}


/* ===========function to validate password======= */
export function validatePassword(_password) {
    // Regular expression for password validation
    // Must be atleast 8 digits
    // Must have atleast 1 Capital letter
    // Must have atleast 1 small letter
    // Must have a special character

    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Return true if password matches regex, false otherwise
    return regex.test(_password);
}

/* ==================== ACCESS CONTROL ======================== */
export function canAccess(user, area) {
    if (!user) return false;

    // banned users blocked everywhere
    if (user.status === "banned") return false;

    // dashboard sections require active users
    if (area === "dashboard") {
        return user.status === "active";
    }

    // public/home always accessible
    return true;
}

/* ==================== REDIRECT USER ======================== */
/**
 * Redirect the currently logged-in user based on the role.
 * @param {string} _role
 * @returns {object|null}
 */
export function redirect(_role) {
    const currentUser = getCurrentUser();
    const redirected = sessionStore.read('redirectedPage', '');

    if (!currentUser) {
        navigate('/login');
        return;
    }


    if (redirected && redirected !== '/home') {
        sessionStore.remove('redirectedPage');
        navigate(redirected);
        return;
    }

    switch (_role) {
        case 'master':
        case 'admin':
            if (!canAccess(currentUser, "dashboard")) {
                navigate(`/home`);
                break;
            }
            navigate(`/admin`);
            break;

        case 'seller':
            if (!canAccess(currentUser, "dashboard")) {
                navigate(`/home`);
                break;
            }
            navigate(`/seller`);
            break;

        default:
            navigate(`/home`);
    }
}




