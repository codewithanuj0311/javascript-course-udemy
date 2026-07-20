'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

let weekHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};


const restaurant = {
  name: 'Classico Italiano',
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },


  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery: function({starterIndex, mainIndex, time, address}) {
    console.log(`Order Received ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} on ${time} to ${address}`);
  },

  orderPasta: function(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with toppings of ${ing1}, ${ing2} and ${ing3}`);
  },
  orderPizza: function(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
    console.log(`Here is your pizza with the main ingredient as ${mainIngredient} and other toppings are as ${otherIngredients}`);
  }
};

restaurant.orderDelivery({
  time: "20:00",
  address: "Gurugram",
  starterIndex: 3,
  mainIndex: 2
})


let arr = [2,3,4];
let [x,y,z] = arr;
console.log(x,y,z);

//Switching the array elements
let [main, secondary] = restaurant.categories;
console.log(main, secondary);
[main, secondary] = [secondary, main];
console.log(main, secondary);

//Receivng the return values from the function
let [starter,mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Nested array
let arr1 = [2,3,[4,5]];
let [i,,[j,k]] = arr1;
console.log(i,j,k);

//Deafult value in destrucring
let [p=1,q=1,r=1] = [8,9];
console.log(p, q, r);

//Destructuring the objects

let {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

let {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

let {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);

let a = 111;
let b = 222;

let obj = {a:23, b:47, c:70};
({a,b} = obj);
console.log(a,b);

let {fri:{open:o,close:c}} = openingHours;
console.log(o,c);

//spread operator

let Arr = [1,2,3];
let newArr = [5,6, ...Arr];
console.log(newArr);


//shallowcopy and merging Doesn't change the parent values if changes are made in the child.
let mainMenuCopy = [...restaurant.mainMenu];
let mergedArr = [...restaurant.mainMenu, ...mainMenuCopy];
console.log(mergedArr);

let str = "JavaScript";
let letters = [...str, " ", 's'];
console.log(letters);

// let ingredients = [prompt("Let's choose 1st ingredient: "), prompt("Let's choose 2nd ingredient: "), prompt("Let's choose 3rd ingredient: ") ];
// restaurant.orderPasta(...ingredients);

let newRestaurant = {foundedIn: '1991', ...restaurant, foundedBy: 'Anuj'};
console.log(newRestaurant);

let restaurantCopy = {...restaurant};
restaurantCopy.name = "Hotel MCD";
console.log(restaurantCopy.name);
console.log(restaurant.name);

//Rest pattern

const [A, B, ...others] =  [1,2,3,4,5];
console.log(A, B, others);

let [P, Q, ...otherss] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(P, Q, otherss);

let {fri, ...weekends} = restaurant.openingHours;
console.log(fri, weekends);

//Rest arguements;

let add = function(...numbers) {
  console.log(numbers);
  let sum = 0;
  for(let i=0; i<numbers.length; i++) {
    sum = sum + numbers[i];
  }
  console.log(sum);
  
}
 add(3,4,5);

 restaurant.orderPizza('mushrooms', 'olives', 'onions', 'tomato');

 //short-circuiting

 console.log(10 || 'anuj');
 console.log(undefined ||  null || 0 || 'Hello' || 123);
 console.log(0 && null);

 restaurant.guests = 0;
 let guests = restaurant.guests || 10;
 console.log(guests);

 //nullish coalescing
 restaurant.number = 0;
 let anuj = restaurant.number ?? 30;
 console.log(anuj);

 //logical assignment operator

 let rest1 = {
  name: 'TAJ HOTEL',
  numberGuests: 20
 }

 let rest2 = {
  name: 'Ambani hotel',
  owner: 'Mukesh'
 }

 rest1.numberGuests ||= 30;
 rest2.numberGuests ||= 35;

 console.log(rest1);
 console.log(rest2);

 //for-of loop
 let menuu = [...restaurant.starterMenu, ...restaurant.mainMenu];
 for(let item of menuu) {
  console.log(item);
 }

 for(let [i, el] of menuu.entries()) {
  console.log(`${i + 1}: ${el}`);
 }

 //Enhanced object literals

 //optional chaining

 console.log(restaurant.openingHours.mon?.open); // checks whether mon exist or not

 let weekdays = ['mon', 'tue', 'wed', 'thu','fri', 'sat', 'sun'];
 for(let day of weekdays) {
  let openn = restaurant.openingHours[day]?.open;
  console.log(`We open on ${day} at ${openn}`);
 }

 //looping over objects

 for (let day of Object.keys(restaurant.openingHours)){
  console.log(day);
 }

 for (let value of Object.values(restaurant.openingHours)){
  console.log(value);
 }

 let enteries = Object.entries(restaurant.openingHours);
 console.log(enteries);

 for( let [key, {open,close}] of enteries){
  console.log(`we open on ${key} at ${open} and close at ${close}`);
 }

 //Sets

 let friends = new Set ([
  "Anuj",
  "Jay",
  "Jay",
  "Ravi",
  "Mayank",
  "Ravi"
 ]);

 let newFriends = new Set ([
  "Abhishek",
  "Jayant",
  "Jayant",
  "Abhishek",
  "Mayan",
  "Ravindra"
 ])

 console.log(friends);
 console.log(friends.size);
 console.log(friends.add('Karthik'));
 console.log(friends.has('Jayant'));
 console.log(friends);

 //looping over sets
 for (let order of friends) {
  console.log(order);
 }

 let staff = ["Manager", "chef", "Waiter", "chef", "Manager", "Waiter"];
 let staffUnique = [...new Set (staff)]; // assigning all the unique values from set to create an array
 console.log(staffUnique);
 

 let italianFoods = new Set ([
  "Pasta",
  "Gnoci",
  "Olive oil",
  "Tomatoes",
  "Garlic",
  "Basil"
 ]);

 let mexicanFoods = new Set ([
  "Tortillas",
  "Beans",
  "Rice",
  "Tomatoes",
  "Avocado",
  "Garlic"
 ])

 let commonFoods = italianFoods.intersection(mexicanFoods);
 console.log(commonFoods);

 let fusion = italianFoods.union(mexicanFoods);
 console.log(fusion);

 //Maps

 let user = new Map();
 user.set("name", "Anuj");
 user.set(1, "Number type");
 console.log(user);
 console.log(user.get('name'));

 let userData = new Map ([
  [1, "a"],
  [2, "b"],
  [3, "c"],
  [4, "d"],
 ]);

 console.log(userData.get(1));

 for (let [key, value] of userData){
  if (typeof key === 'number')
  console.log(`Options ${key}: ${value}`);

 }

 //Strings part-1

 let airline = "Air Tap Indigo";
 console.log(airline[0]);
 console.log(airline.slice(4));
 console.log(airline.slice(airline.lastIndexOf('i')));

 let checkingMiddleSeat = function(seats) {
  let s = seats.slice(-1);
  if ( s === 'B' || s === 'E') console.log('It is a middle seat');
  else {
    console.log('Not a middle seat');
  }
   
 }

 checkingMiddleSeat('11B');
 checkingMiddleSeat('3D');
 checkingMiddleSeat('9C');

 //Strings part-2

 let myName = "JonAS";
 let smallerName = myName.toLowerCase();
 let correctName = myName[0].toUpperCase() + smallerName.slice(1);
 console.log(correctName);

 let email = "hello@gamil.io";
 let loginEmail = " Hello@Gamil.Io \n";
 console.log(loginEmail.toLowerCase().trim());

 console.log(myName.replace('J', 'A'));
 
 let completeName = "Anuj Raj";
 console.log(completeName.replaceAll('j', 'p'));

 //String part-3
let completeName2 = "Anuj+Raj+Dixit+Singh+Sharma";
console.log(completeName2.split('+'));

let [firstName, lastName] = completeName2.split('+');
let newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

let capitalizeName = function(name){
  let names = name.split(' ');
  let newNameArr = [];
  for( let n of names){
   newNameArr.push(n[0].toUpperCase() + n.slice(1));
  }
  return newNameArr;

}

console.log(capitalizeName('anuj Raj jessica jay Bhagyam'));

let string1 = "Anuj";
console.log(string1.padStart(10, '+'));

let string2 = "Anuj";
console.log(string2.padEnd(10, '+'));
