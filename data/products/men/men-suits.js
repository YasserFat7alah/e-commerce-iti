import { toProduct } from "../../../scripts/utils.js";

const menProductSuits = [
  {
    id: "msu001",
    name: "Classic Black Two-Piece Suit",
    brand: "Hugo Boss",
    description: "Timeless black suit with notch lapel, ideal for business or formal events.",
    category: "Men",
    subCategory: "Suits",
    price: 2500,
    material: "Wool Blend",
    sellerid: "sahmedbeltagy",
    status: "approved",
    stock: [
      {
        color: "Black",
        images: ["prod_p01.jpg"],
        sizes: [
          { name: "48", quantity: 5 },
          { name: "50", quantity: 3 }
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
    price: 2600,
    material: "Polyester & Viscose",
    sellerid: "sahmedbeltagy",
    status: "approved",
    stock: [
      {
        color: "Navy",
        images: ["prod_p02.jpg"],
        sizes: [
          { name: "48", quantity: 4 },
          { name: "50", quantity: 6 }
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
    price: 3000,
    material: "Wool",
    sellerid: "sahmedbeltagy",
    status: "approved",
    stock: [
      {
        color: "Gray Check",
        images: ["prod_p03.jpg"],
        sizes: [
          { name: "48", quantity: 2 },
          { name: "50", quantity: 5 }
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
    price: 2800,
    material: "Wool Blend",
    sellerid: "sahmedbeltagy",
    status: "approved",
    stock: [
      {
        color: "Charcoal",
        images: ["prod_p04.jpg"],
        sizes: [
          { name: "48", quantity: 3 },
          { name: "50", quantity: 4 }
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
    price: 2400,
    material: "Linen & Cotton",
    sellerid: "sahmedbeltagy",
    status: "approved",
    stock: [
      {
        color: "Light Gray",
        images: ["prod_p05.jpg"],
        sizes: [
          { name: "48", quantity: 6 },
          { name: "50", quantity: 3 }
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
    price: 2700,
    material: "Wool",
    sellerid: "sahmedbeltagy",
    status: "approved",
    stock: [
      {
        color: "Blue Pinstripe",
        images: ["prod_p06.jpg"],
        sizes: [
          { name: "48", quantity: 5 },
          { name: "50", quantity: 4 }
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
    price: 3200,
    material: "Velvet",
    sellerid: "sahmedbeltagy",
    status: "approved",
    stock: [
      {
        color: "Burgundy",
        images: ["prod_p07.jpg"],
        sizes: [
          { name: "48", quantity: 2 },
          { name: "50", quantity: 3 }
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
    price: 2300,
    material: "Linen",
    sellerid: "sahmedbeltagy",
    status: "approved",
    stock: [
      {
        color: "White",
        images: ["prod_p08.jpg"],
        sizes: [
          { name: "48", quantity: 4 },
          { name: "50", quantity: 5 }
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
    price: 2600,
    material: "Cotton Blend",
    sellerid: "sahmedbeltagy",
    status: "approved",
    stock: [
      {
        color: "Olive",
        images: ["prod_p09.jpg"],
        sizes: [
          { name: "48", quantity: 3 },
          { name: "50", quantity: 2 }
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
    price: 3500,
    material: "Wool & Satin",
    sellerid: "sahmedbeltagy",
    status: "approved",
    stock: [
      {
        color: "Black",
        images: ["prod_p010.jpg"],
        sizes: [
          { name: "48", quantity: 4 },
          { name: "50", quantity: 3 }
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
