//import toProduct from utils
import { toProduct } from "../../../scripts/utils/data.js";

/* Declare data to transform as an array of objects */
const data =
    [
        {
            id: 'wsh001',
            name: "Casual Shoes",
            description: "Lightweight, breathable design for all-day comfort",
            price: 45.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "Black",
                    images: ["Shoes2.jpeg"],
                    sizes: [
                        { name: '36', qty: 5 },
                        { name: '37', qty: 7 },
                        { name: '38', qty: 2 },
                        { name: '39', qty: 3 }
                    ]
                },
                {
                    color: "Beige",
                    images: ["Shoes3.jpeg"],
                    sizes: [
                        { name: '36', qty: 3 },
                        { name: '37', qty: 5 },
                        { name: '38', qty: 2 },
                        { name: '40', qty: 4 }
                    ]
                }
            ],
            material: "Mesh + Synthetic Leather",
            brand: "Shein"
        },
        {
            id: 'wsh002',
            name: "Sports Shoes",
            description: "Lightweight and comfortable sneakers, perfect for workouts and daily activities",
            price: 59.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "Beige",
                    images: ["Shoes4.jpeg"],
                    sizes: [
                        { name: '36', qty: 5 },
                        { name: '37', qty: 6 },
                        { name: '38', qty: 2 },
                        { name: '40', qty: 4 }
                    ]
                }
            ],
            material: "Synthetic Leather",
            brand: "Shein"
        },
        {
            id: 'wsh003',
            name: "Ankle Strap Heels",
            description: "Elegant high heels with ankle straps, combining style and comfort — perfect for special occasions",
            price: 42.50,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "Black",
                    images: ["Shoes5.jpeg"],
                    sizes: [
                        { name: '36', qty: 5 },
                        { name: '37', qty: 3 },
                        { name: '38', qty: 2 },
                        { name: '39', qty: 3 },
                        { name: '40', qty: 1 },
                        { name: '41', qty: 4 }
                    ]
                }
            ],
            material: "Suede",
            brand: "Shein"
        },
        {
            id: 'wsh004',
            name: "Heels",
            description: "Elegant high heels that elevate your look for parties and special occasions",
            price: 46.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "Black",
                    images: ["Shoes7.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 3 },
                        { name: '38', qty: 2 },
                        { name: '39', qty: 3 },
                        { name: '40', qty: 1 }
                    ]
                }
            ],
            material: "Patent Leather",
            brand: "Shein"
        },
        {
            id: 'wsh005',
            name: "Ankle Strap Heels",
            description: "Ankle strap heels with a back bow for a chic, feminine touch",
            price: 44.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "Black",
                    images: ["Shoes8.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 3 },
                        { name: '39', qty: 5 },
                        { name: '40', qty: 1 }
                    ]
                },
                {
                    color: "Brown",
                    images: ["Shoes9.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 3 },
                        { name: '38', qty: 4 },
                        { name: '40', qty: 1 }
                    ]
                }
            ],
            material: "Patent Leather",
            brand: "Shein"
        },
        {
            id: 'wsh006',
            name: "High Heels",
            description: "Elegant high heels that elevate your look for parties and special occasions",
            price: 47.50,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "Beige",
                    images: ["Shoes10.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 3 },
                        { name: '39', qty: 5 },
                        { name: '40', qty: 1 }
                    ]
                }
            ],
            material: "Leather",
            brand: "Shein"
        },
        {
            id: 'wsh007',
            name: "Ankle Strap Heels",
            description: "Elegant high heels with ankle straps, combining style and comfort — perfect for special occasions",
            price: 49.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "Navy",
                    images: ["Shoes11.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 3 },
                        { name: '39', qty: 4 },
                        { name: '41', qty: 2 }
                    ]
                },
                {
                    color: "Burgundy",
                    images: ["Shoes12.jpeg"],
                    sizes: [
                        { name: '37', qty: 3 },
                        { name: '39', qty: 4 },
                        { name: '40', qty: 1 }

                    ]
                }
            ],
            material: "Suede",
            brand: "Shein"
        },
        {
            id: 'wsh008',
            name: "White Heels",
            description: "Women's Chunky Heel Ankle Strap Shoes",
            price: 44.50,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "White",
                    images: ["Shoes13.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 1 },
                        { name: '38', qty: 3 },
                        { name: '39', qty: 2 }
                    ]
                }
            ],
            material: "Textile",
            brand: "Shein"
        },
        {
            id: 'wsh009',
            name: "Ankle Strap Heels",
            description: "KHASI Women's Khaki PU Platform Chunky Heel Ankle Strap Shoes",
            price: 44.50,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "Khaki",
                    images: ["Shoes14.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 4 },
                        { name: '38', qty: 3 },
                        { name: '39', qty: 2 }
                    ]
                }
            ],
            material: "Patent Leather",
            brand: "Shein"
        },
        {
            id: 'wsh010',
            name: "Sandals",
            description: "Women's Bright Color Wedge Sandals with Braided Decor – Lightweight Summer Shoes for Casual & Holiday Wear",
            price: 29.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "White",
                    images: ["Shoes15.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 4 },
                        { name: '38', qty: 3 },
                        { name: '39', qty: 2 },
                        { name: '40', qty: 1 }
                    ]
                }
            ],
            material: "Leather",
            brand: "Shein"
        },
        {
            id: 'wsh011',
            name: "Boots",
            description: "Short leather boots with a sleek design, durable sole, and comfortable fit, perfect for everyday wear and stylish looks",
            price: 79.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "Brown",
                    images: ["Shoes16.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 3 },
                        { name: '38', qty: 4 },
                        { name: '39', qty: 1 }
                    ]
                },
                {
                    color: "Beige",
                    images: ["Shoes17.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 3 },
                        { name: '39', qty: 4 },
                        { name: '41', qty: 1 }
                    ]
                }
            ],
            material: "Leather",
            brand: "Shein"
        },
        {
            id: 'wsh012',
            name: "Sports Shoes",
            description: "Lightweight and comfortable sneakers, perfect for workouts and daily activities",
            price: 52.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: 'SellAzza5',
            category: "Women",
            subCategory: "Shoes",
            status: "approved",
            stock: [
                {
                    color: "Beige",
                    images: ["Shoes18.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 3 },
                        { name: '39', qty: 2 },
                        { name: '41', qty: 1 }
                    ]
                },
                {
                    color: "White",
                    images: ["Shoes19.jpeg"],
                    sizes: [
                        { name: '36', qty: 2 },
                        { name: '37', qty: 3 },
                        { name: '38', qty: 4 },
                        { name: '39', qty: 1 },
                        { name: '40', qty: 1 }
                    ]
                }
            ],
            material: "Synthetic Leather",
            brand: "Shein"
        }
    ]

// declare an array to contain the ouput ***MUST BE <PascalCase> ***
const womenShoes = [];

/* Loop over the array of data and covert to products */
for (let i = 0; i < data.length; i++) { womenShoes[i] = toProduct(data[i]) }

//Export the data
export { womenShoes }; 