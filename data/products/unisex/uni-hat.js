//import toProduct from utils
import { toProduct } from "../../../scripts/utils.js" 


/* data */
const data = [
    {   id: 'uha001', 
        name: "Nike Pro", 
        description: "Play with the elite with this Nike Pro Cap. It offers a max-depth design that you can confidently wear from course to court and just about anywhere else. The design features sweat-wicking woven fabric with a round, flat bill. A flexible snapback makes it easy to adjust for what's right for you.",
        price: 25.3,
        sale: 0.14,
        offers: [
                'free shipping'
            ],
        sellerId: 'syasserexamplecom', // random based on sellers we add later
        category: "UniSex", 
        subCategory: "Hat", // for later use
        stock:[
        {
            color: "Grey",
            imgs: ['grey-f.png','grey-b.png','grey-in.png','grey-s.png','grey-top.png'],
            sizes: [
            {name: 'M', qty: 4 },
            {name: 'L', qty: 2 },
            {name: 'XL', qty: 1 }
            ]
        },
        ],
        material: "Recycled Polyester Fibers", //optional for later use
        brand: "Nike", // optional for later use
        addedAt: ''
    },
    {   id: 'uha002', 
        name: "Nike Terra", 
        description: "Crafted for warmth, comfort and style—this modern, low-depth knit hat has you covered in the cold.",
        price: 23.97,
        sale: 0.14,
        offers: [
                'free shipping'
            ],
        sellerId: 'syasserexamplecom', // random based on sellers we add later
        category: "UniSex", 
        subCategory: "Hat", // for later use
        stock:[
        {
            color: "Black",
            imgs: ['black-f.png','black-b.png','black-in.png','black-s.png','black-top.png'],
            sizes: [
            {name: '', qty:2},
            ]
        },
        {
            color: "Brown",
            imgs: ['brown-f.png','brown-b.png','brown-in.png','brown-s.png','brown-top.png'],
            sizes: [
            {name: '', qty:5},
            ]
        },
        {
            color: "Lightgrey",
            imgs: ['lightgrey-f.png','lightgrey-b.png','lightgrey-in.png','lightgrey-s.png','lightgrey-top.png'],
            sizes: [
            {name: '', qty:4},
            ]
        },
        ],
        material: "Recycled Polyester Fibers", //optional for later use
        brand: "Nike", // optional for later use
        addedAt: ''
    },
    {   id: 'uha003', 
        name: "Jordan Rise", 
        description: "Let your head breathe as you rep the brand you love. A high-depth design gives this hat a comfortable, modern fit. Mesh panels help keep things airy while a snap-back closure gives you an adjustable fit.",
        price: 27.97,
        sale: 0.12,
        offers: [
                'free shipping', 'Highly Rated'
            ],
        sellerId: 'syasserexamplecom', // random based on sellers we add later
        category: "UniSex", 
        subCategory: "Hat", // for later use
        stock:[
        {
            color: "Cyan",
            imgs: ['cyan-top.png','cyan-front.png','cyan-back.png','cyan-side.png','cyan-in.png'],
            sizes: [
                {name: 'M', qty: 3 },
                {name: 'L', qty: 1 },
                {name: 'XL', qty: 2 }
            ]
        },
        {
            color: "Black",
            imgs: ['black-top.png','black-front.png','black-back.png','black-side.png','black-in.png'],
            sizes: [
                {name: 'M', qty: 3 },
                {name: 'L', qty: 4 },
                {name: 'XL', qty: 2 }
            ]
        },
        {
            color: "Blue",
            imgs: ['blue-front.png','blue-back.png','blue-in.png','blue-side.png','blue-top.png'],
            sizes: [
                {name: 'M', qty: 0 },
                {name: 'L', qty: 3 },
                {name: 'XL', qty: 10 }
            ]
        },
        ],
        material: "Recycled Polyester Fibers", //optional for later use
        brand: "Nike", // optional for later use
        addedAt: ''
    },
    {   id: 'uha004', 
        name: "Unisex Denim Strapback", 
        description: "Classic unisex denim strapback cap, designed with a comfortable adjustable strap and a timeless casual look — perfect for everyday wear.",
        price: 27.99,
        sale: 0,
        offers: [
                'free shipping'
            ],
        sellerId: 'syasserexamplecom', // random based on sellers we add later
        category: "UniSex", 
        subCategory: "Hat", // for later use
        stock:[
        {
            color: "Light blue",
            imgs: ['lightblue-face.png','lightblue-front.png','lightblue-back.png','lightblue-details.png'],
            sizes: [
            {name: 'M', qty: 4 },
            {name: 'L', qty: 2 },
            {name: 'XL', qty: 1 }
            ]
        },
        {
            color: "Blue",
            imgs: ['blue-face.png','blue-front.png','blue-back.png','blue-details.png'],
            sizes: [
            {name: 'M', qty: 4 },
            {name: 'L', qty: 2 },
            {name: 'XL', qty: 1 }
            ]
        },
        {
            color: "Black",
            imgs: ['black-face.png','black-front.png','black-back.png','black-details.png'],
            sizes: [
            {name: 'M', qty: 4 },
            {name: 'L', qty: 2 },
            {name: 'XL', qty: 1 }
            ]
        },
        ],
        material: "Denim", //optional for later use
        brand: "Adidas", // optional for later use
        addedAt: ''
    },
    {   id: 'uha005', 
        name: "Mercedes - AMG Petronas Formula One Team Driver Cap", 
        description: "Official Mercedes-AMG Petronas Formula One Team driver cap, featuring premium design, team branding, and adjustable fit — a must-have for F1 fans and motorsport enthusiasts.",
        price: 50,
        sale: 0.2,
        offers: [],
        sellerId: 'syasserexamplecom', // random based on sellers we add later
        category: "UniSex", 
        subCategory: "Hat", // for later use
        stock:[
        {
            color: "Black",
            imgs: ['black-female.png','black-male.png','black-front.png','black-back.png','black-details.png'],
            sizes: [
            {name: 'M', qty:0},
            {name: 'L', qty:3},
            {name: 'XL', qty:4},
            ]
        },
        {
            color: "Cyan",
            imgs: ['cyan-female.png','cyan-male.png','cyan-front.png','cyan-back.png','cyan-details.png'],
            sizes: [
            {name: 'M', qty:2},
            {name: 'L', qty:3},
            {name: 'XL', qty:3},
            ]
        },
        {
            color: "White",
            imgs: ['white-female.png','white-male.png','white-front.png','white-back.png','white-details.png'],
            sizes: [
            {name: 'M', qty:4},
            {name: 'L', qty:34},
            {name: 'XL', qty:4},
            ]
        },
        
        ],
        material: "Recycled Polyester Fibers", //optional for later use
        brand: "Adidas", // optional for later use
        addedAt: ''
    },
    {   id: 'uha006', 
        name: "Fishing Hat", 
        description: "Anti-UV and UPF 50+ excellent sun protection keep yourself protected from the damaging rays. Wide Brim keeps your face and neck from the strong sun.360 degree sweatband inside the hat and breathable lining absorb sweat efficiently.",
        price: 8.99,
        sale: 0,
        offers: [
                'free shipping'
            ],
        sellerId: 'syasserexamplecom', // random based on sellers we add later
        category: "UniSex", 
        subCategory: "Hat", // for later use
        stock:[
        {
            color: "Camo",
            imgs: ['camo-male.png','camo-details.png','camo-details2.png','camo-dimentions.png'],
            sizes: [
                {name: '', qty: 3 }
            ]
        },
        {
            color: "Pink",
            imgs: ['pink-female.png','pink-details.png','pink-dimentions.png','pink-top.png'],
            sizes: [
            {name: '', qty:2},
            ]
        },
        {
            color: "Rose",
            imgs: ['rose-female.png','rose-details.png','rose-details2.png','rose-dimentions.png','rose-top.png'],
            sizes: [
            {name: '', qty:4},
            ]
        },
        ],
        material: "100% Nylon", //optional for later use
        brand: "Rosos", // optional for later use
        addedAt: ''
    },
];

// declare an array to contain the ouput ***MUST BE <PascalCase> ***
const uniHats = []; 

/* Loop over the array of data and covert to products */
for (let i = 0; i < data.length; i++) { uniHats[i] = toProduct(data[i]) }

//Export the data
export { uniHats }; 
