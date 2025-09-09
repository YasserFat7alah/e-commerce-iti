import { toProduct } from "../../../scripts/utils/data.js";



const menProductTop = [
	{
		id: "mdsh001",
		name: "Linen Shirt",
		brand: "Defacto",
		description: "Long Sleeves, regular fit, machine washable",
		category: "Men",
		subCategory: "Top",
		price: 29.99,
		status: "approved",
		stock: [
			{
				color: "Grey",
				images: [
					"defactoGrey.png",
					"defactoGreyBack.png",
				],
				sizes: [
					{ name: "S", qty: 5 },
					{ name: "M", qty: 2 },
					{ name: "L", qty: 2 },
				],
			},
			{
				color: "Khaki",
				images: [
					"defactoKhaki.png",
					"defactoKhaki2.png",
					"defactoKhakiBack.png",
				],
				sizes: [
					{ name: "S", qty: 3 },
					{ name: "M", qty: 7 },
					{ name: "L", qty: 3 },
				],
			},
			{
				color: "Beige",
				images: [
					"defactoBeige.png",
					"defactoBeige2.png",
					"defactoBeigeBack.png",
				],
				sizes: [
					{ name: "S", qty: 3 },
					{ name: "M", qty: 5 },
					{ name: "L", qty: 2 },
				],
			},
		],
		material: "Linen",
		sellerId: "SellAdel4",
		sale: 0.1,
		offers: ["free shipping"],
	},
	{
		id: "mzsh001",
		name: "Cotton Linen Shirt",
		brand: "Zara",
		description:
			"Relaxed fit shirt made of a linen and cotton blend. Button-down collar. Long sleeves with buttoned cuffs. Chest patch pocket. Button-up front.",
		category: "Men",
		subCategory: "Top",
		price: 49.99,
		status: "approved",
		stock: [
			{
				color: "Green",
				images: ["zaraShirtGreen.jpg"],
				sizes: [
					{ name: "S", qty: 6 },
					{ name: "M", qty: 2 },
					{ name: "L", qty: 1 },
				],
			},
			{
				color: "Beige",
				images: ["zaraShirtBeige.jpg"],
				sizes: [
					{ name: "S", qty: 3 },
					{ name: "M", qty: 5 },
					{ name: "L", qty: 4 },
				],
			},
			{
				color: "Blue",
				images: ["zaraShirtBlue.jpg"],
				sizes: [
					{ name: "S", qty: 3 },
					{ name: "M", qty: 5 },
					{ name: "L", qty: 2 },
				],
			},
		],
		material: "Cotton Linen",
		sellerId: "SellAdel4",
		sale: 0.14,
		offers: ["free shipping"],
	},
	{
		id: "mash001",
		name: "Real Madrid US Pack Shirt",
		brand: "Adidas",
		description: "A button-up, baseball-style shirt for Real Madrid supporters",
		category: "Men",
		subCategory: "Top",
		price: 19.99,
		status: "approved",
		stock: [
			{
				color: "White",
				images: ["adidasRM.png", "adidasRM2.png", "adidasRM3.png"],
				sizes: [
					{ name: "S", qty: 5 },
					{ name: "M", qty: 5 },
					{ name: "L", qty: 4 },
					{ name: "XL", qty: 2 },
				],
			},
		],
		material: "polyester",
		sellerId: "SellAdel4",
		sale: 0.15,
		offers: ["free shipping"],
	},
	{
		id: "mbbl001",
		name: "Classic Blazer",
		brand: "British House",
		description: "Smart fit solid blazer made of anti bacterial, water resistant, breathable and natural stretch wool fabric.",
		category: "Men",
		subCategory: "Top",
		price: 40.7,
		status: "approved",
		stock: [
			{
				color: "Blue",
				images: ["BHblueblazer1.jpg",
					"BHblueblazer2.jpg",
					"BHblueblazer3.jpg",
					"BHblueblazer4.jpg",
					"BHblueblazer5.jpg",
					"BHblueblazerBack.jpg",
					"BHblueblazerFull.jpg",
				],

				sizes: [
					{ name: "S", qty: 5 },
					{ name: "M", qty: 10 },
					{ name: "L", qty: 2 },
				],
			},


		],
		material: "Linen",
		sellerId: "SellAdel4",
		sale: 0.1,
		offers: ["free shipping"],
	},
];

const menTop = [];
for (let i = 0; i < menProductTop.length; i++) {
	menTop[i] = toProduct(menProductTop[i]);
}
// console.log(MenTop);
export { menTop };
