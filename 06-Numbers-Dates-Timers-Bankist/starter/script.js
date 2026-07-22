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
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  //Combining the movement and date array
  const combinedMovsDate = acc.movements.map((mov, i)=> {
    return ({movement: mov, movDate:acc.movementsDates.at(i)});
  })

  if(sort) {
    combinedMovsDate.sort((a, b)=> {
    return (a.movement - b.movement);
  })
}


function daysPassed(date1, date2) {
  let days = Math.round(Math.abs((date1-date2))/(24*60*60*1000))
  return days
}

combinedMovsDate.forEach(function (obj, i) {
    const {movement, movDate} = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';


    const now = new Date();
    const date = new Date(movDate);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth()+1}`.padStart(2, 0);
    const year = date.getFullYear();
    let displayDate;

    let days = daysPassed(now, date);
    console.log(days);
    
    if(days === 0){
      displayDate = 'Today';
    } else if(days === 1){
      displayDate = 'Yesterday'
    } else {
      displayDate = `${days} days ago`
    }

    const options = {
      style: 'currency',
      currency: acc.currency
    }

    const formatedMov = new Intl.NumberFormat(acc.locale, options).format(movement);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  const formatedBal = new Intl.NumberFormat(acc.locale, {style: 'currency', currency: acc.currency}).format(acc.balance);

  labelBalance.textContent = `${formatedBal}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${ new Intl.NumberFormat(acc.locale, {style: 'currency', currency: acc.currency}).format(incomes)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${new Intl.NumberFormat(acc.locale, {style: 'currency', currency: acc.currency}).format(Math.abs(out))}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${new Intl.NumberFormat(acc.locale, {style: 'currency', currency: acc.currency}).format(interest)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

const startTimer = function () {
  let time = 300;
  const tick = function () {
    let min = String(Math.trunc(time/60)).padStart(2, 0);
    let sec = String(time%60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`
    if(time == 0){
        clearInterval(startTimer);
        containerApp.style.opacity = '0';
        labelWelcome.textContent = `Log in to get started`;
    }
    time--
  }
  
 
  tick();
   const timer = setInterval(tick, 1000);
   return timer;
}

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();


  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Display date
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth()+1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hours = `${now.getHours()}`.padStart(2, 0);
    // const mins = `${now.getMinutes()}`.padStart(2, 0);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }

    const locale = currentAccount.locale;
    
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    if(timer) clearInterval(timer);
    timer = startTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Display the date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    clearInterval(timer);
    timer = startTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function(){
      currentAccount.movements.push(amount);

      //Display date
      currentAccount.movementsDates.push(new Date().toISOString());
  
      // Update UI
      updateUI(currentAccount);
    }, 3000);

    clearInterval(timer);
    timer = startTimer();

    
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});











/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//conversion to number from string
console.log(Number('24'));
console.log(+'23');

//parsing
console.log(Number.parseInt('30px'));

//Number.isNan

console.log(Number.isNaN(30));
console.log(Number.isNaN('34px'));
console.log(Number.isNaN(+'30p'));

//checking if value is a number or not

console.log(Number.isFinite('30'));
console.log(Number.isFinite(30));

console.log(Math.sqrt(3));

//Creating a random number between min & max

const randomInt = function(min, max) {
  console.log(Math.floor(Math.random()*(max-min+1)) + min);
}

randomInt(30, 60);

//tofixed method returns string
console.log((2.7).toFixed(5));

//Remainder operator
const isEven = (num)=> {
  return num%2 === 0;
}
console.log(isEven(24));

//Numeric Separator
const price = 234_34;
console.log(price);

//Crating a date

let now1 = new Date();
console.log(now1);
console.log(new Date(2025,10,13));

const future = new Date('Nov 13 2025 ');
const future1 = new Date('OCt 23 2025');

console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());

//setTimeout and setInterval functions
setTimeout(()=> {
  console.log('Your pizza is ordered in 10 seconds')
}, 10000);

let count = 0;

// setInterval(()=> {
//   count++;
//   console.log(count);
// }, 1000);




