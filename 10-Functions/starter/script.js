'use strict';

/*
///////////////////////////////////////////////////
// Default Params
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 299;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);
*/
/*
/////////////////////////////////////////////
// Reference vs value arguments
const flight = 'LH234';
const jonas = {
  name: 'Jonas',
  passport: 24756456412,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 24756456412) {
    alert('Checked in');
  } else {
    alert('Wrong Passport');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);
*/
/*
///////////////////////////////////////////////////////
// Call Back Functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...otherWords] = str.split(' ');
  return [firstWord.toUpperCase(), ...otherWords].join(' ');
};

// Higher Order Function
const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed String: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS always uses callback all the time
const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);
*/
/*
///////////////////////////////////////////////////////
// Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Steven');

// Challenge
// const greetArrow = greeting => {
//   return name => {
//     console.log(`${greeting} ${name}`);
//   };
// };

//Option 2
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

const greetHelloArrow = greetArrow('Hello');
greetHelloArrow('PhaniP');
*/
/*
////////////////////////////////////////////////////////////////
// Manipulating this keyword (call, apply, bind)
const lufthansa = {
  airline: 'Lufthansa',
  iatacode: 'LH',
  bookings: [],
  // book: function () {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iatacode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'PhaniP');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iatacode: 'EW',
  bookings: [],
  // book(flightNum, name) {
  //   console.log(
  //     `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`
  //   );
  //   this.bookings.push({ flight: `${this.iatacode}${flightNum}`, name });
  // },
};

const book = lufthansa.book;

// Doesnot work
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: `swiss Air Lines`,
  iatacode: 'LX',
  bookings: [],
};

book.call(swiss, 63, 'Mary Cooper');
console.log(swiss);

// Apply Method
const flightData = [538, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// Bind Method
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Phani P');
bookEW23('Martha Cooper');
console.log(eurowings);

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial Application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(200));

// Challenge
const addTAXRateArrow = rate => value => value + value * rate;

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTAXReturn(0.23);
console.log(addVAT2(200));
*/
/*
////////////////////////////////////////////////////////////////////////////////////////
// Challenge #1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const newAnswer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    // console.log(typeof newAnswer);
    newAnswer >= 0 && newAnswer <= 3
      ? this.answers[newAnswer]++
      : console.log('Enter Valid Input');
    this.displayResults('array');
    // Bonus Part
    // this.displayResults.bind(window)('array');
  },
  displayResults(type) {
    if (type == 'string') {
      console.log(`Poll results are ${[...this.answers]}`);
    } else if (type == 'array') {
      console.log(this.answers);
    }
  },
};

// poll.registerNewAnswer();
// console.log(poll.answers);
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// Bonus Part Data
// var testData1 = [5, 2, 3];
// var answers = [1, 5, 3, 9, 6, 1];
*/
/*
////////////////////////////////////////////////////////////////////////////
// Immediately Invoked Function Expression

const runOnce = function () {
  console.log('This will never run again!');
};

runOnce();
// IIFE
(function () {
  console.log('This will never run again!');
  const isPrivate = 23;
})();
// console.log(isPrivate);
// Arrow Function
(() => console.log(`This will never run again!`))();
{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);
*/
/*
/////////////////////////////////////////////
// Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);
*/
/*
////////////////////////////////////////
// Closures Examples
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning the second function to f
h();
f();

console.dir(f);

// Example 2
const boardPassengers = function (numPassengers, wait) {
  const perGroup = numPassengers / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${numPassengers} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// setTimeout(function () {
//   console.log('TIMER');
// }, 1000);

const perGroup = 1000;
boardPassengers(180, 3);
*/
/*
/////////////////////////////////////////////////////////////////////
// Challenge 2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
*/
