import { toProduct } from "../../../scripts/utils/data.js";

const menProductPants = [
    {
        id: "mpa001",
        name: "Slim Fit Chino Pants",
        brand: "Gap",
        description: "Breathable cotton-twill slim-fit chinos with a slight stretch for comfort.",
        category: "Men",
        subCategory: "Pants",
        price: 45,
        material: "Cotton-Twill",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Beige",
                images: ["prod_p01.jpg"],
                sizes: [
                    { name: "M", qty: 10 },
                    { name: "L", qty: 7 }
                ]
            },
            {
                color: "Navy",
                images: ["prod_p02.jpg"],
                sizes: [
                    { name: "M", qty: 8 },
                    { name: "L", qty: 5 }
                ]
            },
        ],
    },
    {
        id: "mpa002",
        name: "Cargo Pants with Multi-Pockets",
        brand: "Levi's",
        description: "Relaxed-fit canvas cargo pants with reinforced stitching and multiple storage pockets.",
        category: "Men",
        subCategory: "Pants",
        price: 65,
        material: "Canvas",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Olive",
                images: ["prod_p11.jpg"],
                sizes: [
                    { name: "L", qty: 7 },
                    { name: "XL", qty: 3 }
                ]
            },
            {
                color: "Khaki",
                images: ["prod_p12.jpg"],
                sizes: [
                    { name: "L", qty: 6 }
                ]
            },
        ],
    },
    {
        id: "mpa003",
        name: "Performance Stretch Joggers",
        brand: "Nike",
        description: "Lightweight performance joggers with moisture-wicking stretch fabric and ergonomic fit.",
        category: "Men",
        subCategory: "Pants",
        price: 60,
        material: "Polyester-Spandex",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Black",
                images: ["prod_p21.jpg"],
                sizes: [
                    { name: "M", qty: 12 },
                    { name: "L", qty: 8 }
                ]
            },
            {
                color: "Gray",
                images: ["prod_p22.jpg"],
                sizes: [
                    { name: "M", qty: 7 }
                ]
            },
        ],
    },
    {
        id: "mpa004",
        name: "Slim Dress Trousers",
        brand: "Brooks Brothers",
        description: "Tailored slim-fit dress trousers with crease-resistant fabric, ideal for office use.",
        category: "Men",
        subCategory: "Pants",
        price: 120,
        material: "Poly-Blend",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Charcoal",
                images: ["prod_p31.jpg"],
                sizes: [
                    { name: "32", qty: 5 },
                    { name: "34", qty: 4 }
                ]
            },
            {
                color: "Navy",
                images: ["prod_p32.jpg"],
                sizes: [
                    { name: "32", qty: 6 }
                ]
            },
        ],
    },
    {
        id: "mpa005",
        name: "Hiking Adventure Pants",
        brand: "Columbia",
        description: "Durable field pants with ripstop nylon fabric, UV protection, and zip-off legs conversion.",
        category: "Men",
        subCategory: "Pants",
        price: 90,
        material: "Ripstop Nylon",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Tan",
                images: ["prod_p41.jpg"],
                sizes: [
                    { name: "M", qty: 6 },
                    { name: "L", qty: 5 }
                ]
            },
            {
                color: "Green",
                images: ["prod_p42.jpg"],
                sizes: [
                    { name: "M", qty: 4 }
                ]
            },
        ],
    },
    {
        id: "mpa006",
        name: "Lightweight Athletic Pants",
        brand: "Under Armour",
        description: "Slim-fit athletic pants with 4-way stretch and reflective detailing for night runs.",
        category: "Men",
        subCategory: "Pants",
        price: 34,
        material: "Poly-Spandex",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Black",
                images: ["prod_p51.jpg"],
                sizes: [
                    { name: "M", qty: 10 },
                    { name: "L", qty: 8 }
                ]
            },
            {
                color: "Blue",
                images: ["prod_p52.jpg"],
                sizes: [
                    { name: "M", qty: 5 }
                ]
            },
        ],
    },
    {
        id: "mpa007",
        name: "Pleated Dress Pants",
        brand: "Suitsupply",
        description: "Classic pleated trousers made of wool-blend, soft and ideal for formal occasions.",
        category: "Men",
        subCategory: "Pants",
        price: 60,
        material: "Wool-Blend",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Gray",
                images: ["prod_p61.jpg"],
                sizes: [
                    { name: "30", qty: 3 },
                    { name: "32", qty: 2 }
                ]
            },
            {
                color: "Black",
                images: ["prod_p62.jpg"],
                sizes: [
                    { name: "30", qty: 4 }
                ]
            },
        ],
    },
    {
        id: "mpa008",
        name: "No-Iron Chino Pants",
        brand: "Dockers",
        description: "Easy-care, wrinkle-free chinos with flex waistband and water repellent treatment.",
        category: "Men",
        subCategory: "Pants",
        price: 60,
        material: "Cotton-Spandex",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Khaki",
                images: ["prod_p71.jpg"],
                sizes: [
                    { name: "M", qty: 8 },
                    { name: "L", qty: 6 }
                ]
            },
            {
                color: "Gray",
                images: ["prod_p72.jpg"],
                sizes: [
                    { name: "M", qty: 5 }
                ]
            },
        ],
    },
    {
        id: "mpa009",
        name: "Tailored Wool Blend Trousers",
        brand: "Todd Snyder",
        description: "Slim-fit wool-blend trousers with a modern cut and soft lining for comfort.",
        category: "Men",
        subCategory: "Pants",
        price: 50,
        material: "Wool-Blend",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Navy",
                images: ["prod_p81.jpg"],
                sizes: [
                    { name: "32", qty: 4 },
                    { name: "34", qty: 3 }
                ]
            },
            {
                color: "Charcoal",
                images: ["prod_p82.jpg"],
                sizes: [
                    { name: "32", qty: 2 }
                ]
            },
        ],
    },
    {
        id: "mpa010",
        name: "Hybrid Cargo Dress Pants",
        brand: "Bonobos",
        description: "Modern hybrid pants: resemble cargos but with dress pant tailoring and tech fabric.",
        category: "Men",
        subCategory: "Pants",
        price: 50,
        material: "Tech-Blend",
        sellerId: "SellBelt2",
        status: "approved",
        stock: [
            {
                color: "Olive",
                images: ["prod_p91.jpg"],
                sizes: [
                    { name: "M", qty: 5 },
                    { name: "L", qty: 3 }
                ]
            },
            {
                color: "Gray",
                images: ["prod_p92.jpg"],
                sizes: [
                    { name: "M", qty: 6 }
                ]
            },
        ],
    },
];


const MenPants = [];

for (const ele of menProductPants) {
    MenPants.push(toProduct(ele))
}

export {MenPants};