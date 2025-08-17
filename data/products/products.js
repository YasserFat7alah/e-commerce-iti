/* -----------UNI DATA---------- */
    //HATS
import { uniHats } from "./unisex/uni-hat.js";

/* -----------MEN DATA---------- */
    //TOP
import { MenTop } from "./men/men-top.js"; 
import { MenAcc } from "./men/men-accessories.js";
import { MenPants } from "./men/men-bottom.js";
import { MenSuits } from "./men/men-suits.js";
/* ----------WOMEN DATA--------- */
    //SHOES
import { womenBags } from "./women/women-bag.js";
    // Skirts
import { womenSkirts } from "./women/women-bottom.js";
    // Shoes
import { womenShoes } from "./women/women-shoes.js";
    // Dresses
import { womenDresses } from "./women/women-dresses.js";
    // Accessories
import { womenAccessories } from "./women/women-accessories.js";
    // Blouses
import { womenBlouses } from "./women/women-top.js";


/* -----------PRODUCTS---------- */
export const products = [];


/* -----------UNI ADDED---------- */
    //HATS
products.push(...uniHats)

/* -----------MEN ADDED---------- */
    //TOPS
products.push(...MenTop);
products.push(...MenAcc);
products.push(...MenPants);
products.push(...MenSuits);
/* ----------WOMEN ADDED--------- */
    //SHOES
products.push(...womenShoes);
    // Dresses
products.push(...womenDresses);
    // Accessories
products.push(...womenAccessories);
    // BAGS
products.push(...womenBags);
    // SKIRTS
products.push(...womenSkirts);
    //Blouses
products.push(...womenBlouses);