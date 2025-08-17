//import toProduct from utils
import { toProduct } from "../../../scripts/utils.js" 

/* Declare data to transform as an array of objects */
const data = 
[
    {
    id: 'wsh001',// will be generated automatically 
    name: "Casual Shoes",
    description: "Lightweight, breathable design for all-day comfort",
    price: 894,
    offers: ["free shipping"],
    sellerId: 'smariamexamplecom',// random based on sellers we add later
    category: "Women",
    subCategory: "Shoes",
    status: "pending",
    stock: [
        {
            color: "black",
            imgs: "./data/imgs/products/women/shoes/Shoes2.jpeg",
            sizes: [
                {name: '36', qty: '5'},
                {name: '37', qty: '7'},
                {name: '38', qty: '2'},
                {name: '39', qty: '3'}
            ]
        },
        {
            color: "beige",
            imgs:"./data/imgs/products/women/shoes/Shoes3.jpeg",
            sizes: [
                {name: '36', qty: '3'},
                {name: '37', qty: '5'},
                {name: '38', qty: '2'},
                {name: '40', qty: '4'}
            ]
        }
    ],
    material: "Mesh + Synthetic Leather",//optional for later use
    brand: "Shein"// optional for later use
},
    {
        id: 'wsh002',
        name: "Sports Shoes",
        description: "Lightweight and comfortable sneakers, perfect for workouts and daily activities",
        price: 1200,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "beige",
                imgs:"./data/imgs/products/women/shoes/Shoes4.jpeg",
                sizes: [
                    {name: '36', qty: '5'},
                    {name: '37', qty: '6'},
                    {name: '38', qty: '2'},
                    {name: '40', qty: '4'}
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
        price: 800,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "black",
                imgs:"./data/imgs/products/women/shoes/Shoes5.jpeg",
                sizes: [
                    {name: '36', qty: '5'},
                    {name: '37', qty: '3'},
                    {name: '38', qty: '2'},
                    {name: '39', qty: '3'},
                    {name: '40', qty: '1'},
                    {name: '41', qty: '4'}
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
        price: 900,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "black",
                imgs:"./data/imgs/products/women/shoes/Shoes7.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '3'},
                    {name: '38', qty: '2'},
                    {name: '39', qty: '3'},
                    {name: '40', qty: '1'}
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
        price: 854,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "black",
                imgs:"./data/imgs/products/women/shoes/Shoes8.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '3'},
                    {name: '39', qty: '5'},
                    {name: '40', qty: '1'}
                ]
            },
            {
                color: "brown",
                imgs: "./data/imgs/products/women/shoes/Shoes9.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '3'},
                    {name: '38', qty: '4'},
                    {name: '40', qty: '1'}
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
        price: 900,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "beige",
                imgs: "./data/imgs/products/women/shoes/Shoes10.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '3'},
                    {name: '39', qty: '5'},
                    {name: '40', qty: '1'}
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
        price: 950,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "navy",
                imgs:"./data/imgs/products/women/shoes/Shoes11.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '3'},
                    {name: '39', qty: '4'},
                    {name: '41', qty: '2'}
                ]
            },
            {
                color: "burgundy",
                imgs:"./data/imgs/products/women/shoes/Shoes12.jpeg",
                sizes: [
                    {name: '37', qty: '3'},
                    {name: '39', qty: '4'},
                    {name: '40', qty: '1'}
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
        price: 850,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "white",
                imgs:"./data/imgs/products/women/shoes/Shoes13.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '1'},
                    {name: '38', qty: '3'},
                    {name: '39', qty: '2'}
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
        price: 850,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "khaki",
                imgs:"./data/imgs/products/women/shoes/Shoes14.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '4'},
                    {name: '38', qty: '3'},
                    {name: '39', qty: '2'}
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
        price: 550,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "white",
                imgs:"./data/imgs/products/women/shoes/Shoes15.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '4'},
                    {name: '38', qty: '3'},
                    {name: '39', qty: '2'},
                    {name: '40', qty: '1'}
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
        price: 1500,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "brown",
                imgs: "./data/imgs/products/women/shoes/Shoes16.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '3'},
                    {name: '38', qty: '4'},
                    {name: '39', qty: '1'}
                ]
            },
            {
                color: "beige",
                imgs: "./data/imgs/products/women/shoes/Shoes17.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '3'},
                    {name: '39', qty: '4'},
                    {name: '41', qty: '1'}
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
        price: 1000,
        offers: ["free shipping"],
        sellerId: 'smariamexamplecom',
        category: "Women",
        subCategory: "Shoes",
        status: "pending",
        stock: [
            {
                color: "beige",
                imgs:"./data/imgs/products/women/shoes/Shoes18.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '3'},
                    {name: '39', qty: '2'},
                    {name: '41', qty: '1'}
                ]
            },
            {
                color: "white",
                imgs: "./data/imgs/products/women/shoes/Shoes19.jpeg",
                sizes: [
                    {name: '36', qty: '2'},
                    {name: '37', qty: '3'},
                    {name: '38', qty: '4'},
                    {name: '39', qty: '1'},
                    {name: '40', qty: '1'}
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