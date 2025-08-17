//import toProduct from utils
import { toProduct } from "../../../scripts/utils.js" 

/* Declare data to transform as an array of objects */
const data = 
[
    {
        id: "wba001",
        name: "World Women Vintage PU Leather Crossbody Bag",
        description: "Retro shoulder bag with flag design, PU leather, small square shape, lockable, ideal for work or daily crossbody use.",
        price: 697,
        offers: ["free shipping"],
        sellerId: "smariamexamplecom",
        category: "Women",
        subCategory: "Bags",
        status: "pending",
        stock: [
            {
                color: "brown",
                imgs: "./data/imgs/products/women/bags/bag3.jpeg",
                sizes: [
                    {name: "OS", qty: "5"}
                ]
            },
            {
                color: "black",
                imgs: "./data/imgs/products/women/bags/bag2.jpeg",
                sizes: [
                    {name: "OS", qty: "7"}
                ]
            },
            {
                color: "multicolor",
                imgs: "./data/imgs/products/women/bags/bag1.jpeg",
                sizes: [
                    {name: "OS", qty: "4"}
                ]
            }
        ],
        material: "PU Leather",
        brand: "World Women"
    },
    {
        id: "wba002",
        name: "Fashion Embroidery Handbag",
        description: "Elegant PU leather handbag with floral embroidery, detachable strap, and gold-tone accessories. Perfect for daily use or gifting.",
        price: 969,
        offers: ["free shipping"],
        sellerId: "smariamexamplecom",
        category: "Women",
        subCategory: "Bags",
        status: "pending",
        stock: [
            {
                color: "khaki",
                imgs: "./data/imgs/products/women/bags/bag4.jpeg",
                sizes: [
                    {name: "OS", qty: "2"}
                ]
            },
            {
                color: "white",
                imgs: "./data/imgs/products/women/bags/bag5.jpeg",
                sizes: [
                    {name: "OS", qty: "4"}
                ]
            }
        ],
        material: "PU Leather",
        brand: "PINCNEL"
    },
    {
        id: "wba003",
        name: "Mini Flower Graphic Square Bag",
        description: "Trendy mini handbag with flower graphic design, square shape, top handle, and flap closure. Stylish and compact for daily use.",
        price: 561,
        offers: ["free shipping"],
        sellerId: "smariamexamplecom",
        category: "Women",
        subCategory: "Bags",
        status: "pending",
        stock: [
            {
                color: "pink",
                imgs: "./data/imgs/products/women/bags/bag7.jpeg",
                sizes: [
                    {name: "OS", qty: "2"}
                ]
            },
            {
                color: "white",
                imgs: "./data/imgs/products/women/bags/bag6.jpeg",
                sizes: [
                    {name: "OS", qty: "4"}
                ]
            }
        ],
        material: "PU Leather",
        brand: "Trendy"
    },
    {
        id: "wba004",
        name: "Vintage Stone Textured Sealed Backpack",
        description: "Beige backpack with stone texture, waterproof, large compartments, laptop sleeve, ideal for college, travel, or daily use.",
        price: 927,
        offers: ["free shipping"],
        sellerId: "smariamexamplecom",
        category: "Women",
        subCategory: "Bags",
        status: "pending",
        stock: [
            {
                color: "beige",
                imgs: "./data/imgs/products/women/bags/bag15.jpeg",
                sizes: [
                    {name: "OS", qty: "2"}
                ]
            }
        ],
        material: "Waterproof Polyester",
        brand: "Vintage Fashionable"
    },
    {
        id: "wba005",
        name: "IPc PU Leather Classic Box Shoulder Bag",
        description: "Luxury box-style shoulder bag with top handle, PU leather, gift packaging, ideal for special occasions.",
        price: 819,
        offers: ["free shipping"],
        sellerId: "smariamexamplecom",
        category: "Women",
        subCategory: "Bags",
        status: "pending",
        stock: [
            {
                color: "black",
                imgs: "./data/imgs/products/women/bags/bag13.jpeg",
                sizes: [
                    {name: "OS", qty: "4"}
                ]
            }
        ],
        material: "High-Quality PU Leather",
        brand: "IPc"
    },
    {
        id: "wba006",
        name: "Cherry Print Small Square Crossbody Bag",
        description: "White cherry-print square crossbody bag, lightweight and stylish with beaded accents, ideal for spring/summer.",
        price: 660,
        offers: ["free shipping"],
        sellerId: "smariamexamplecom",
        category: "Women",
        subCategory: "Bags",
        status: "pending",
        stock: [
            {
                color: "white",
                imgs: "./data/imgs/products/women/bags/bag12.jpeg",
                sizes: [
                    {name: "OS", qty: "3"}
                ]
            }
        ],
        material: "Polyester/Cotton Blend",
        brand: "Fashion Cherry"
    },
    {
        id: "wba007",
        name: "Bohemian 'M' Print PU Leather Crossbody Bag",
        description: "Bohemian-style women's messenger bag with 'M' print, lightweight PU leather, adjustable strap, ideal for daily use.",
        price: 578,
        offers: ["free shipping"],
        sellerId: "smariamexamplecom",
        category: "Women",
        subCategory: "Bags",
        status: "pending",
        stock: [
            {
                color: "white",
                imgs: "./data/imgs/products/women/bags/bag10.jpeg",
                sizes: [
                    {name: "OS", qty: "3"}
                ]
            },
            {
                color: "brown",
                imgs: "./data/imgs/products/women/bags/bag11.jpeg",
                sizes: [
                    {name: "OS", qty: "3"}
                ]
            }
        ],
        material: "PU Leather",
        brand: "Eco"
    },
    {
        id: "wba008",
        name: "Flower Embroidery Faux Pearl Mini Square Bag",
        description: "Green mini square bag with flower embroidery and faux pearls, stylish and elegant for special occasions.",
        price: 505,
        offers: ["free shipping"],
        sellerId: "smariamexamplecom",
        category: "Women",
        subCategory: "Bags",
        status: "pending",
        stock: [
            {
                color: "green",
                imgs: "./data/imgs/products/women/bags/bag9.jpeg",
                sizes: [
                    {name: "OS", qty: "3"}
                ]
            },
            {
                color: "white",
                imgs: "./data/imgs/products/women/bags/bag8.jpeg",
                sizes: [
                    {name: "OS", qty: "4"}
                ]
            }
        ],
        material: "Faux Leather",
        brand: "EQ"
    }
]


// declare an array to contain the ouput ***MUST BE <PascalCase> ***
const womenBags = []; 

/* Loop over the array of data and covert to products */
for (let i = 0; i < data.length; i++) { womenBags[i] = toProduct(data[i]) }

//Export the data
export { womenBags }; 