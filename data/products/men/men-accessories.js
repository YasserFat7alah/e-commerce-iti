
import { toProduct } from "../../../scripts/utils.js";
// structure of each product based on the provided data ,
//  images value is an array of image names

const menProductsAcc = [
    {
        id: "mac001",
        name: "Leather Belt with Silver Buckle",
        brand: "Tommy Hilfiger",
        description: "Genuine leather belt with silver buckle, adjustable for various waist sizes.",
        category: "Men",
        subCategory: "Accessories",
        price: 300,
        material: "Leather",
        sellerid: "sahmedbeltagy",
        status: "approved",
        stock: [
            {
                color: "Black",
                images: ["prod_p01.jpg"],
                sizes: [{ name: "One Size", quantity: 20 }]
            },
            {
                color: "Brown",
                images: ["prod_p02.jpg"],
                sizes: [{ name: "One Size", quantity: 15 }]
            },
        ],
    },
    {
        id: "mac002",
        name: "Classic Round Watch",
        brand: "Citizen",
        description: "Water-resistant analog watch with leather strap and minimalist dial.",
        category: "Men",
        subCategory: "Accessories",
        price: 1200,
        material: "Stainless Steel & Leather",
        sellerid: "sahmedbeltagy",
        status: "approved",
        stock: [
            {
                color: "Silver-Black",
                images: ["prod_p11.jpg"],
                sizes: [{ name: "One Size", quantity: 10 }]
            },
            {
                color: "Gold-Brown",
                images: ["prod_p12.jpg"],
                sizes: [{ name: "One Size", quantity: 5 }]
            },
        ],
    },
    {
        id: "mac003",
        name: "Wool Blend Scarf",
        brand: "H&M",
        description: "Soft wool blend scarf, lightweight and warm for winter.",
        category: "Men",
        subCategory: "Accessories",
        price: 250,
        material: "Wool Blend",
        sellerid: "sahmedbeltagy",
        status: "approved",
        stock: [
            {
                color: "Gray",
                images: ["prod_p21.jpg"],
                sizes: [{ name: "One Size", quantity: 12 }]
            },
            {
                color: "Navy",
                images: ["prod_p22.jpg"],
                sizes: [{ name: "One Size", quantity: 8 }]
            },
        ],
    },
    {
        id: "mac004",
        name: "Aviator Sunglasses",
        brand: "Ray-Ban",
        description: "Classic aviator sunglasses with UV400 protection lenses.",
        category: "Men",
        subCategory: "Accessories",
        price: 450,
        material: "Metal Alloy",
        sellerid: "sahmedbeltagy",
        status: "approved",
        stock: [
            {
                color: "Silver",
                images: ["prod_p31.jpg"],
                sizes: [{ name: "One Size", quantity: 15 }]
            },
            {
                color: "Gold",
                images: ["prod_p32.jpg"],
                sizes: [{ name: "One Size", quantity: 10 }]
            },
        ],
    },
    {
        id: "mac005",
        name: "Leather Wallet",
        brand: "Fossil",
        description: "Bifold leather wallet with multiple card slots and coin pouch.",
        category: "Men",
        subCategory: "Accessories",
        price: 350,
        material: "Leather",
        sellerid: "sahmedbeltagy",
        status: "approved",
        stock: [
            {
                color: "Brown",
                images: ["prod_p41.jpg"],
                sizes: [{ name: "One Size", quantity: 25 }]
            },
            {
                color: "Black",
                images: ["prod_p42.jpg"],
                sizes: [{ name: "One Size", quantity: 20 }]
            },
        ],
    },
    {
        id: "mac006",
        name: "Knitted Beanie",
        brand: "Adidas",
        description: "Warm knitted beanie with stretch fit for comfort.",
        category: "Men",
        subCategory: "Accessories",
        price: 150,
        material: "Acrylic",
        sellerid: "sahmedbeltagy",
        status: "approved",
        stock: [
            {
                color: "Black",
                images: ["prod_p51.jpg"],
                sizes: [{ name: "One Size", quantity: 18 }]
            },
            {
                color: "Blue",
                images: ["prod_p52.jpg"],
                sizes: [{ name: "One Size", quantity: 12 }]
            },
        ],
    },
    {
        id: "mac007",
        name: "Silk Tie",
        brand: "Hugo Boss",
        description: "Premium silk tie with a smooth finish, perfect for formal events.",
        category: "Men",
        subCategory: "Accessories",
        price: 200,
        material: "Silk",
        sellerid: "sahmedbeltagy",
        status: "approved",
        stock: [
            {
                color: "Red",
                images: ["prod_p61.jpg"],
                sizes: [{ name: "One Size", quantity: 14 }]
            },
            {
                color: "Navy",
                images: ["prod_p62.jpg"],
                sizes: [{ name: "One Size", quantity: 16 }]
            },
        ],
    },
    {
        id: "mac008",
        name: "Cufflinks Set",
        brand: "Montblanc",
        description: "Elegant cufflinks set in stainless steel with gift box.",
        category: "Men",
        subCategory: "Accessories",
        price: 500,
        material: "Stainless Steel",
        sellerid: "sahmedbeltagy",
        status: "approved",
        stock: [
            {
                color: "Silver",
                images: ["prod_p71.jpg"],
                sizes: [{ name: "One Size", quantity: 20 }]
            },
            {
                color: "Gold",
                images: ["prod_p72.jpg"],
                sizes: [{ name: "One Size", quantity: 15 }]
            },
        ],
    },
    {
        id: "mac009",
        name: "Sports Cap",
        brand: "Nike",
        description: "Adjustable sports cap with breathable mesh panels.",
        category: "Men",
        subCategory: "Accessories",
        price: 180,
        material: "Polyester",
        sellerid: "sahmedbeltagy",
        status: "approved",
        stock: [
            {
                color: "Black",
                images: ["prod_p81.jpg"],
                sizes: [{ name: "One Size", quantity: 25 }]
            },
            {
                color: "White",
                images: ["prod_p82.jpg"],
                sizes: [{ name: "One Size", quantity: 20 }]
            },
        ],
    },
    {
        id: "mac010",
        name: "Travel Duffel Bag",
        brand: "Samsonite",
        description: "Durable travel duffel bag with multiple compartments.",
        category: "Men",
        subCategory: "Accessories",
        price: 900,
        material: "Polyester & Nylon",
        sellerid: "sahmedbeltagy",
        status: "approved",
        stock: [
            {
                color: "Black",
                images: ["prod_p91.jpg"],
                sizes: [{ name: "Large", quantity: 8 }]
            },
            {
                color: "Gray",
                images: ["prod_p92.jpg"],
                sizes: [{ name: "Large", quantity: 6 }]
            },
        ],
    },
];

const MenAcc = [];
for (const ele of menProductsAcc) {
    MenAcc.push(toProduct(ele))
}

export {MenAcc};
