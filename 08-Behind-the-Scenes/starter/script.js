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