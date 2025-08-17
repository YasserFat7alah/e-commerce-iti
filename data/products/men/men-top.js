
import { toProduct } from "../../../scripts/utils.js";

const menProducts = [
	{
		id: "Sh001",
		name: "Linen Shirt",
		brand: "Defacto",
		description: "Long Sleeves, regular fit, machine washable",
		category: "Men",
		subCategory: "T-shirt",
		price: 1499.99,
		stock: [
			{
				color: "grey",
				images: [
					"../../imgs/products/men/top/defactoShirts/defactoGrey.avif",
					"../../imgs/products/men/top/defactoShirts/defactoGreyBack.avif",
				],
				sizes: [
					{ name: "S", quantity: 5 },
					{ name: "M", quantity: 2 },
					{ name: "L", quantity: 2 },
				],
			},
			{
				color: "khaki",
				images: [
					"../../imgs/products/men/top/defactoShirts/defactoKhaki.avif",
					"../../imgs/products/men/top/defactoShirts/defactoKhaki2.avif",
					"../../imgs/products/men/top/defactoShirts/defactoKhakiBack.avif",
				],
				sizes: [
					{ name: "S", quantity: 3 },
					{ name: "M", quantity: 7 },
					{ name: "L", quantity: 3 },
				],
			},
			{
				color: "beige",
				images: [
					"../../imgs/products/men/top/defactoShirts/defactoBeige.avif",
					"../../imgs/products/men/top/defactoShirts/defactoBeige2.avif",
					"../../imgs/products/men/top/defactoShirts/defactoBeigeBack.avif",
				],
				sizes: [
					{ name: "S", quantity: 3 },
					{ name: "M", quantity: 5 },
					{ name: "L", quantity: 2 },
				],
			},
		],
		material: "Linen",
		sellerId: "ahmedossama",
		sale: 0.1,
		offers: ["free shipping"],
	},
	{
		id: "Sh002",
		name: "Cotton Linen Shirt",
		brand: "Zara",
		description:
			"Relaxed fit shirt made of a linen and cotton blend. Button-down collar. Long sleeves with buttoned cuffs. Chest patch pocket. Button-up front.",
		category: "Men",
		subCategory: "T-shirt",
		price: 2499.99,
		stock: [
			{
				color: "green",
				images: ["../../imgs/products/men/top/zaraShirts/zaraShirtGreen.jpg"],
				sizes: [
					{ name: "S", quantity: 6 },
					{ name: "M", quantity: 2 },
					{ name: "L", quantity: 1 },
				],
			},
			{
				color: "beige",
				images: ["../../imgs/products/men/top/zaraShirts/zaraShirtBeige.jpg"],
				sizes: [
					{ name: "S", quantity: 3 },
					{ name: "M", quantity: 5 },
					{ name: "L", quantity: 4 },
				],
			},
			{
				color: "blue",
				images: ["../../imgs/products/men/top/zaraShirts/zaraShirtBlue.jpg"],
				sizes: [
					{ name: "S", quantity: 3 },
					{ name: "M", quantity: 5 },
					{ name: "L", quantity: 2 },
				],
			},
		],
		material: "Cotton Linen",
		sellerId: "ahmedossama",
		sale: 0.14,
		offers: ["free shipping"],
	},
	{
		id: "Sh003",
		name: "Real Madrid US Pack Shirt",
		brand: "Adidas",
		description: "A button-up, baseball-style shirt for Real Madrid supporters",
		category: "Men",
		subCategory: "T-shirt",
		price: 899.99,
		stock: [
			{
				color: "white",
				images: ["images/hoodie-grey-front.jpg", "images/hoodie-grey-back.jpg"],
				sizes: [
					{ name: "S", quantity: 5 },
					{ name: "M", quantity: 5 },
					{ name: "L", quantity: 4 },
					{ name: "XL", quantity: 2 },
				],
			},
		],
		material: "polyester",
		sellerId: "ahmedossama",
		sale: 0.15,
		offers: ["free shipping"],
	},
	{
		id: "BL001",
		name: "Classic Blazer",
		brand: "British House",
		description: "Smart fit solid blazer made of anti bacterial, water resistant, breathable and natural stretch wool fabric.",
		category: "Men",
		subCategory: "Blazer",
		price: 14999.99,
		stock: [
			{
				color: "Blue",
				images: ["../../imgs/products/men/top/brithHouseBlazer/BHblueblazer1.jpg",
                    "../../imgs/products/men/top/brithHouseBlazer/BHblueblazer2.jpg",
                    "../../imgs/products/men/top/brithHouseBlazer/BHblueblazer3.jpg",
                    "../../imgs/products/men/top/brithHouseBlazer/BHblueblazer4.jpg",
                    "../../imgs/products/men/top/brithHouseBlazer/BHblueblazer5.jpg",
                    "../../imgs/products/men/top/brithHouseBlazer/BHblueblazerBack.jpg",
                    "../../imgs/products/men/top/brithHouseBlazer/BHblueblazerFull.jpg",
                ],
				
				sizes: [
					{ name: "S", quantity: 5 },
					{ name: "M", quantity: 2 },
					{ name: "L", quantity: 2 },
				],
			},
			
			
		],
		material: "Linen",
		sellerId: "ahmedossama",
		sale: 0.1,
		offers: ["free shipping"],
	},
];

const MenTop = [];
for (let i=0; i<menProducts.length; i++) {
		MenTop[i] = toProduct(menProducts[i]);
}

/* EXPORTING MEN TOPS */
export { MenTop };
