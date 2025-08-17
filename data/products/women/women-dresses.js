//import toProduct from utils
import { toProduct } from "../../../scripts/utils.js" ;

/*Dresses Data*/
const dresses = [
    {   id: 'wdr001', 
        name: "Short Dress", 
        description: "White Short Sleeve Formal Occasion Elegant Slim A-Line Dress",
        price: 5.68,
        sale:0.15 ,
        offers: [
            'free shipping'
        ],
        
        sellerId: 'seller_2', 
        category: "Women", 
        subCategory: "Dresses", 

        stock:[
            {
            color: "White",
            imgs: ['dress1-white.png'],
            sizes: [
                {name: 'M', qty: 5 },
                {name: 'L', qty: 7 },
                {name: 'XL', qty: 7 }
            ] ,
            },
            {
            color: "Black",
            imgs: ['dress1-black.png'],
            sizes: [
                {name: 'M', qty: 6 },
                {name: 'L', qty: 12 },
                {name: 'XL', qty: 4 }
            ] ,
            },
            {
            color: "Baby Blue",
            imgs: ['dress1-babyblue.png'],
            sizes: [
                {name: 'M', qty: 10 },
                {name: 'L', qty: 5 },
                {name: 'XL', qty: 2 }
            ] ,
            },
        ],

        material: "cotton", 
        brand: "Zara", 
        addedAt : '' ,
        status : 'approved'
    },
    {   id: 'wdr002',
        name: "Casual Dress",
        description: "Franclia Women's Casual Striped Button Front Dress, Summer Summer Dress Roupa Para A Universidade",
        price: 13.50,
        sale : 0.20 ,
        offers: [
            'free shipping'
        ],

        sellerId: 'seller_1', 
        category: "Women", 
        subCategory: "Dresses", 

        stock:[
                {
                color: "White",
                imgs: ['dress2-white.png'],
                sizes: [
                    {name: 'M', qty: 5 },
                    {name: 'L', qty: 7 },
                    {name: 'XL', qty: 7 }
                ] ,
                },
                {
                color: "Black",
                imgs: ['dress2-black.png'],
                sizes: [
                    {name: 'M', qty: 6 },
                    {name: 'L', qty: 12 },
                    {name: 'XL', qty: 4 }
                ] ,
                },
                {
                color: "Baby Blue",
                imgs: ['dress2-babyblue.png'],
                sizes: [
                    {name: 'M', qty: 10 },
                    {name: 'L', qty: 5 },
                    {name: 'XL', qty: 2 }
                ] ,
                },
                {
                color: "Pink",
                imgs: ['dress2-pink.png'],
                sizes: [
                    {name: 'M', qty: 10 },
                    {name: 'L', qty: 5 },
                    {name: 'XL', qty: 2 }
                ] ,
                },
        ],

        material: "cotton", 
        brand: "Zara", 
        addedAt : '' ,
        status : 'approved'
    } ,
    { id: 'wdr003',
        name: "Classic Short Dress",
        description: "Solid Color Lapel Neck Short Sleeve Shirt Midi Dress",
        price: 10.60,
        sale : 0.20 ,
        offers: [
            'free shipping'
        ],

        sellerId: 'seller_1', 
        category: "Women", 
        subCategory: "Dresses", 

        stock:[
                    {
                    color: "White",
                    imgs: ['dress3-white.png'],
                    sizes: [
                        {name: 'M', qty: 5 },
                        {name: 'L', qty: 12 },
                        {name: 'XL', qty: 8 }
                    ] ,
                    },
                    {
                    color: "Black",
                    imgs: ['dress3-black.png'],
                    sizes: [
                        {name: 'S', qty: 6 },
                        {name: 'L', qty: 2 },
                        {name: 'XL', qty: 4 }
                    ] ,
                    },
        ],

        material: "cotton", 
        brand: "Zara", 
        addedAt : '' ,
        status : 'approved'
    } ,
    {   id: 'wdr004',
        name: "Elegant Long Dress",
        description: "Black Textured Fabric Button Decor Back Slit Long Sleeve Elegant Long Dress For Women",
        price: 20,
        sale : 0.20 ,
        offers: [
            'free shipping'
        ],

        sellerId: 'seller_2', 
        category: "Women", 
        subCategory: "Dresses", 
        
        
        stock:[
                {
                color: "Black",
                imgs: ['dress4-black.png'],
                sizes: [
                    {name: 'S', qty: 6 },
                    {name: 'L', qty: 2 },
                    {name: 'XL', qty: 4 }
                ] ,
                },
        ],

        material: "cotton", 
        brand: "Zara", 
        addedAt : '' ,
        status : 'approved'
    } ,
    {   id: 'wdr005',
        name: "Formal Long Dress",
        description: "Square Neck 3/4 Sleeve Retro Casual Business Professional OL Bodycon Dress",
        price: 12.36,

        sale : 0.14 ,
        offers: [
            'free shipping'
        ],

        sellerId: 'seller_2', 
        category: "Women", 
        subCategory: "Dresses", 
        
        stock:[
                {
                color: "Black",
                imgs: ['dress5-black.png'],
                sizes: [
                    {name: 'S', qty: 6 },
                    {name: 'M', qty: 12 },
                    {name: 'L', qty: 10 },
                    {name: 'XL', qty: 4 }
                ] ,
                },
                {
                color: "Blue",
                imgs: ['dress5-blue.png'],
                sizes: [
                    {name: 'S', qty: 6 },
                    {name: 'M', qty: 12 },
                    {name: 'L', qty: 10 },
                    {name: 'XL', qty: 4 }
                ] ,
                },
        ],

        material: "cotton", 
        brand: "SheIn", 
        addedAt : '' ,
        status : 'approved'
    } ,
    {   id: 'wdr006',
        name: "Soiree Long Dress",
        description: " Round Neck Long Sleeve Crystal Decor Simple Casual Long Dress Long Evening Dresses",
        price: 16.9,
        sale : 0.14 ,
        offers: [
        'free shipping'
        ],
        sellerId: 'seller_3', 
        category: "Women", 
        subCategory: "Dresses",
        
        stock:[
                    {
                    color: "Black",
                    imgs: ['dress6-black.png'],
                    sizes: [
                        {name: 'S', qty: 6 },
                        {name: 'M', qty: 12 },
                        {name: 'L', qty: 10 },
                        {name: 'XL', qty: 4 }
                    ] ,
                    },
                    {
                    color: "Baby Blue",
                    imgs: ['dress6-babyblue.png'],
                    sizes: [
                        {name: 'S', qty: 6 },
                        {name: 'M', qty: 12 },
                        {name: 'L', qty: 10 },
                        {name: 'XL', qty: 4 }
                    ] ,
                    },
                    {
                    color: "Olive Green",
                    imgs: ['dress6-oliveGreen.png'],
                    sizes: [
                        {name: 'S', qty: 6 },
                        {name: 'M', qty: 12 },
                        {name: 'L', qty: 10 },
                        {name: 'XL', qty: 4 }
                    ] ,
                    },
        ],

        material: "cotton", 
        brand: "SheIn", 
        addedAt : '' ,
        status : 'approved'
    } ,
    {   id: 'wdr007',
        name: "Soiree Long Dress",
        description: " Round Neck Long Sleeve Crystal Decor Simple Casual Long Dress Long Evening Dresses",
        price: 20.3,
        sale : 0.15 ,
        offers: [
            'free shipping'
        ],
        sellerId: 'seller_3',
        category: "Women", 
        subCategory: "Dresses",  
        
        stock:[
                {
                  color: "Black",
                  imgs: ['dress7-black.png'],
                  sizes: [
                      {name: 'S', qty: 6 },
                      {name: 'M', qty: 12 },
                      {name: 'L', qty: 10 },
                      {name: 'XL', qty: 4 }
                  ] ,
                },
                {
                  color: "Dark Green",
                  imgs: ['dress7-darkGreen.png'],
                  sizes: [
                      {name: 'S', qty: 6 },
                      {name: 'M', qty: 12 },
                      {name: 'L', qty: 10 },
                      {name: 'XL', qty: 4 }
                  ] ,
                },
                {
                  color: "Pink",
                  imgs: ['dress7-pink.png'],
                  sizes: [
                      {name: 'S', qty: 6 },
                      {name: 'M', qty: 12 },
                      {name: 'L', qty: 10 },
                      {name: 'XL', qty: 4 }
                  ] ,
                },
                {
                  color: "Red",
                  imgs: ['dress7-red.png'],
                  sizes: [
                      {name: 'S', qty: 6 },
                      {name: 'M', qty: 12 },
                      {name: 'L', qty: 10 },
                      {name: 'XL', qty: 4 }
                  ] ,
                },
        ],

        material: "cotton", 
        brand: "SheIn", 
        addedAt : '' ,
        status : 'approved'
    } ,
    {   id: 'wdr008',
        name: " Long Summer Dress",
        description: "Long Bell Sleeve Asymmetrical Ruffle Hem Dress",
        price: 10.6,
        offers: [
            'free shipping'
        ],    
        sellerId: 'seller_3', 
        category: "Women", 
        subCategory: "Dresses",
        
        stock:[
                {
                    color: "Blue",
                    imgs: ['dress8-blue.png'],
                    sizes: [
                        {name: 'M', qty: 5 },
                        {name: 'L', qty: 7 },
                        {name: 'XL', qty: 7 }
                    ] ,
                },
                {
                    color: "Baby Blue",
                    imgs: ['dress8-babyblue.png'],
                    sizes: [
                        {name: 'M', qty: 6 },
                        {name: 'L', qty: 12 },
                        {name: 'XL', qty: 4 }
                    ] ,
                },
                {
                    color: "Red",
                    imgs: ['dress8-red.png'],
                    sizes: [
                        {name: 'M', qty: 10 },
                        {name: 'L', qty: 5 },
                        {name: 'XL', qty: 2 }
                    ] ,
                },
        ],

        material: "cotton", 
        brand: "Zara", 
        addedAt : '' ,
        status : 'approved'
    } ,
    {   id: 'wdr009',
        name: "Flower Long Summer Dress",
        description: "Women 3D Flower Decor Patchwork Ruffle Hem Dress",
        price: 15.3,
        sale : 0.20 ,
        offers: [
            'free shipping'
        ],    
        sellerId: 'seller_1', 
        category: "Women", 
        subCategory: "Dresses", 
        
        stock:[
                {
                    color: "Black",
                    imgs: ['dress9-black.png'],
                    sizes: [
                        {name: 'XS', qty: 4},
                        {name: 'S', qty: 6 },
                        {name: 'M', qty: 12 },
                        {name: 'L', qty: 10 },
                        {name: 'XL', qty: 4 }
                    ] ,
                },
        ],

        material: "cotton", 
        brand: "SheIn", 
        addedAt : '' ,
        status : 'approved'
    } , 
    {   id: 'wdr010',
        name: "Elegant Long Dress",
        description: "Modelyn Asymmetrical Neck Pleated Detail Dress",
        price: 12.63,
        sale : 0.20 ,
        offers: [
            'free shipping'
        ], 
        sellerId: 'seller_3', 
        category: "Women", 
        subCategory: "Dresses", 
        
        stock:[
                {
                color: "Black",
                imgs: ['dress10-black.png'],
                sizes: [
                    {name: 'XS', qty: 4},
                    {name: 'S', qty: 6 },
                    {name: 'M', qty: 12 },
                    {name: 'L', qty: 10 },
                    {name: 'XL', qty: 4 }
                ] ,
                },
                {
                color: "Green",
                imgs: ['dress10-green.png'],
                sizes: [
                    {name: 'XS', qty: 4},
                    {name: 'S', qty: 6 },
                    {name: 'M', qty: 12 },
                    {name: 'L', qty: 10 },
                    {name: 'XL', qty: 4 }
                ] ,
                },
            ],

        material: "cotton", 
        brand: "H&M", 
        addedAt : '' ,
        status : 'approved'
    } ,       
];


const womenDresses = [];

for(let i =0 ; i<dresses.length ; i++) {womenDresses[i] = toProduct(dresses[i])} ;

export { womenDresses };
