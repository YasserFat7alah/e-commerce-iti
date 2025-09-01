import Product from "../../data/_schema/ProductModel.js";
import User from "../../data/_schema/UserModel.js";


/* ========== Formatting FUNCTIONS =============== */
export function formatPrice(_price) { //in: num => out: string
    return `$${_price.toFixed(2)}`;   // 10 => '$10' 

}


export function formatEmail(_email) {
    if (typeof _email == 'string' && !(+_email)) {
        return _email.toLowerCase().trim();
    }
}

/* ========== GENERATING FUNCTIONS =============== */
export function generateID(_str) { //in: string => out : ID
    return (_str.toLowerCase() + Date.now().toString().slice(8));   // 'user' => 'user58769' 

}

/* ===========Create Product from object========== */
export function toProduct(_obj) {
    const product = new Product();
    product.Id = _obj.id;
    product.Name = _obj.name;
    product.Brand = _obj.brand;
    product.Description = _obj.description;
    product.Category = _obj.category;
    product.Subcategory = _obj.subCategory;
    product.Price = _obj.price;
    product.Sale = _obj.sale ? _obj.sale : 0;
    product.Images = _obj.images;
    product.Material = _obj.material;
    product.SellerId = _obj.sellerId;
    product.Status = _obj.status;
    product.Stock = _obj.stock.map(st => ({
        ...st,
        images: st.images.map(img =>
            img.startsWith("http")
                ? img
                : img.startsWith("../../data/")? img : `../../data/imgs/products/${_obj.category.toLowerCase()}/${_obj.subCategory.toLowerCase()}/${_obj.id.toLowerCase()}/${img}`
        )
    }));

    return product;
}

/* ===========Create User from object========== */
export function toUser(_obj) {
    const user = new User();
    user.Id = _obj.id ? _obj.id : generateID(_obj.role);
    user.Name = _obj.name;
    user.Email = _obj.email.toLowerCase();
    user.Password = _obj.password;
    user.Role = _obj.role;
    user.Phone = _obj.phone;
    user.Status = _obj.status;
    user.JoinDate = _obj.joinDate;

    return user;
}