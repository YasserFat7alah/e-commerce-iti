// Product Class
export class Product {
    #id;
    #name;
    #description;
    #category;
    #subcategory;
    #price;
    #sale;
    #offers;
    #stock;
    #brand;
    #material;
    #sellerId;
    #status;

    

    constructor(
        _id = '',
        _name = '',
        _description = '',
        _category = '',
        _subcategory = '',
        _price= 0,
        _sale= 0,
        _offers = [],
        _stock = [],
        _brand= '',
        _material = "",
        _sellerId= '',
        _status = "pending"
    ) {
        this.Id = _id;
        this.Name = _name;
        this.Description = _description;
        this.Category = _category;
        this.Subcategory = _subcategory;
        this.Price = _price;
        this.Sale = _sale;
        this.Offers = _offers;
        this.Stock = _stock;
        this.Brand = _brand;
        this.Material = _material;
        this.SellerId = _sellerId;
        this.Status = _status;
    }

/* ---ID */
    set Id(_id) { this.#id = _id.toLowerCase(); }
    get Id() { return this.#id; }

/* ---NAME */
    set Name(_name) {
        if (_name.constructor.name !== "String") {
                throw new Error("Name Must be a String");
            }

            this.#name = _name.trim().split(" ") 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
        }
    get Name() { return this.#name; }
        
/* ---DESCRIPTION-- */
    set Description(_description) {
        if (_description.constructor.name !== "String") {
            throw new Error("Description Must be a String");
        }
        this.#description = _description;
    }
    get Description() { return this.#description; }
    
    
/* ---PRICE--- */
    set Price(_price) {
        if (_price.constructor.name !== "Number") {
            throw new Error("Price Must be a Number");
        }
        this.#price = _price;
    }
    get Price() { return this.#price; }

/* ---SALE--- */
    set Sale(_sale) {

        if (_sale.constructor.name !== "Number" || 1 < _sale < 0) {
            throw new Error("Sale Must be a fraction between 0 and 1");
        }
        this.#sale = _sale;
    }
    get Sale() { return this.#sale; }
    
/* ---OFFERS--- */
    set Offers(_offers) { this.#offers = _offers; }
    get Offers() { return this.#offers; }
    
/* ---SELLER ID--- */
    set SellerId(_sellerId) { this.#sellerId = _sellerId; }
    get SellerId() { return this.#sellerId; }
    
/* ---CATEGORY--- */
    set Category(_category) {
            if (_category.constructor.name !== "String") throw new Error("Category must be a string");
            this.#category = _category.trim().split(" ") .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
    }
    get Category() { return this.#category; }

/* ---SUBCATEGORY--- */
    set Subcategory(_subcategory) {
            if (_subcategory.constructor.name !== "String") throw new Error("Subcategory must be a string");
            this.#subcategory = _subcategory.trim().split(" ") .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
    }
    get Subcategory() { return this.#subcategory; }

/* ---STOCK--- */
    set Stock(_stock) { 
        if (!Array.isArray(_stock)) throw new Error("Stock must be an array");
        this.#stock = _stock;
     }
    get Stock() { return this.#stock; }
    
/* ---MATERIAL--- */
    set Material(_material) {
        if (_material.constructor.name !== "String") throw new Error("Material must be a string");
        this.#material = _material.toLowerCase();
    }
    get Material() { return this.#material; }
    
/* ---BRAND--- */
    set Brand(_brand) {
        if (_brand.constructor.name !== "String") throw new Error("Brand must be a string");
        this.#brand = _brand.trim().split(" ") .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
    }
    get Brand() { return this.#brand; }

/* ---STATUS--- */
    set Status(_status) { this.#status = _status; }
    get Status() { return this.#status; }

    isApproved() {
        return this.#status === 'approved'
    }
/* ---toJSON--- */
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            price: this.#price,
            sale: this.#sale,
            offers: this.#offers,
            sellerId: this.#sellerId,
            category: this.#category,
            subcategory: this.#subcategory,
            stock: this.#stock,
            material: this.#material,
            brand: this.#brand,
            status: this.#status
        };
    }
}