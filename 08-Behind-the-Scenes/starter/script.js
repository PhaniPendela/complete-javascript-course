'use strict';

// function calcAge(birthYear) {
//     const age = 2037 - birthYear;
    
//     function printAge () {
//         let output = `${firstName}, You are ${age}, born in ${birthYear}`;
//         console.log(output);

//         if (birthYear >= 1981 && birthYear <= 1996) {
//             var millinial = true;
//             const firstName = 'Steven';
//             const str = `Oh, and you're a millinial, ${firstName}`;
//             console.log(str);

//             function add(a, b) {
//                 return a + b;
//             }

//             output = 'NEW OUTPUT!';
//         }
//         // console.log(str);
//         console.log(millinial);
//         // add(2,3) //For sctrict mode it is also block made
//         console.log(output);
//     }
//     printAge();

//     return age;
// }

// const firstName = 'Jonas';
// calcAge(1991);
// // console.log(age);
// // printAge();
/*
//Variables
console.log(me);
// console.log(job);
// console.log(year);

var me = 'jons';
let job = 'teacher';
const year = 1991;

// Functions

console.log(addDecl(2,3));
// console.log(addExpr(2,3));
// console.log(addArrow(2,3));

function addDecl(a,b) {
    return a+b;
}

var addExpr = function (a, b) {
    return a + b;
}

var addArrow = (a, b) => {
    return a + b;
}

// Example

if(!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart () {
    console.log('All Products deleted!');
}

// Global Window

var x = 1; //Creates property on global window
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.Z);
*/
/*
console.log(this);
const calcAge = function (birthYear) {
    console.log(2037 - birthYear);
    console.log(this);
} //No owner
calcAge(1991);

const calcAgeArrow = (birthYear) => {
    console.log(2037 - birthYear);
    console.log(this);
} // Parent Scope
calcAgeArrow(1980);

const jonas = {
    year: 1991,
    calcAge: function() {
        console.log(this);
        console.log(2037 - this.year);
    },
};

jonas.calcAge();

const malinda = {
    year: 2017,
};

malinda.calcAge = jonas.calcAge;
malinda.calcAge();

const f = jonas.calcAge;
f(); //Becomes a regular function
*/
/*
const jonas = {
    firstName: 'Jonas',
    year: 1991,
    calcAge: function() {
        // console.log(this);
        console.log(2037 - this.year);

        //Solution 1

        // const self = this; //self or that
        // const isMillenial = function () {
        //     console.log(self);
        //     console.log(self.year >= 1981 && self.year <= 1996);
        // }

        //Solution 2

        const isMillenial = () => {
            console.log(this); // From parent scope for arrow function
            console.log(this.year >= 1981 && this.year <= 1996);
        }

        isMillenial();
    },

    greet: () => {
        console.log(`Hey ${this.firstName}`);
    }, // Never use arrow functions as methods
};

jonas.greet();
jonas.calcAge();

//arguments keyword

const addExpr = function (a, b) {
    console.log(arguments);
    return a + b;
};

addExpr(2,5);
addExpr(2,3,4,5);

var addArrow = () => {
    console.log(arguments);
    return a + b;
}
addArrow(2, 5, 8);
*/

// Object reference

const jessica1 = {
    firstName: 'jessica',
    lastName: 'Williams',
    age: 27,
};

function marryPerson (originalPerson, newLastName) {
    originalPerson.lastName = newLastName;
    return originalPerson;
} // Objects are passed by reference

const marriedJessica = marryPerson(jessica1, 'Davis');

// const marriedJessica = jessica1;
// marriedJessica.lastName = 'Davis';

console.log('Berfore: ', jessica1);
console.log('After: ', marriedJessica);

// jessica = {x:30,}; // Error as its a const
// jessica.age = 30;

const jessica = {
    firstName: 'jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bob'], //Only holds reference not the actual value
};

// Shallow Copy
const jessicaCopy = { ...jessica }; //ACTUALLY Copy
jessicaCopy.lastName = 'Davis';

console.log(jessica, jessicaCopy);
// jessicaCopy.family.push('Mary');
// jessicaCopy.family.push('John');

// console.log('Berfore: ', jessica);
// console.log('After: ', jessicaCopy);

// Deep Copy
const jessicaClone = structuredClone(jessica);
jessicaClone.family.push('Mary');
jessicaClone.family.push('John');

console.log('Original: ', jessica);
console.log('Clone: ', jessicaClone);
