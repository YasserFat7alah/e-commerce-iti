//import toProduct from utils
import { toProduct } from "../../../scripts/utils/data.js";

/* Declare data to transform as an array of objects */
const data =
    [
        {
            id: 'wbl001',
            name: "Chiquease Solid Color Cap Sleeve Fitted Blouse",
            description: "Fitted women's casual blouse with cap sleeves, stretch fabric, versatile solid color, ideal for daily wear.",
            price: 26.45,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "Black",
                    images: ["Blouse19.jpeg"],
                    sizes: [
                        { name: "S", qty: 5 },
                        { name: "M", qty: 7 },
                        { name: "L", qty: 4 },
                        { name: "XL", qty: 3 }
                    ]
                }
            ],
            material: "Stretch Cotton",
            brand: "Chiquease"
        },
        {
            id: 'wbl002',
            name: "SHEIN Solid Color Stand Collar Casual Blouse",
            description: "Women's mint green stand-collar blouse with front tie, comfortable and stylish for casual daily wear.",
            price: 26.70,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "Mint Green",
                    images: ["Blouse18.jpeg"],
                    sizes: [
                        { name: "S", qty: 6 },
                        { name: "M", qty: 8 },
                        { name: "L", qty: 5 },
                        { name: "XL", qty: 4 }
                    ]
                },
                {
                    color: "Red",
                    images: ["Blouse17.jpeg"],
                    sizes: [
                        { name: "S", qty: 6 },
                        { name: "M", qty: 2 },
                        { name: "L", qty: 5 }
                    ]
                }
            ],
            material: "Polyester Blend",
            brand: "Shein"
        },
        {
            id: 'wbl003',
            name: "Simplee Women's Fitted Lace Blouse",
            description: "Fitted blouse with Steven lace and round neckline, elegant and feminine, ideal for back-to-school and outings.",
            price: 30.40,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "White",
                    images: ["Blouse16.jpeg"],
                    sizes: [
                        { name: "S", qty: 3 },
                        { name: "M", qty: 2 },
                        { name: "L", qty: 5 },
                        { name: "XL", qty: 4 }
                    ]
                }
            ],
            material: "Lace & Cotton Blend",
            brand: "Simplee"
        },
        {
            id: 'wbl004',
            name: "Eclosion Wood Ear Short Sleeve Top",
            description: "Short-sleeve top with wood ear accents and red embroidery, stylish and versatile for spring and summer.",
            price: 31.55,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "Mint Green",
                    images: ["Blouse15.jpeg"],
                    sizes: [
                        { name: "S", qty: 1 },
                        { name: "M", qty: 3 },
                        { name: "XL", qty: 2 }
                    ]
                },
                {
                    color: "Red",
                    images: ["Blouse14.jpeg"],
                    sizes: [
                        { name: "S", qty: 2 },
                        { name: "M", qty: 4 },
                        { name: "L", qty: 5 }
                    ]
                }
            ],
            material: "Cotton Blend",
            brand: "Eclosion"
        },
        {
            id: 'wbl005',
            name: "Chiquease Retro Daisy Print Mandarin Collar Shirt",
            description: "Women's vacation-style shirt with daisy retro print, mandarin collar, and cap sleeves, lightweight and breezy for summer outings.",
            price: 24.25,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "Blue",
                    images: ["Blouse13.jpeg"],
                    sizes: [
                        { name: "XS", qty: 4 },
                        { name: "S", qty: 6 },
                        { name: "M", qty: 5 },
                        { name: "L", qty: 3 },
                        { name: "XL", qty: 2 }
                    ]
                }
            ],
            material: "Cotton",
            brand: "Chiquease"
        },
        {
            id: 'wbl006',
            name: "SHEN CHAI Contract Lace Keyhole Blouse",
            description: "Woven blouse with lace keyhole and raglan long sleeves, elegant and feminine with a modern touch.",
            price: 35.20,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "Black",
                    images: ["Blouse12.jpeg"],
                    sizes: [
                        { name: "S", qty: 5 },
                        { name: "M", qty: 7 },
                        { name: "L", qty: 4 },
                        { name: "XL", qty: 3 }
                    ]
                },
                {
                    color: "Blue",
                    images: ["Blouse11.jpeg"],
                    sizes: [
                        { name: "S", qty: 5 },
                        { name: "M", qty: 7 },
                        { name: "L", qty: 4 },
                        { name: "XL", qty: 3 }
                    ]
                }
            ],
            material: "Woven Fabric with Lace",
            brand: "Shein"
        },
        {
            id: 'wbl007',
            name: "Elenzga Puff Sleeve Bow Detail Blouse",
            description: "Women's blouse with round neck, puff sleeves, waist bow, and A-line hem, flattering and casual for spring and summer.",
            price: 32.45,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "White",
                    images: ["Blouse10.jpeg"],
                    sizes: [
                        { name: "S", qty: 5 },
                        { name: "M", qty: 7 },
                        { name: "L", qty: 4 },
                        { name: "XL", qty: 3 }
                    ]
                }
            ],
            material: "Cotton Blend",
            brand: "Elenzga"
        },
        {
            id: 'wbl008',
            name: "SHEN CLAS Minimalist Embroidery Blouse",
            description: "Women's blouse with minimalist embroidery and short sleeves, casual and comfortable for everyday wear.",
            price: 19.85,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "Pink",
                    images: ["Blouse9.jpeg"],
                    sizes: [
                        { name: "S", qty: 6 },
                        { name: "M", qty: 8 },
                        { name: "L", qty: 5 },
                        { name: "XL", qty: 4 }
                    ]
                },
                {
                    color: "Blue",
                    images: ["Blouse8.jpeg"],
                    sizes: [
                        { name: "S", qty: 2 },
                        { name: "M", qty: 4 },
                        { name: "L", qty: 3 },
                        { name: "XL", qty: 4 }
                    ]
                }
            ],
            material: "Cotton",
            brand: "Shein"
        },
        {
            id: 'wbl009',
            name: "Shell Clas Float Print Laser Cut Top",
            description: "Women's top with float print, bubbled texture, and laser-cut embroidery, casual and artistic for everyday wear.",
            price: 32.50,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "Multicolor",
                    images: ["Blouse6.jpeg"],
                    sizes: [
                        { name: "S", qty: 6 },
                        { name: "L", qty: 5 },
                        { name: "XL", qty: 4 }
                    ]
                }
            ],
            material: "Polyester Blend",
            brand: "Shell Clas"
        },
        {
            id: 'wbl010',
            name: "Chi-square Ruffle Neck Chiffon Blouse",
            description: "Chiffon blouse with ruffle neck, lightweight and flowy, elegant for casual or dressy occasions.",
            price: 26.70,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "White",
                    images: ["Blouse2.jpeg"],
                    sizes: [
                        { name: "S", qty: 5 },
                        { name: "M", qty: 7 }
                    ]
                }
            ],
            material: "Chiffon",
            brand: "Shein"
        },
        {
            id: 'wbl011',
            name: "SHEIN Frenchy Striped Cotton-Like Shirt",
            description: "Women's striped shirt with cotton-like fabric, breathable and relaxed, ideal for casual daily wear.",
            price: 26.70,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'smariamexamplecom',
            category: "Women",
            subCategory: "Blouses",
            status: "approved",
            stock: [
                {
                    color: "Striped",
                    images: ["Blouse1.png"],
                    sizes: [
                        { name: "XS", qty: 4 },
                        { name: "M", qty: 5 },
                        { name: "L", qty: 3 }
                    ]
                }
            ],
            material: "Cotton-Like Fabric",
            brand: "Shein"
        }
    ]

// declare an array to contain the ouput ***MUST BE <PascalCase> ***
const womenBlouses = [];

/* Loop over the array of data and covert to products */
for (let i = 0; i < data.length; i++) { womenBlouses[i] = toProduct(data[i]) }

//Export the data
export { womenBlouses }; 