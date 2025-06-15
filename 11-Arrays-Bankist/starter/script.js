'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  // .textcontent = ''

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};

calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const netDeposits = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${netDeposits}€`;

  const netWithdrawals = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(netWithdrawals)}€`;

  const netIntrest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${netIntrest}€`;
};

calcDisplaySummary(account1.movements);

const computeUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

computeUsernames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
/////////////////////////////////////////////////
// Simple Array Methods
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());

// SPLICE
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

// CONCAT
console.log(arr.concat(arr2));

// JOIN
const letters = arr.concat(arr2);
console.log(letters.join('-'));
*/
/*
////////////////////////////////////////
// New Method in ES2022
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// Getting last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
*/
/*
////////////////////////////////////////////////////////////////////
// FOR EACH AND FOR OD Loop
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(
      `Movement ${i + 1}: You diposited ${movement} amount in the bank.`
    );
  } else {
    console.log(
      `Movement ${i + 1}: You withdrew ${Math.abs(
        movement
      )} amount from the bank.`
    );
  }
}
console.log(`-----------------FOR EACH--------------------`);
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You diposited ${mov} amount in the bank.`);
  } else {
    console.log(
      `Movement ${i + 1}: You withdrew ${Math.abs(mov)} amount from the bank.`
    );
  }
});
*/
/*
///////////////////////////////////////////
// FOREACH for MAPS AND SETS
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, mpp) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'USD', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/
/*
///////////////////////////////////////////////////////////////////////
// Challenge #1

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);
  const dogs = [...dogsJuliaCorrected, ...dogsKate];
  dogs.forEach(function (age, i) {
    const str = `Dog number ${i + 1} is ${
      age > 3 ? `an adult, and is ${age} years old` : `still a puppy 🐶`
    }`;
    console.log(str);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/
/*
/////////////////////////////////////////////////////////////////////////
// MAP Method on Arrays
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

let movementsUSDfor = [];

for (let mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}

console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(
      mov
    )} amount from the bank.`
);

console.log(movementsDescriptions);
*/
/*
//////////////////////////////////////////////////////////////////////////////////
// Filter Methods in arrays

const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);

const depositsFor = [];

for (const mov of movements) {
  if (mov > 0) depositsFor.push(mov);
}

console.log(depositsFor);

const withdrawals = movements.filter(val => val < 0);
console.log(withdrawals);
*/
/*
////////////////////////////////////////////////////////////////////
// REDUCE Method on arrays
// ACCUMULATOR => Snowball
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i + 1}: ${acc}`);
//   return acc + cur;
// }, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balanceFor = 0;
for (const mov of movements) {
  balanceFor += mov;
}

console.log(balanceFor);

// Maximum value of array
const maximum = movements.reduce((acc, cur) => {
  if (acc < cur) {
    return cur;
  } else {
    return acc;
  }
}, movements[0]);

console.log(maximum);
*/
/*
///////////////////////////////////////////////////////////////
// CHALLENGE #2

const calcAverageHumanAge = function (ages) {
  return ages
    .map(age => {
      if (age > 2) {
        return 16 + age * 4;
      } else {
        return age * 2;
      }
    })
    .filter(age => age >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
/*
///////////////////////////////////////////////////////////
// Pipelining
const eurToUsd = 1.1;
console.log(movements);

// PIPELINE
const balanceUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(balanceUSD);
*/
/*
///////////////////////////////////////////////////////////
// FIND Method on arrays

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

let accountFor = undefined;
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    accountFor = acc;
    break;
  }
}
console.log(accountFor);
*/
