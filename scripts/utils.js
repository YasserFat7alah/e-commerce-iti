import { Product } from "../models/ProductModel.js";

/* ========== DISPLAYING FUNCTIONS =============== */

export function formatPrice(price) { //in: num => out: string
    return `$${price.toFixed(2)}`;   // 10 => '$10' 
}
/* =============================================== */

export function toProduct(_obj) {
    const product = new Product();
    product.Id = _obj.id;
    product.Name = _obj.name;
    product.Brand = _obj.brand;
    product.Description = _obj.description;
    product.Category = _obj.category;
    product.Subcategory = _obj.subCategory;
    product.Price = _obj.price;
    product.Stock = _obj.stock;
    product.Images = _obj.images;
    product.Material = _obj.material;
    product.SellerId = _obj.sellerId;
    product.Status = _obj.status;
    product.Sale = _obj.sale;
    return product;
}