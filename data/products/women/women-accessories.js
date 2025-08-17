//import toProduct from utils
import { toProduct } from "../../../scripts/utils.js" 

// Women Accessories Data 

const accessories = [
    {   id: 'wac001', 
        name: "Stainless Steel Butterfly Pendant Necklace & Earring Set", 
        description: "3pcs Stainless Steel Butterfly Pendant Necklace & Earring Set, Fashion Gold And Silver Color Jewelry Accessories",
        price: 2.60,
        sale : 0.30 ,
        offers: [
                'free shipping'
        ],
        sellerId: 'seller_2', 
        category: "Women", 
        subCategory: "Accessories", 
        
        stock:[
            {
                color: "Gold",
                imgs: ['acs1-gold.png'],
                qty: 5 ,
            },
            {
                color: "ٍSilver",
                imgs: ['acs1-silver.png'],
                qty: 7 ,
            },
        ],

        material: "Stainless Steel", 
        brand: "Dior", 
        addedAt : '' ,
        status : 'approved'
    },
    {   id: 'wac002',  
        name: "Set Stainless Steel", 
        description: "3Pcs Set Stainless Steel Nail With Clover Bracelet & Clover Chain Anklet, Suitable For Women Daily Wear",
        price: 6.50,
        sale : 0.30 ,
        offers: [
                'free shipping'
        ],
        sellerId: 'seller_2', 
        category: "Women", 
        subCategory: "Accessories", 
        
        stock:[
                {
                color: "Gold",
                imgs: ['acs2-gold.png'],
                qty: 5 ,
                },
                {
                color: "ٍSilver",
                imgs: ['acs2-silver.png'],
                qty: 7 ,
                },
        ],

        material: "Stainless Steel", 
        brand: "Zara", 
        addedAt : '' ,
        status : 'approved'
    },
    {   id: 'wac003', 
        name: "Bangle & Ring", 
        description: "1Pc Charm Stylish Geometric Bangle & Ring",
        price: 5.68,
        sale : 0.10 ,
        offers: [
            'free shipping'
        ],
        sellerId: 'seller_2',
        category: "Women", 
        subCategory: "Accessories",
        
        stock:[
            {
              color: "Gold",
              imgs: ['acs3-gold.png'],
              qty: 6 ,
            },
            {
              color: "ٍSilver",
              imgs: ['acs3-silver.png'],
              qty: 7 ,
            },
        ],

        material: "Stainless Steel", 
        brand: "SheIn", 
        addedAt : '' ,
        status : 'approved'
    },
    {   id: 'wac004', 
        name: "Bracelet & Cuff Ring", 
        description: "Rhinestone Decor Cuff Bracelet & Cuff Ring",
        price: 8.69,
        sale : 0.10 ,
        offers: [
            'free shipping'
        ],

        sellerId: 'seller_1', 
        category: "Women", 
        subCategory: "Accessories", 
            
        stock:[
                {
                color: "Gold",
                imgs: ['acs4-gold.png'],
                qty: 12 ,
                },
                {
                color: "ٍSilver",
                imgs: ['acs4-silver.png'],
                qty: 10 ,
                },
        ],

        material: "Stainless Steel", 
        brand: "SheIn", 
        addedAt : '' ,
        status : 'approved'
    },
    {   id: 'wac005', 
        name: "Pendant Necklace And Clavicle Chain Set", 
        description: "5pcs New Arrival European & American Minimalist Geometric Shaped Rhinestone Inlaid Ring, Earring, Bracelet, Pendant Necklace And Clavicle Chain Set",
        price: 12.0,
        sale : 0.10 ,
        offers: [
                ' '
        ],
        sellerId: 'seller_1',
        category: "Women", 
        subCategory: "Accessories", 
        
        stock:[
            {
              color: "ٍSilver",
              imgs: ['acs5-silver.png'],
              qty: 7 ,
            },
        ],

        material: "Stainless Steel", 
        brand: "SheIn", 
        addedAt : '' ,
        status : 'approved'
    },
    {    id: 'wac006',  
        name: "Jewelry Set For Women", 
        description: "Leaf Bracelet And Ring Jewelry Set For Women",
        price: 100,
        sale : 0.10 ,
        offers: [
                ' '
        ],
        sellerId: 'seller_3', 
        category: "Women", 
        subCategory: "Accessories", 
        
        stock:[
                {
                color: "Gold",
                imgs: ['acs6-gold.png'],
                qty: 6 ,
                },
                {
                color: "ٍSilver",
                imgs: ['acs6-silver.png'],
                qty: 7 ,
                },
        ],

        material: "Stainless Steel", 
        brand: "Dior", 
        addedAt : '' ,
        status : 'approved'
    },
    {   id: 'wac007', 
        name: "Tone Coil Bangle Bracelet", 
        description: "50pcs Matte Gold Or Silver Tone Coil Bangle Bracelet, Suitable For Women's Party And Holiday Jewelry Accessories",
        price: 20.69,
        sale : 0.10 ,
        offers: [
                'free shipping'
        ],
        sellerId: 'seller_3', 
        category: "Women", 
        subCategory: "Accessories",  
        
        stock:[
                {
                color: "Gold",
                imgs: ['acs7-gold.png'],
                qty: 6 ,
                },
                {
                color: "ٍSilver",
                imgs: ['acs7-silver.png'],
                qty: 7 ,
                },
        ],

        material: "Stainless Steel", 
        brand: "SheIn", 
        addedAt : '' ,
        status : 'approved'
    },
    {   id: 'wac008', 
        name: "Heart Shaped Pendant Necklace", 
        description: "1pc Silver Heart Shaped Pendant Necklace, Jewelry Gift For Women",
        price: 16.36,
        sale : 0.15 ,
        offers: [
                'free shipping'
        ],
        sellerId: 'seller_2', 
        category: "Women", 
        subCategory: "Accessories", 
        
        stock:[
                {
                color: "Gold",
                imgs: ['acs8-gold.png'],
                qty: 5 ,
                },
                {
                color: "ٍSilver",
                imgs: ['acs8-silver.png'],
                qty: 6 ,
                },
    ],

    material: "Stainless Steel", 
    brand: "SheIn", 
    addedAt : '' ,
    status : 'approved'
    },
    {    id: 'wac009', 
        name: "Silver Leaf Cubic Zirconia Handchain", 
        description: "1 Pc Adjustable Silver Leaf Cubic Zirconia Handchain, Luxury Bridal Connected Finger Bracelet Jewelry For Wedding",
        price: 6.99,
        sale : 0.10 ,
        offers: [
                'free shipping'
        ],
        sellerId: 'seller_2', 
        category: "Women", 
        subCategory: "Accessories", 
        
        stock:[
                {
                color: "Gold",
                imgs: ['acs9-gold.png'],
                qty: 12 ,
                },
                {
                color: "ٍSilver",
                imgs: ['acs9-silver.png'],
                qty: 10 ,
                },
        ],

        material: "Stainless Steel", 
        brand: "SheIn", 
        addedAt : '' ,
        status : 'approved'
    },
    {   id: 'wac010' ,
        name: "Tassel Ear Thread", 
        description: "1pc Tassel Ear Thread",
        price: 10.66,
        sale : 0.10 ,
        offers: [
                'free shipping'
        ],
        sellerId: 'seller_3', 
        category: "Women", 
        subCategory: "Accessories", 
        
        stock:[
                {
                color: "Gold",
                imgs: ['acs3-gold.png'],
                qty: 6 ,
                },
                {
                color: "ٍSilver",
                imgs: ['acs3-silver.png'],
                qty: 7 ,
                },
            ],

        material: "Zirconia", 
        brand: "Dior", 
        addedAt : '' ,
        status : 'approved'

    },
] ;

const womenAccessories = [];

for(let i =0 ; i <accessories.length ; i++) {womenAccessories[i] = toProduct(accessories[i])} ;

export {womenAccessories} ;