'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2025-06-11T23:36:17.929Z',
    '2025-06-16T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const generateDisplayDate = function (date, locale) {
  const displayDate = new Date(date);
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(displayDate, new Date());
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(displayDate);
  // return `${`${displayDate.getDate()}`.padStart(2, 0)}/${`${
  //   displayDate.getMonth() + 1
  // }`.padStart(2, 0)}/${displayDate.getFullYear()}`;
};

const formatMovements = function (amount, locale, currency) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    amount.toFixed(2)
  );
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  // .textcontent = ''

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    mov,
    date: acc.movementsDates.at(i),
  }));

  // const movs = acc.movements.slice();
  if (sort) {
    combinedMovsDates.sort((a, b) => a.mov - b.mov);
  }
  combinedMovsDates.forEach(function (movement, i) {
    const { mov, date } = movement;
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const displayStr = generateDisplayDate(date, acc.locale);
    const displatMov = formatMovements(mov, acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayStr}</div>
        <div class="movements__value">${displatMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formatMovements(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const netDeposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatMovements(
    netDeposits,
    acc.locale,
    acc.currency
  );
  // labelSumIn.textContent = `${netDeposits.toFixed(2)}€`;

  const netWithdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatMovements(
    Math.abs(netWithdrawals),
    acc.locale,
    acc.currency
  );
  // labelSumOut.textContent = `${Math.abs(netWithdrawals).toFixed(2)}€`;

  const netIntrest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatMovements(
    netIntrest,
    acc.locale,
    acc.currency
  );
  // labelSumInterest.textContent = `${netIntrest.toFixed(2)}€`;
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

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

/////////////////////////////////////////////////////////////
// Event Handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// Experimentation
// const now = new Date();

btnLogin.addEventListener('click', function (e) {
  // Prevents form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create the Current Date at the time of Login
    const currDate = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(currDate);
    // labelDate.textContent = `${`${currDate.getDate()}`.padStart(2, 0)}/${`${
    //   currDate.getMonth() + 1
    // }`.padStart(
    //   2,
    //   0
    // )}/${currDate.getFullYear()}, ${`${currDate.getHours()}`.padStart(
    //   2,
    //   0
    // )}:${`${currDate.getMinutes()}`.padStart(2, 0)}`;

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
  const transferAmount = +inputTransferAmount.value;

  if (
    transferAmount > 0 &&
    transferAccount &&
    currentAccount.balance > transferAmount &&
    transferAccount.username != currentAccount.username
  ) {
    // Doing Transfer
    currentAccount.movements.push(-transferAmount);
    transferAccount.movements.push(transferAmount);
    currentAccount.movementsDates.push(new Date().toISOString());
    transferAccount.movementsDates.push(new Date().toISOString());
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

  const loanAmount = Math.floor(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount / 10)
  ) {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date().toISOString());
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
    currentAccount.pin === +inputClosePin.value
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

  displayMovements(currentAccount, !isSort);
  isSort = !isSort;
});

// const displayMovements = function (movements, sort = false) {
//   containerMovements.innerHTML = '';

//   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';

//     const html = `
//       <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//         <div class="movements__value">${mov}€</div>
//       </div>
//     `;

//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };

// const calcDisplayBalance = function (acc) {
//   acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
//   labelBalance.textContent = `${acc.balance}€`;
// };

// const calcDisplaySummary = function (acc) {
//   const incomes = acc.movements
//     .filter(mov => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumIn.textContent = `${incomes}€`;

//   const out = acc.movements
//     .filter(mov => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumOut.textContent = `${Math.abs(out)}€`;

//   const interest = acc.movements
//     .filter(mov => mov > 0)
//     .map(deposit => (deposit * acc.interestRate) / 100)
//     .filter((int, i, arr) => {
//       // console.log(arr);
//       return int >= 1;
//     })
//     .reduce((acc, int) => acc + int, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };

// const createUsernames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//   });
// };
// createUsernames(accounts);

// const updateUI = function (acc) {
//   // Display movements
//   displayMovements(acc.movements);

//   // Display balance
//   calcDisplayBalance(acc);

//   // Display summary
//   calcDisplaySummary(acc);
// };

// ///////////////////////////////////////
// // Event handlers
// let currentAccount;

// btnLogin.addEventListener('click', function (e) {
//   // Prevent form from submitting
//   e.preventDefault();

//   currentAccount = accounts.find(
//     acc => acc.username === inputLoginUsername.value
//   );
//   console.log(currentAccount);

//   if (currentAccount?.pin === +(inputLoginPin.value)) {
//     // Display UI and message
//     labelWelcome.textContent = `Welcome back, ${
//       currentAccount.owner.split(' ')[0]
//     }`;
//     containerApp.style.opacity = 100;

//     // Clear input fields
//     inputLoginUsername.value = inputLoginPin.value = '';
//     inputLoginPin.blur();

//     // Update UI
//     updateUI(currentAccount);
//   }
// });

// btnTransfer.addEventListener('click', function (e) {
//   e.preventDefault();
//   const amount = +(inputTransferAmount.value);
//   const receiverAcc = accounts.find(
//     acc => acc.username === inputTransferTo.value
//   );
//   inputTransferAmount.value = inputTransferTo.value = '';

//   if (
//     amount > 0 &&
//     receiverAcc &&
//     currentAccount.balance >= amount &&
//     receiverAcc?.username !== currentAccount.username
//   ) {
//     // Doing the transfer
//     currentAccount.movements.push(-amount);
//     receiverAcc.movements.push(amount);

//     // Update UI
//     updateUI(currentAccount);
//   }
// });

// btnLoan.addEventListener('click', function (e) {
//   e.preventDefault();

//   const amount = +(inputLoanAmount.value);

//   if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
//     // Add movement
//     currentAccount.movements.push(amount);

//     // Update UI
//     updateUI(currentAccount);
//   }
//   inputLoanAmount.value = '';
// });

// btnClose.addEventListener('click', function (e) {
//   e.preventDefault();

//   if (
//     inputCloseUsername.value === currentAccount.username &&
//     +(inputClosePin.value) === currentAccount.pin
//   ) {
//     const index = accounts.findIndex(
//       acc => acc.username === currentAccount.username
//     );
//     console.log(index);
//     // .indexOf(23)

//     // Delete account
//     accounts.splice(index, 1);

//     // Hide UI
//     containerApp.style.opacity = 0;
//   }

//   inputCloseUsername.value = inputClosePin.value = '';
// });

// let sorted = false;
// btnSort.addEventListener('click', function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, !sorted);
//   sorted = !sorted;
// });

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
/////////////////////////////////////////////////
// Methods on numbers
console.log(23 === 23.0);

// Base 10 - 0 to 9 1/10 = 0.1 10/3 = 3.333333
// Binary - Base 2 - 0, 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('30px', 4));
console.log(Number.parseInt('e30px'));

console.log(Number.parseInt('      2.5rem         '));
console.log(Number.parseFloat('           2.5rem   '));

// console.log(parseFloat('2.5rem'));

// If value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

// Checking if value if finite
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));

// Checking if integer
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger('23'));
*/
/*
//////////////////////////////////////////////////////////
// Math and rounding

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 758, 9897, 7, 456));
console.log(Math.max(5, 758, '9897', 7, 456));
console.log(Math.max(5, 758, '9897px', 7, 456));

console.log(Math.min(5, 18, 23, 11, 2));
console.log(Math.min(5, 18, 23, 11, '2'));
console.log(Math.min(5, 18, 23, 11, '2px'));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.random());

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
// console.log(randomInt(0, 3));
// console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.round(23.9));
console.log(Math.round(23.3));

console.log(Math.ceil(23.9));
console.log(Math.ceil(23.3));

console.log(Math.floor(23.9));
console.log(Math.floor('23.3'));

// Same for positive but not negative
console.log(Math.trunc(23.3));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// Rounding Decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
*/
/*
//////////////////////////////////////////////////
// Remainder Operator

console.log(5 % 2);
console.log(5 / 2);

console.log(8 % 3);
console.log(8 / 3);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();
  [...document.querySelectorAll('.movements__row')].forEach(function (r, i) {
    if (i % 2 === 0) r.style.backgroundColor = 'orangered';
    if (i % 3 === 0) r.style.backgroundColor = 'blue';
  });
});
*/
/*
////////////////////////////////////////////////////////////////////////
// Numeric Serperators (ES 2021)

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

// const PI = 3._1415;
// const PI = 3.1415_;
// const PI = _3.1415;
// const PI = 3.14__15;
const PI = 3.1415;
console.log(PI);

console.log(Number('230_000'));
console.log(Number.parseInt('230_000'));
*/
/*
/////////////////////////////////////////////////////
// BIGINT (ES 2020)

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4654841650324168153103568541855313n);
console.log(BigInt(4654841650324));

// Operations
console.log(10000n + 10000n);
console.log(354115154163812316384165n * 10000000000n);

const huge = 2520524816312168n;
const num = 23;
console.log(huge * BigInt(num));
// console.log(Math.sqrt(16n));

// Exceptions Logical operator and string concatinations
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');

console.log(huge + 'is REALLY big!!!');

// Divisions
console.log(11n / 3n);
console.log(10 / 3);
*/
/*
//////////////////////////////////////////////////////////
// Dates

// Create a Date
const now = new Date();
console.log(now);

console.log(new Date('Jun 17 2025 11:27:46'));
console.log(new Date('Dec 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 27, 15, 100));
console.log(new Date(2037, 10, 33));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142237180000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);
*/
/*
///////////////////////////////////////////
// Operations with Dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1));

console.log(
  calcDaysPassed(new Date(2037, 3, 14, 10, 4), new Date(2037, 3, 4)) /
    (1000 * 60 * 60 * 24)
);
*/

const num = 3884764.23;

const options = {
  style: 'currency', // Currency, Unit, Percent
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};

console.log(`US:      ${new Intl.NumberFormat('en-US', options).format(num)}`);
console.log(`Germany: ${new Intl.NumberFormat('de-DE', options).format(num)}`);
console.log(`Seria:   ${new Intl.NumberFormat('ar-SY', options).format(num)}`);
console.log(
  `${navigator.language}: ${new Intl.NumberFormat(
    navigator.language,
    options
  ).format(num)}`
);
console.log(`India:   ${new Intl.NumberFormat('en-IN', options).format(num)}`);
