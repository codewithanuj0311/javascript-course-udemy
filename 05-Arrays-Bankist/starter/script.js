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

let currentAccount;

//Display Movements 
const displayMovements = function(movements, sort = false){
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a,b)=> {
    return a-b;
  }) : movements;

  movs.forEach((mov, i)=> {
    const type = mov > 0 ? 'deposit': 'withdrawal';
    const html = `
     <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type.toUpperCase()}</div>
      <div class="movements__value">${mov}₹</div>
     </div>
  `
  containerMovements.insertAdjacentHTML("afterbegin", html);
  })
}


//Calculate and Print Balance
const calcDisplayBalance = function(accs) {
  let movements = accs.movements;
  const balance =  movements.reduce((acc, curr)=> {
     return acc+curr;
   }, 0);
   labelBalance.textContent = `${balance}₹`;
   accs.balance = balance;
 }
 

 //Calculate and Display Summary
 const calcDisplaySummary = function(accs) {
  let movements = accs.movements;
  let interestVal = accs.interestRate;
    //calc income
    const incomes = movements.filter((mov)=> {
      return mov > 0;
    }).reduce((acc, mov)=> {
      return acc+mov;
    }, 0);

    labelSumIn.textContent = `${incomes}₹`;

    //calc outcome
    const outcomes = movements.filter((mov)=> {
      return mov < 0;
    }).reduce((acc, mov)=> {
      return acc+mov;
    }, 0)

    labelSumOut.textContent = `${Math.abs(outcomes)}₹`;

    //calc interest
    const interest = movements.filter((mov)=> {
      return mov > 0;
    }).map((mov)=> {
      return mov * interestVal/100;
    }).filter((mov)=> {
      return mov >= 1;
    }).reduce((acc, mov)=> {
      return acc+mov;
    }, 0)

    labelSumInterest.textContent = `${interest}₹`;
 }
 

//Create Usernames
const createUsernames = function(accs) {
  accs.forEach((acc)=> {
   acc.username = acc.owner.toLowerCase().split(' ').map((val)=> {
      return val[0];
    }).join('');

  })
}
createUsernames(accounts);

//Update UI function
const updateUI = function(acc) {

  //Display balance
  calcDisplayBalance(acc);

  //Display movements
  displayMovements(acc.movements);

  //Display summary
  calcDisplaySummary(acc);

}


//Implementing Login
btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  currentAccount = accounts.find((acc)=> {
    return acc.username === inputLoginUsername.value;
  })

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    //Display UI message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`;
    containerApp.style.opacity = '100';

    //Update UI
    updateUI(currentAccount);
  }

})


//Implementing transfer logic
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const receiverAccount = accounts.find((acc)=> {
    return acc.username === inputTransferTo.value;
  })

  if(receiverAccount && 
    receiverAccount.username !== currentAccount.username && 
    amount > 0 && currentAccount.balance >= amount) {
    
    //Doing transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

})


//Implementing loan logic
btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  if(loanAmount > 0 && 
    currentAccount.movements.some((mov)=> {
    return mov >= loanAmount*0.1; })) {

    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);

  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
})


//Implementing close account logic
btnClose.addEventListener('click', function(e){
  e.preventDefault();

  if(inputCloseUsername.value  === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const deleteAccIndex = accounts.findIndex((acc)=> {
      return acc.username === currentAccount.username;
    })

    accounts.splice(deleteAccIndex, 1);
    containerApp.style.opacity = '0';
  }

  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
  inputCloseUsername.blur();

})

let sorted = false;

//Implementing movement sort logic
btnSort.addEventListener('click', function(){
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// //SLICE
// let arr = ['a','b','c', 'd', 'e'];
// arr.slice(2) //returns a new array from the begin index including 
// console.log(arr.slice(2));
// console.log(arr.slice(2,4)); //here the last index does not get included

// //SPLICE
// // console.log(arr.splice(2));  //removes array element star and deleteCount
// console.log(arr.splice(-1));
// console.log(arr);

// //REVERSE
// let arr2 = ['i','u', 't', 'u', 'd'];
// console.log(arr2.reverse()); //does mutate the aaray

// //CONCAT

// let letters = arr.concat(arr2);
// console.log(letters); //does not mutate the original array

// //JOIN
// console.log(letters.join('-'));

// //At method
// let arr1 = [23,45,56];
// console.log(arr1.at(0));
// console.log(arr1.at(-1));


/////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const move of movements) {
//   if(move > 0) 
//   console.log(`you deposited ${move} rs.`);
//  else
//   console.log(`you withdrew ${Math.abs(move)} rs`);
// }''


// for(const [i, move] of movements.entries()) {
//   if(move > 0) 
//   console.log(`movement ${i+1}: you deposited ${move} rs.`);
//   else
//   console.log(`movement ${i+1}: you withdrew ${Math.abs(move)} rs`);
// }

// console.log('-------------FOREACH---------------');
// movements.forEach((mov,i)=> {
//   if(mov>0) {
//     console.log(`movement ${i+1}: you deposited ${mov} rs.`);
//   } else {
//     console.log(`movement ${i+1}: you withdrew ${Math.abs(mov)} rs`);
//   }
// })

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((value, key, map) => {
//   console.log(`Key ${key}: ${value}`);
// })

// const movementsUSD = movements.map((mov)=> {
//   return mov*1.1;
// });

// console.log(movementsUSD);

//Filter function
const filterMov = movements.filter((mov)=> {
  return mov>0;
})

console.log(filterMov);

//Reduce function
const balance = movements.reduce((acc, curr) => {
    return acc + curr;
}, 0);

//Some function
const movPositive = movements.some((mov)=> {
  return mov>0;
})

console.log(movPositive);
console.log(movements);

//Array Grouping
let groups = Object.groupBy(movements, (mov)=> {
  return mov > 0 ? 'deposit' : 'withdrawal';
})
console.log(groups);

//Array creation

const arr = [1,2,3,4,5,6,7];
console.log(arr.fill(23, 2, 6));

const arr1 = new Array(10);
console.log(arr1);
  
  //Array.from
 const dynamicArray = Array.from({length:10}, ()=> {
  return 10;
 })

 console.log(dynamicArray);

 //Non destructive methods which do not mutate the original array
 //toReversed(), toSorted(), toSpliced()

 console.log(movements);

 console.log(movements.toReversed());
 console.log(movements);

 







