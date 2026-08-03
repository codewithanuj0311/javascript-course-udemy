//Exporting module
console.log('Exporting Module');

const shippingPrice = 10;
const totalPrice = 123;
let cart = [];

export const addToCart = function(product, quantitiy) {
    cart.push({product, quantitiy});
    console.log(`${quantitiy} ${product}, have been added to cart`);
} 

export {
    totalPrice,
    shippingPrice
}

export default function(product, quantitiy) {
    cart.push({product, quantitiy});
    console.log(`${quantitiy} ${product}, have been added to cart`);
} 