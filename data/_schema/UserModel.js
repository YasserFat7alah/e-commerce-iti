// User Class
export default class User {
    #id;
    #name;
    #email;
    #password;
    #role;
    #phone;
    #status;
    #joinDate;

    constructor(_id, _name, _email, _password, _role = 'customer', _phone = '', _status = 'inactive', _joinDate = new Date().toISOString()) {
        this.Id = _id;
        this.Name = _name;
        this.Email = _email;
        this.Password = _password;
        this.Role = _role; // Admin, Seller, Customer
        this.Phone = _phone;
        this.Status = _status;
        this.JoinDate = _joinDate;
    }

    /* ID SETTER & GETTER */
    set Id(_id) { this.#id = _id; }
    get Id() { return this.#id }

    /* NAME SETTER & GETTER */
    set Name(_name) {
        this.#name = _name;
    }

    get Name() {
        return this.#name
    }

    /* EMAIL SETTER AND GETTER */
    set Email(_email) {
        this.#email = _email;
    }

    get Email() {
        return this.#email
    }

    /* PASSWORD SETTER AND GETTER */
    set Password(_password) {
        this.#password = _password;
    }

    get Password() {
        return this.#password
    }

    /* ROLE SETTER AND GETTER */
    set Role(_role) {
        this.#role = _role;
    }

    get Role() {
        return this.#role
    }
    /* PHONE NUMBER SETTER AND GETTER */
    set Phone(_phone) {
        this.#phone = _phone;
    }

    get Phone() {
        return this.#phone
    }

    /* STATUS SETTER AND GETTER */
    set Status(_status) {
        this.#status = _status;
    }

    get Status() {
        return this.#status
    }

    /* JOIN DATE SETTER AND GETTER */
    set JoinDate(_joinDate) {
        this.#joinDate = _joinDate;
    }

    get JoinDate() {
        return this.#joinDate
    }

    /* ---toJSON--- */
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            email: this.#email,
            password: this.#password,
            role: this.#role,
            phone: this.#phone,
            status: this.#status,
            joinDate: this.#joinDate
        };
    }
}



