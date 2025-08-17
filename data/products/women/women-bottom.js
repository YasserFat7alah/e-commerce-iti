//import toProduct from utils
import { toProduct } from "../../../scripts/utils.js" 

/* Declare data to transform as an array of objects */
const data = 
[
    {
        id: 'wsk001',
        name: "Houndstooth Pencil Skirt",
        description: "Elegant slim-fit pencil skirt with a classic houndstooth pattern. Perfect for work, business meetings, or stylish casual outings. Comfortable and flattering fit.",
        price: 750,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Skirts",
        status: "pending",
        stock: [
            {
                color: "Beige",
                imgs: "./data/imgs/products/women/bottom/Skirt2.jpeg",
                sizes: [
                    {name: "S", qty: "5"},
                    {name: "M", qty: "7"},
                    {name: "L", qty: "4"},
                    {name: "XL", qty: "2"}
                ]
            }
        ],
        material: "Polyester Blend",
        brand: "Shein"
    },
    {
        id: 'wsk002',
        name: "Printed Skirt",
        description: "High-waisted A-line skirt with stylish buttons, flattering the waist and allowing comfortable movement.",
        price: 750,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Skirts",
        status: "pending",
        stock: [
            {
                color: "Printed",
                imgs: "./data/imgs/products/women/bottom/Skirt3.jpeg",
                sizes: [
                    {name: "XS", qty: "5"},
                    {name: "S", qty: "8"},
                    {name: "M", qty: "7"},
                    {name: "L", qty: "4"},
                    {name: "XL", qty: "3"}
                ]
            }
        ],
        material: "Polyester Blend",
        brand: "Shein"
    },
    {
        id: 'wsk003',
        name: "RosyDaze Woolen A-Line Mini Skirt",
        description: "Woolen thigh-length A-line mini skirt with front buttons, slim-fitting and ideal for autumn and winter.",
        price: 721,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Skirts",
        status: "pending",
        stock: [
            {
                color: "Yellow",
                imgs: "./data/imgs/products/women/bottom/Skirt4.jpeg",
                sizes: [
                    {name: "XS", qty: "4"},
                    {name: "S", qty: "6"},
                    {name: "M", qty: "5"},
                    {name: "L", qty: "3"},
                    {name: "XL", qty: "2"}
                ]
            }
        ],
        material: "Woolen Fabric",
        brand: "Shein"
    },
    {
        id: 'wsk004',
        name: "Chisquese Women's Asymmetrical Plaid Hem Skorts",
        description: "Khaki women's skort with asymmetrical plaid hem, combining skirt style with shorts comfort.",
        price: 565,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Skirts",
        status: "pending",
        stock: [
            {
                color: "Khaki",
                imgs: "./data/imgs/products/women/bottom/Skirt6.jpeg",
                sizes: [
                    {name: "XS", qty: "5"},
                    {name: "S", qty: "7"},
                    {name: "M", qty: "6"},
                    {name: "L", qty: "4"},
                    {name: "XL", qty: "3"}
                ]
            }
        ],
        material: "Cotton/Polyester Blend",
        brand: "Shein"
    },
    {
        id: 'wsk005',
        name: "SHEIN Priye Plaid Pleated Skirt",
        description: "Plaid pleated women's skirt, slimming and versatile for casual or dressy wear.",
        price: 613,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Skirts",
        status: "pending",
        stock: [
            {
                color: "Plaid",
                imgs: "./data/imgs/products/women/bottom/Skirt7.jpeg",
                sizes: [
                    {name: "XS", qty: "4"},
                    {name: "S", qty: "6"},
                    {name: "M", qty: "5"},
                    {name: "Curve", qty: "3"}
                ]
            }
        ],
        material: "Woven Fabric",
        brand: "Shein"
    },
    {
        id: 'wsk006',
        name: "Virtamour high-waist plaid skirt with pockets",
        description: "Plaid A-line skirt with pockets, versatile and vintage-inspired, ideal for fall, winter, and festive occasions.",
        price: 728,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Skirts",
        status: "pending",
        stock: [
            {
                color: "Brown Plaid",
                imgs: "./data/imgs/products/women/bottom/Skirt8.jpeg",
                sizes: [
                    {name: "S", qty: "5"},
                    {name: "M", qty: "7"},
                    {name: "L", qty: "4"},
                    {name: "XL", qty: "3"}
                ]
            }
        ],
        material: "Wool Blend",
        brand: "Shein"
    }
]

// declare an array to contain the ouput ***MUST BE <PascalCase> ***
const womenSkirts = []; 

/* Loop over the array of data and covert to products */
for (let i = 0; i < data.length; i++) { womenSkirts[i] = toProduct(data[i]) }

//Export the data
export { womenSkirts }; 