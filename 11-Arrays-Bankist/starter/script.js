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
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
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

// Added
const containerTransfer = document.querySelector('.operation--transfer');
const containerClose = document.querySelector('.operation--close');
const containerLoan = document.querySelector('.operation--loan');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // .textcontent = ''
  const movs = movements.slice();
  if (sort) {
    movs.sort((a, b) => a - b);
  }
  movs.forEach(function (mov, i) {
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

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const netDeposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${netDeposits}€`;

  const netWithdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(netWithdrawals)}€`;

  const netIntrest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${netIntrest}€`;
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

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

let currentAccount;

// Event Handlers
btnLogin.addEventListener('click', function (e) {
  // Prevents form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const transferAmount = Number(inputTransferAmount.value);

  if (
    transferAmount > 0 &&
    transferAccount &&
    currentAccount.balance > transferAmount &&
    transferAccount.username != currentAccount.username
  ) {
    // Doing Transfer
    currentAccount.movements.push(-transferAmount);
    transferAccount.movements.push(transferAmount);
    if (document.querySelector('footer'))
      document.querySelector('footer').innerHTML = '';
    // Update UI
    updateUI(currentAccount);
  } else {
    const message = `
      <footer style="color: red;">* Invalid Account or Amount</footer>
    `;
    if (document.querySelector('footer'))
      document.querySelector('footer').innerHTML = '';
    containerTransfer.insertAdjacentHTML('beforeend', message);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount / 10)
  ) {
    currentAccount.movements.push(loanAmount);
    if (document.querySelector('footer'))
      document.querySelector('footer').innerHTML = '';
    updateUI(currentAccount);
  } else if (loanAmount <= 0) {
    const message = `
      <footer style="color: red;" id="valid">* Enter a Valid Amount</footer>
    `;
    if (document.querySelector('footer'))
      document.querySelectorAll('footer').innerHTML = '';
    containerLoan.insertAdjacentHTML('beforeend', message);
  } else {
    const message = `
      <footer style="color: red;" id="large">* Enter a Smaller Amount</footer>
    `;
    if (document.querySelector('footer'))
      document.querySelector('footer').innerHTML = '';
    containerLoan.insertAdjacentHTML('beforeend', message);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // const usernameIndex = accounts.findIndex(
  //   acc => acc.username === inputCloseUsername.value
  // );
  if (
    // usernameIndex != -1 &&
    inputCloseUsername.value === currentAccount.username &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    // Account Delete
    accounts.splice(
      accounts.find(acc => acc.username === currentAccount.username),
      1
    );
    // Hide UI / Log Out of account
    containerApp.style.opacity = 0;
  } else {
    const message = `
      <footer style="color: white;">* Invalid Username or PIN</footer>
    `;
    if (document.querySelector('footer'))
      document.querySelector('footer').innerHTML = '';
    containerClose.insertAdjacentHTML('beforeend', message);
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

let isSort = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !isSort);
  isSort = !isSort;
});

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
/*
//////////////////////////////////////////////////////////////////
// New FindLast and FindLastIndex

console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

console.log(
  `Your largest large movement was ${
    movements.length - movements.findLastIndex(mov => Math.abs(mov) > 1000)
  } movements ago`
);
*/
/*
////////////////////////////////////////////////////////////////
// Some and Every Methods

console.log(movements);
// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
const anyDeposits = movements.some(mov => mov > 0);
const anyDepositAbove = movements.some(mov => mov > 5000);

console.log(anyDepositAbove, anyDeposits);

// EVERY: CONDITION
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Seperate CallBack
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.filter(deposit));
console.log(account4.movements.every(deposit));
*/
/*
////////////////////////////////////////////////////////
// Flat and Flat Map (ES2019)

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
console.log(arrDeep.flat(1));
console.log(arrDeep.flat(2));
console.log(arrDeep.flat(3));

const countMovements = accounts
  .map(acc => acc.movements)
  .flat(1)
  .reduce((acc, cur) => acc + cur, 0);
console.log(countMovements);

const overallMovements = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(overallMovements);
*/
/*
//////////////////////////////////////////////////////////
// Challenge #5

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(function (dog) {
  dog.recFood = dog.weight ** 0.75 * 28;
});

console.log(dogs);

const sarahDog = dogs.filter(
  dog => dog.owners.findIndex(name => name === 'Sarah') >= 0
)[0];
// console.log(sarahDog);
// console.log(
//   sarahDog.curFood,
//   sarahDog.recFood,
//   sarahDog.curFood > sarahDog.recFood
// );
if (sarahDog.curFood > sarahDog.recFood) {
  console.log(`Dog is eating too much`);
} else if (sarahDog.curFood < sarahDog.recFood) {
  console.log('Dog is eating too little');
} else {
  console.log(`Dog is okay`);
}

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .map(dog => dog.owners)
  .flat();
console.log(ownersEatTooMuch);

const strHigh = ownersEatTooMuch.join(' and ') + "'s dogs eat too much!";
console.log(strHigh);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

const strLow = ownersEatTooLittle.join(' and ') + "'s dogs eat too little!";
console.log(strLow);

console.log(dogs.some(dog => dog.curFood === Number(dog.recFood)));
console.log(
  dogs.some(
    dog => dog.curFood >= 0.9 * dog.recFood && dog.curFood <= 1.1 * dog.recFood
  )
);

const okayDogs = dogs.filter(
  dog => dog.curFood >= 0.9 * dog.recFood && dog.curFood <= 1.1 * dog.recFood
);
console.log(okayDogs);

const dogsCopy = dogs.slice();
*/

///////////////////////////////////////////////
// Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/
/*
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

const huskyWeight = breeds.filter(dog => dog.breed === 'Husky')[0]
  .averageWeight;
const dogBothActivities = breeds.filter(
  dog =>
    dog.activities.findIndex(activity => activity === 'running') != -1 &&
    dog.activities.find(activity => activity === 'fetch') != -1
)[0].breed;
console.log(huskyWeight, dogBothActivities);
const allActivities = breeds.flatMap(dog => dog.activities);
console.log(allActivities);
const uniqueActivities = new Set(allActivities);
console.log(uniqueActivities);
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(dog => dog.activities.includes('swimming'))
      .flatMap(dog => dog.activities)
      .filter(act => act != 'swimming')
  ),
];
console.log(swimmingAdjacent);
console.log(breeds.every(dog => dog.averageWeight > 10));
console.log(breeds.some(dog => dog.activities.length >= 3));
const maxWeightBreed = Math.max(
  ...breeds
    .filter(
      dog => dog.activities.findIndex(activity => activity === 'fetch') != -1
    )
    .map(dog => dog.averageWeight)
);
console.log(maxWeightBreed);
*/
/*
////////////////////////////////////////////////////////////
// SORTING
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners);
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0 A, B
// return > 0 B, A

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);
// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
*/
/*
////////////////////////////////////////////////////
// Array Grouping (ES2024)

console.log(movements);

const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'Deposit' : 'Withdrawal'
);
console.log(groupedMovements);

const groupedByActivity = Object.groupBy(accounts, acc =>
  acc.movements.length >= 8
    ? 'very active'
    : acc.movements.length >= 4
    ? 'active'
    : acc.movements.length >= 1
    ? 'moderate'
    : 'inactive'
);
console.log(groupedByActivity);

// const groupedByTypes = Object.groupBy(accounts, acc => acc.type);
const groupedByTypes = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedByTypes);
*/
/*
////////////////////////////////////////////////////////////////
// Creating Arrays

console.log([1, 2, 3, 4, 5, 6]);
console.log(new Array(1, 2, 3, 4, 5, 6));

// Empty arr + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 0));
x.fill(1);
console.log(x);
x.fill(23, 1, 3);
console.log(x);

// Array.from()
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movementsUI);

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();

  // const movementsUI = Array.from(
  //   document.querySelectorAll('.movements__value')
  // );
  // console.log(movementsUI.map(el => el.textContent.replace('€', '')));

  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', '')
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});
*/
/*
///////////////////////////////////////////////////////////////////////////
// Methods that are destructive to non destructive alternatives

console.log(movements);
// const reversedMovements = movements.reverse();
const reversedMovements = movements.toReversed();
// const reversedMovements = movements.slice().reverse();
console.log(movements);
console.log(reversedMovements);

// toSorted (sort), toSpliced (splice)

// movements[1] = 2000;
const newMovements = movements.with(1, 2000);
console.log(newMovements);
console.log(movements);
*/
