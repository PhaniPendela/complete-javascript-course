// Exporting Module
console.log('Exporting Module');

// Blocking code
// console.log('Start fetching users');
// await fetch(`https://jsonplaceholder.typicode.com/posts`);
// console.log('Finish fetching');

const shippingCost = 10;
export const cart = [];

const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { addToCart, totalPrice as price, totalQuantity };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
}
