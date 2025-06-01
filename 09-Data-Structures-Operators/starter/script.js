'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

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

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const openingHours = {
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
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, address, time = '20:00' }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const allLogs = flights.split('+');
for (const log of allLogs) {
  const [type, start, end, time] = log.split(';');
  // console.log(type);
  const modifiedType = type.replaceAll('_', ' ').trim();
  // console.log(modifiedType);
  let index = 0;
  for (let i = 0; i < start.length; i++) {
    if (Number(start[i]) < 10) {
      index = i;
      break;
    }
  }
  const modifiedStart = start.slice(0, index).toUpperCase();
  for (let i = 0; i < end.length; i++) {
    if (Number(start[i]) < 10) {
      index = i;
      break;
    }
  }
  const modifiedEnd = end.slice(0, index).toUpperCase();
  const modifiedTime = time.replace(':', 'h');
  console.log(
    [
      modifiedType.includes('Delayed') ? '🔴' : '',
      modifiedType,
      'from',
      modifiedStart,
      'to',
      modifiedEnd,
      `(${modifiedTime})`,
    ]
      .join(' ')
      .padStart(43, ' ')
  );
}

/*
//////////////////////////////////////////////////////////////
// Working with strings Part 3
// Split and Join
console.log(`a+very+nice+string`.split('+'));
console.log('Krishna Chaitanya'.split(' '));

const [firstName, lastName] = 'Krishna Chaitanya'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // const lowerName = n.toLowerCase();
    // const outputName = lowerName[0].toUpperCase() + lowerName.slice(1);
    // namesUpper.push(outputName);
    const upName = n.replace(n[0], n[0].toUpperCase());
    namesUpper.push(upName);
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('krishna chaitanya');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('jonas'.padStart(20, '+').padEnd(30, '+'));

// Real Life example
const maskCreditCard = function (number) {
  const str = number + '';
  const lastFour = str.slice(-4);
  return lastFour.padStart(str.length, '*');
};

console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('5465451265622156426'));

// Repeat
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`there are ${n} planes in line ${'✈️'.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);
*/
/*
/////////////////////////////////////////////////////
// Working with strings part 2
const airline = 'TAP Air Portugal';

console.log(airline.toLocaleLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'joNAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalisedEmail = loginEmail.toLowerCase().trim();
console.log(normalisedEmail);
console.log(email === normalisedEmail);

// replacing
const priceGB = '288,97€';
const priceUS = priceGB.replace('€', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23, Boarding door 23!';

console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement);

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Aib'));

if (plane.startsWith('Airbus') && plane.endsWith('neo'))
  console.log('Part of the new airbus family');

// Practice exercise
const checkBaggage = function (items) {
  const baggae = items.toLowerCase();
  if (baggae.includes('knife') || baggae.includes('gun'))
    console.log('You are not allowed on board.');
  else console.log('Welcome Abroad');
};

checkBaggage(`I have a laptop, some Food and a packet Knife`);
checkBaggage('Socks and Camera');
checkBaggage('Got some snacks and a gun for protection');
*/
/*
////////////////////////////////////////////////////////////////
// Working with strings - 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane.length);
console.log('B747'[0]);
console.log('B747'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));
console.log(airline.indexOf('portugal')); // Case sensitive

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  const s = seat.slice(-1);
  // console.log(s);
  if (s == 'B' || s == 'E') {
    console.log('You got the middle seat 😒');
  }
  else {
    console.log('You got Lucky 😊');
  }
} 

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');
*/
/*
/////////////////////////////////////////////////////////////////////////
// Maps Iteration
const question  = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try Again!'],
]);

console.log(question);

console.log(Object.entries(openingHours));

const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));

for (const [key, value] of question) {
  if (typeof key == 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

// const ans = Number(prompt('Your Answer'));
const ans = 3;
console.log(ans);

console.log(question.get(ans == question.get('correct')));

// Convert map to array
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
*/

/*
///////////////////////////////////////////////////////////////////////////
// Maps Introduction
const rest = new Map();
rest.set('name', 'Classico Italiono');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Libson, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are close :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(`true`));
console.log(rest.get(1));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')))

console.log(rest.has('categories'));
rest.delete(2);
const arr = [1,2];
rest.set(arr, 'test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);
// rest.clear();

console.log( rest.get(arr));
*/
/*
/////////////////////////////////////////////////////////////
// ES2025 Additional Set Functions (also issubset, issuperset) fucntions check documentation
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log(commonFoods);
console.log([...commonFoods]);

const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log([...italianMexicanFusion])

const italianMexicanFusionArray = (new Set([...italianFoods, ...mexicanFoods]));
console.log(italianMexicanFusionArray);

const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log(uniqueItalianFoods);
console.log(uniqueMexicanFoods);

const uniqueItalianMexicanFoods = italianFoods.symmetricDifference(mexicanFoods);
console.log(uniqueItalianMexicanFoods);

console.log(italianFoods.isDisjointFrom(mexicanFoods));
*/

/*
//////////////////////////////////////
// Sets
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]); // Can hold mixed data types
console.log(ordersSet);
console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) {
  console.log(order);
}

//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
*/

/*
/////////////////////////////////////////////////
// Iterating through an object: Keys, Values
// property NAMES 
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  // console.log(day);
  openStr += `${day}, `;
}

console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
console.log(entries);

// [key, value]
for (const [key, {open, close}] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}.`);
}
*/
/*
/////////////////////////////////////////////////
// Optional Chaining Operator
if (restaurant.openingHours.mon){
  console.log(restaurant.openingHours.mon.open);
}
// console.log(restaurant.openingHours.mon.open);

// With optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

//Example
const days = ["mon", "tue", "wed", "thu", "fri", "sat"];
for (let day of days) {
  // console.log(day)
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}.`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist.');
console.log(restaurant.orderRizado?.(0, 1) ?? 'Method does not exist.');

// Arrays
const users = [{name: 'Jonas', email: 'hello@james.io', }];
// const users = [];

console.log(users[0]?.name ?? 'User Array empty');
*/
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
