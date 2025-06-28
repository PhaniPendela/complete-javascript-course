// Importing Module
// import { addToCart, price, totalQuantity } from './shoppingCart.js';

// import * as ShoppingCart from './shoppingCart.js';

console.log('Importing Module');
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.price);
// console.log(ShoppingCart.totalQuantity);

// import add, {addToCart, price, totalQuantity} from './shoppingCart.js'
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 10);
add('apples', 5);
console.log(cart);
/*
///////////////////////////////////////
// Top Level Await
// console.log(`Start Fetching`);
// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await res.json();
// console.log(data);
// console.log('Somthing');

const getLastPost = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();

// Not very clean
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/
/*
///////////////////////////////////////
// Module Patterns
const shoppingCart2 = (function () {
  const cart = [];
  const shoppingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;
  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to the cart`);
  };
  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from the supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppingCart2.addToCart('apples', 4);
shoppingCart2.addToCart('pizzas', 2);
console.log(shoppingCart2.cart);
*/
/*
///////////////////////////////////////
// Common JS Modules
// Export
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to the cart`);
  };

// Import
const { addToCart } = require('./shoppingCart.js')
*/

///////////////////////////////////////
// Using npm
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: [{ loggedIn: true }],
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
console.log(stateClone);
state.user.loggedIn = false;

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting} ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';
// import 'core-js/stable/array/find';

// Refilling async functions
import 'regenerator-runtime/runtime';
