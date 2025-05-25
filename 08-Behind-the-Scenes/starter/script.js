'use strict';

function calcAge(birthYear) {
    const age = 2037 - birthYear;
    
    function printAge () {
        let output = `${firstName}, You are ${age}, born in ${birthYear}`;
        console.log(output);

        if (birthYear >= 1981 && birthYear <= 1996) {
            var millinial = true;
            const firstName = 'Steven';
            const str = `Oh, and you're a millinial, ${firstName}`;
            console.log(str);

            function add(a, b) {
                return a + b;
            }

            output = 'NEW OUTPUT!';
        }
        // console.log(str);
        console.log(millinial);
        // add(2,3) //For sctrict mode it is also block made
        console.log(output);
    }
    printAge();

    return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age);
// printAge();