'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);


const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat"]

const hours = {
    [weekDays[3]]: {
      open: 12,
      close: 22,
    },
    [weekDays[4]]: {
      open: 11,
      close: 23,
    },
    [weekDays[5]]: {
      open: 0, // Open 24 hours
      close: 24,
    },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // openingHours: openingHours;
  //ES6 enhanced Object Literals
  hours,

  order (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery ({
    starterIndex = 1,
    mainIndex = 0,
    address,
    time = '20:00',
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
/*
///////////////////////////////////////////////////////////////////
// Looping through arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) {
  console.log(item);
}

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
  // console.log(`${item[0] + 1}: ${item[1]}`);
}

// console.log([...menu.entries()]);
*/
/*
///////////////////////////////////////////
// Logical AND OR Nullish Operators
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//Logical OR Operator
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests = rest1.numGuests || 10;

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Logical Nullish Operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// Logical AND Operator only if truthy then assigns
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
*/
/*
/////////////////////////////////////////////////
// The Nullish Operator
restaurant.numGuests = 0;

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// nullish: null and undefined
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);
*/
/*
////////////////////////////////////////////////////////////////
// Short Circuiting (&& and ||)
//Use ANY data type, return ANY datatype short circuit evaluation
console.log('----------------OR-----------------')
console.log(3 || 'Jonas');
console.log(-1 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || "" || 'Hello' || 23|| null);

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('----------------AND-----------------')
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'jonas');

//Practical Example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/


/*
////////////////////////////////////////////////////////////////////////////////////////////
// Rest Pattern and Parameters
// 1) Destructuring
// Right side is spread operator
const arr = [1, 2, ...[3,4]];
// Left Side is rest operator
const [a, b, ...others] = [1, 2,3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood);
//Only 1 rest element and also in the last place

//Objects
const { sat, ...weekDays} = restaurant.openingHours;
console.log(weekDays);

//2) Functions
const add = function (...numbers) {
  let sum = 0;
  for(let i = 0; i < numbers.length; i++) {
    sum+= numbers[i];
  } 
  console.log(sum);
}

add(2, 3);
add(5, 3, 2, 7);
add(1,2,3,4,5,6,7,8)

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
*/

/*
/////////////////////////////////////////////////////////////////////
// Spread Operator (...)
const arr = [7, 8 ,9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newGoodArr = [1, 2, ...arr]; // Spread Opperator
console.log(newGoodArr);

console.log(...newGoodArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//Copy Array
const mainMenuArray = [...restaurant.mainMenu];

// Join 2 Arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

const str = 'Jonas';
const letters = [...str, ' ', 'S.']
console.log(letters);

// Real World Example
const ingredients = [
  // prompt('Let\'s make pasta! Ingredient 1'), prompt('Ingredient 2'), prompt('Ingredient 3')
  ];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurent = {foundingYear: 1998, ...restaurant, founder: 'Guiseppe'}
console.log(newRestaurent);

const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name);
console.log(restaurantCopy.name);
*/
/*
//////////////////////////////////
// Destructuring Objects
restaurant.orderDelivery({
  time: '22:30',
  address: 'Vla del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Vla del Sole, 21',
  starterIndex: 1,
});

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

//Nester Objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
*/
/*
/////////////////////////////////////////
// Detructuring Arrays
const arr = [2,3,4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x,y,z] = arr;
console.log(x,y,z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//Switching variables
//Original Basic
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary)

//Destructuring
[main, secondary] = [secondary, main];
console.log(main, secondary);

//return 2 values from functions
const [starter, mainCourse] = restaurant.order(2, 0)
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

//Default Values
const [p=1, q=1, r=1] = [8, 9];
console.log(p ,q, r);
*/
