import { toProduct } from "../../../scripts/utils/data.js";

const menProductSuits = [
  {
    id: "msu001",
    name: "Classic Black Two-Piece Suit",
    brand: "Hugo Boss",
    description: "Timeless black suit with notch lapel, ideal for business or formal events.",
    category: "Men",
    subCategory: "Suits",
    price: 250,
    material: "Wool Blend",
    sellerId: "SellBelt2",
    status: "approved",
    stock: [
      {
        color: "Black",
        images: ["prod_p01.jpg"],
        sizes: [
          { name: "48", qty: 5 },
          { name: "50", qty: 3 }
        ]
      }
    ]
  },
  {
    id: "msu002",
    name: "Navy Slim Fit Suit",
    brand: "Zara",
    description: "Modern navy slim-fit suit with flat-front trousers.",
    category: "Men",
    subCategory: "Suits",
    price: 260,
    material: "Polyester & Viscose",
    sellerId: "SellBelt2",
    status: "approved",
    stock: [
      {
        color: "Navy",
        images: ["prod_p02.jpg"],
        sizes: [
          { name: "48", qty: 4 },
          { name: "50", qty: 6 }
        ]
      }
    ]
  },
  {
    id: "msu003",
    name: "Gray Check Three-Piece Suit",
    brand: "Armani",
    description: "Gray check patterned suit with matching vest, perfect for weddings.",
    category: "Men",
    subCategory: "Suits",
    price: 300,
    material: "Wool",
    sellerId: "SellBelt2",
    status: "approved",
    stock: [
      {
        color: "Gray Check",
        images: ["prod_p03.jpg"],
        sizes: [
          { name: "48", qty: 2 },
          { name: "50", qty: 5 }
        ]
      }
    ]
  },
  {
    id: "msu004",
    name: "Charcoal Double-Breasted Suit",
    brand: "Ralph Lauren",
    description: "Sophisticated charcoal double-breasted suit with peak lapels.",
    category: "Men",
    subCategory: "Suits",
    price: 280,
    material: "Wool Blend",
    sellerId: "SellBelt2",
    status: "approved",
    stock: [
      {
        color: "Charcoal",
        images: ["prod_p04.jpg"],
        sizes: [
          { name: "48", qty: 3 },
          { name: "50", qty: 4 }
        ]
      }
    ]
  },
  {
    id: "msu005",
    name: "Light Gray Summer Suit",
    brand: "Banana Republic",
    description: "Light gray breathable summer suit with half-lining for comfort.",
    category: "Men",
    subCategory: "Suits",
    price: 240,
    material: "Linen & Cotton",
    sellerId: "SellBelt2",
    status: "approved",
    stock: [
      {
        color: "Light Gray",
        images: ["prod_p05.jpg"],
        sizes: [
          { name: "48", qty: 6 },
          { name: "50", qty: 3 }
        ]
      }
    ]
  },
  {
    id: "msu006",
    name: "Blue Pinstripe Suit",
    brand: "Brooks Brothers",
    description: "Tailored blue pinstripe suit with two-button jacket.",
    category: "Men",
    subCategory: "Suits",
    price: 270,
    material: "Wool",
    sellerId: "SellBelt2",
    status: "approved",
    stock: [
      {
        color: "Blue Pinstripe",
        images: ["prod_p06.jpg"],
        sizes: [
          { name: "48", qty: 5 },
          { name: "50", qty: 4 }
        ]
      }
    ]
  },
  {
    id: "msu007",
    name: "Burgundy Velvet Dinner Jacket",
    brand: "Gucci",
    description: "Luxury burgundy velvet dinner jacket for special occasions.",
    category: "Men",
    subCategory: "Suits",
    price: 320,
    material: "Velvet",
    sellerId: "SellBelt2",
    status: "approved",
    stock: [
      {
        color: "Burgundy",
        images: ["prod_p07.jpg"],
        sizes: [
          { name: "48", qty: 2 },
          { name: "50", qty: 3 }
        ]
      }
    ]
  },
  {
    id: "msu008",
    name: "White Linen Suit",
    brand: "Ermenegildo Zegna",
    description: "Lightweight white linen suit, ideal for summer weddings and events.",
    category: "Men",
    subCategory: "Suits",
    price: 230,
    material: "Linen",
    sellerId: "SellBelt2",
    status: "approved",
    stock: [
      {
        color: "White",
        images: ["prod_p08.jpg"],
        sizes: [
          { name: "48", qty: 4 },
          { name: "50", qty: 5 }
        ]
      }
    ]
  },
  {
    id: "msu009",
    name: "Olive Green Suit",
    brand: "Paul Smith",
    description: "Stylish olive green suit with single-breasted jacket.",
    category: "Men",
    subCategory: "Suits",
    price: 260,
    material: "Cotton Blend",
    sellerId: "SellBelt2",
    status: "approved",
    stock: [
      {
        color: "Olive",
        images: ["prod_p09.jpg"],
        sizes: [
          { name: "48", qty: 3 },
          { name: "50", qty: 2 }
        ]
      }
    ]
  },
  {
    id: "msu010",
    name: "Tuxedo with Satin Lapel",
    brand: "Tom Ford",
    description: "Classic black tuxedo with satin lapel, perfect for black-tie events.",
    category: "Men",
    subCategory: "Suits",
    price: 350,
    material: "Wool & Satin",
    sellerId: "SellBelt2",
    status: "approved",
    stock: [
      {
        color: "Black",
        images: ["prod_p010.jpg"],
        sizes: [
          { name: "48", qty: 4 },
          { name: "50", qty: 3 }
        ]
      }
    ]
  }
];

const MenSuits = [];

for (const ele of menProductSuits) {
    MenSuits.push(toProduct(ele))
}

export {MenSuits};