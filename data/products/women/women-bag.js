//import toProduct from utils
import { toProduct } from "../../../scripts/utils/data.js";

/* Declare data to transform as an array of objects */
const data =
    [
        {
            id: "wba001",
            name: "World Women Vintage PU Leather Crossbody Bag",
            description: "Retro shoulder bag with flag design, PU leather, small square shape, lockable, ideal for work or daily crossbody use.",
            price: 34.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: "SellM1",
            category: "Women",
            subCategory: "Bags",
            status: "approved",
            stock: [
                {
                    color: "Brown",
                    images: ["bag3.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 5 }
                    ]
                },
                {
                    color: "Black",
                    images: ["bag2.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 7 }
                    ]
                },
                {
                    color: "Multicolor",
                    images: ["bag1.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 4 }
                    ]
                }
            ],
            material: "PU Leather",
            brand: "Shein"
        },
        {
            id: "wba002",
            name: "Fashion Embroidery Handbag",
            description: "Elegant PU leather handbag with floral embroidery, detachable strap, and gold-tone accessories. Perfect for daily use or gifting.",
            price: 48.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: "SellM1",
            category: "Women",
            subCategory: "Bags",
            status: "approved",
            stock: [
                {
                    color: "Khaki",
                    images: ["bag4.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 2 }
                    ]
                },
                {
                    color: "White",
                    images: ["bag5.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 4 }
                    ]
                }
            ],
            material: "PU Leather",
            brand: "Shein"
        },
        {
            id: "wba003",
            name: "Mini Flower Graphic Square Bag",
            description: "Trendy mini handbag with flower graphic design, square shape, top handle, and flap closure. Stylish and compact for daily use.",
            price: 28.50,
            sale: 0,
            offers: ["free shipping"],
            sellerId: "SellM1",
            category: "Women",
            subCategory: "Bags",
            status: "approved",
            stock: [
                {
                    color: "Pink",
                    images: ["bag7.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 2 }
                    ]
                },
                {
                    color: "White",
                    images: ["bag6.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 4 }
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
            price: 46.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: "SellM1",
            category: "Women",
            subCategory: "Bags",
            status: "approved",
            stock: [
                {
                    color: "Beige",
                    images: ["bag15.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 2 }
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
            price: 41.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: "SellM1",
            category: "Women",
            subCategory: "Bags",
            status: "approved",
            stock: [
                {
                    color: "Black",
                    images: ["bag13.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 4 }
                    ]
                }
            ],
            material: "High-Quality PU Leather",
            brand: "Shein"
        },
        {
            id: "wba006",
            name: "Cherry Print Small Square Crossbody Bag",
            description: "White cherry-print square crossbody bag, lightweight and stylish with beaded accents, ideal for spring/summer.",
            price: 33.50,
            sale: 0,
            offers: ["free shipping"],
            sellerId: "SellM1",
            category: "Women",
            subCategory: "Bags",
            status: "approved",
            stock: [
                {
                    color: "White",
                    images: ["bag12.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 3 }
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
            price: 29.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: "SellM1",
            category: "Women",
            subCategory: "Bags",
            status: "approved",
            stock: [
                {
                    color: "White",
                    images: ["bag10.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 3 }
                    ]
                },
                {
                    color: "Brown",
                    images: ["bag11.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 3 }
                    ]
                }
            ],
            material: "PU Leather",
            brand: "Shein"
        },
        {
            id: "wba008",
            name: "Flower Embroidery Faux Pearl Mini Square Bag",
            description: "Green mini square bag with flower embroidery and faux pearls, stylish and elegant for special occasions.",
            price: 25.99,
            sale: 0,
            offers: ["free shipping"],
            sellerId: "SellM1",
            category: "Women",
            subCategory: "Bags",
            status: "approved",
            stock: [
                {
                    color: "Green",
                    images: ["bag9.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 3 }
                    ]
                },
                {
                    color: "White",
                    images: ["bag8.jpeg"],
                    sizes: [
                        { name: "One Size", qty: 4 }
                    ]
                }
            ],
            material: "Faux Leather",
            brand: "Shein"
        }
    ]

// declare an array to contain the ouput ***MUST BE <PascalCase> ***
const womenBags = [];

/* Loop over the array of data and covert to products */
for (let i = 0; i < data.length; i++) { womenBags[i] = toProduct(data[i]) }

//Export the data
export { womenBags }; 