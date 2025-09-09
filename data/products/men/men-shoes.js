import { toProduct } from "../../../scripts/utils/data.js";

const menProductShoes = [
	{
		id: "msh001",
		name: "Leather Sneakers",
		brand: "Concrete",
		description: "Comfortable sneakers made of genuine leather. Made in italy.",
		category: "Men",
		subCategory: "Shoes",
		price: 19.99,
		status: "approved",
		stock: [
			{
				color: "Brown",
				images: [
					"ConcreteBrownShoesFront.jpg",
					"ConcreteBrownShoesPair.jpg",
					"ConcreteBrownShoesSide.jpg",
					"ConcreteBrownShoesTop.jpg",
				],
				sizes: [
					{ name: "41", qty: 15 },
					{ name: "42", qty: 15 },
					{ name: "43", qty: 10 },
					{ name: "44", qty: 19 },
					{ name: "45", qty: 14 },
				],
			},
			{
				color: "Dark Blue",
				images: [
					"ConcreteBlackShoesFront.jpg",
					"ConcreteBlackShoesPair.jpg",
					"ConcreteBlackShoesSide.jpg",
					"ConcreteBlackShoesTop.jpg",
				],
				sizes: [
					{ name: "41", qty: 15 },
					{ name: "42", qty: 17 },
					{ name: "43", qty: 10 },
					{ name: "44", qty: 19 },
					{ name: "45", qty: 14 },
				],
			},

		],
		material: "Leather",
		sellerId: "SellMoh3",
		sale: 0.1,
		offers: ["free shipping"],
	},
	{
		id: "msh002",
		name: "Neo Shot Sneakers",
		brand: "Lacost",
		description: "the latest creative addition to the Neo line, is a bold, sophisticated running style. Featuring a premium multi-panel upper and an oversized molded sole, for a dynamic, high-contrast look.",
		category: "Men",
		subCategory: "Shoes",
		price: 29.99,
		status: "approved",
		stock: [
			{
				color: "Black",
				images: [
					"lacostBlackSneakerPair.png",
					"lacostBlackSneakerSide.png",
					"lacostBlackSneakerTop.png",
				],
				sizes: [
					{ name: "41", qty: 18 },
					{ name: "42", qty: 19 },
					{ name: "43", qty: 11 },
					{ name: "44", qty: 19 },
					{ name: "45", qty: 15 },
				],
			},
			{
				color: "White",
				images: [
					"lacostWhiteSneakerFront.png",
					"lacostWhiteSneakerSide.png",
					"lacostWhiteSneakerTop.png",
				],
				sizes: [
					{ name: "41", qty: 16 },
					{ name: "42", qty: 21 },
					{ name: "43", qty: 23 },
					{ name: "44", qty: 21 },
					{ name: "45", qty: 18 },
				],
			},

		],
		material: "Premium mixed material upper with mesh, synthetic and nubuck elements",
		sellerId: "SellMoh3",
		sale: 0.1,
		offers: ["free shipping"],
	},

];

const menShoes = [];
for (let i = 0; i < menProductShoes.length; i++) {
	menShoes[i] = toProduct(menProductShoes[i]);
}
// console.log(menShoes);
export { menShoes };