//import toProduct from utils
import { toProduct } from "../../../scripts/utils/data.js";

/* Declare data to transform as an array of objects */
const data =
    [
        {
            id: 'wsk001',
            name: "Houndstooth Pencil Skirt",
            description: "Elegant slim-fit pencil skirt with a classic houndstooth pattern. Perfect for work, business meetings, or stylish casual outings. Comfortable and flattering fit.",
            price: 37.50,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellM1',
            category: "Women",
            subCategory: "Skirts",
            status: "approved",
            stock: [
                {
                    color: "Beige",
                    images: ["Skirt2.jpeg"],
                    sizes: [
                        { name: "S", qty: 5 },
                        { name: "M", qty: 7 },
                        { name: "L", qty: 4 },
                        { name: "XL", qty: 2 }
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
            price: 37.50,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellM1',
            category: "Women",
            subCategory: "Skirts",
            status: "approved",
            stock: [
                {
                    color: "Printed",
                    images: ["Skirt3.jpeg"],
                    sizes: [
                        { name: "XS", qty: 5 },
                        { name: "S", qty: 8 },
                        { name: "M", qty: 7 },
                        { name: "L", qty: 4 },
                        { name: "XL", qty: 3 }
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
            price: 36.05,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellM1',
            category: "Women",
            subCategory: "Skirts",
            status: "approved",
            stock: [
                {
                    color: "Yellow",
                    images: ["Skirt4.jpeg"],
                    sizes: [
                        { name: "XS", qty: 4 },
                        { name: "S", qty: 6 },
                        { name: "M", qty: 5 },
                        { name: "L", qty: 3 },
                        { name: "XL", qty: 2 }
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
            price: 28.25,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellM1',
            category: "Women",
            subCategory: "Skirts",
            status: "approved",
            stock: [
                {
                    color: "Khaki",
                    images: ["Skirt6.jpeg"],
                    sizes: [
                        { name: "XS", qty: 5 },
                        { name: "S", qty: 7 },
                        { name: "M", qty: 6 },
                        { name: "L", qty: 4 },
                        { name: "XL", qty: 3 }
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
            price: 30.65,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellM1',
            category: "Women",
            subCategory: "Skirts",
            status: "approved",
            stock: [
                {
                    color: "Plaid",
                    images: ["Skirt7.jpeg"],
                    sizes: [
                        { name: "XS", qty: 4 },
                        { name: "S", qty: 6 },
                        { name: "M", qty: 5 },
                        { name: "Curve", qty: 3 }
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
            price: 36.40,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellM1',
            category: "Women",
            subCategory: "Skirts",
            status: "approved",
            stock: [
                {
                    color: "Brown Plaid",
                    images: ["Skirt8.jpeg"],
                    sizes: [
                        { name: "S", qty: 5 },
                        { name: "M", qty: 7 },
                        { name: "L", qty: 4 },
                        { name: "XL", qty: 3 }
                    ]
                }
            ],
            material: "Wool Blend",
            brand: "Shein"
        },

        {
            id: 'wsk007',
            name: "SHEIN Lady Leopard Print Pencil Skirt",
            description: "Slim fit leopard print pencil skirt, versatile and comfortable with a flattering stretch design.",
            price: 24.25,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellM1',
            category: "Women",
            subCategory: "Skirts",
            status: "approved",
            stock: [
                {
                    color: "Brown Leopard",
                    images: ["Skirt1.jpeg"],
                    sizes: [
                        { name: "S", qty: 5 },
                        { name: "M", qty: 7 },
                        { name: "L", qty: 4 },
                        { name: "XL", qty: 3 },
                        { name: "Curve", qty: 2 }
                    ]
                }
            ],
            material: "Polyester/Elastane",
            brand: "Shein"
        }
    ]

// declare an array to contain the ouput ***MUST BE <PascalCase> ***
const womenSkirts = [];

/* Loop over the array of data and covert to products */
for (let i = 0; i < data.length; i++) { womenSkirts[i] = toProduct(data[i]) }

//Export the data
export { womenSkirts }; 