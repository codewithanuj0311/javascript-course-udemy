'use strict';

const Person = function(firstName, birthYear) {
    //instance properties
    this.name = firstName,
    this.year = birthYear

    //Never to this because this will add this method for each object created
    // this.calcAge = function() {
    //     console.log(2025-this.birthYear);
    // }


}

const anuj = new Person('Anuj', 1998);
const jay = new Person('Jay', 1999);
const aman = new Person('Aman', 2000);
console.log(anuj, jay, aman);

//Prototypes

Person.prototype.calcAge = function() { //every object created from constructor function has the access to all the prototype properties 
    console.log(2025-this.year);
}

anuj.calcAge();

Person.prototype.role = 'Human';
console.log(anuj.name);
console.log(anuj.role);
console.log(anuj.hasOwnProperty('name'));

console.log(anuj.__proto__.__proto__)


/*Coding Challenge #1
Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them
Test data:
§
§
Data car 1: 'BMW' going at 120 km/h
Data car 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀 */

//1
const Car = function(make, speed) {
    this.speed = speed,
    this.make = make
}

//2
Car.prototype.accelerate = function() {
const newSpeed = this.speed + 10;
   console.log(newSpeed);
}

//3
Car.prototype.brake = function() {
    console.log(this.speed-5);
}

//4
const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car2.accelerate();
car1.brake();
car2.brake();

console.log(car1);
console.log(car2);

//ES6 classes
class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName,
        this.birthYear = birthYear
    }

    calcAge() {
        console.log(2025-this.birthYear);
    }
}

const rahul = new PersonCl('Rahul', 1996);
console.log(rahul);
rahul.calcAge();

//Getters and Setters
const accounts = {
    owner: 'Anuj',
    movements: [100,200,300,400],

    //getter function
    get latest() {
        return this.movements[3];
    },

    //setter function
    set latest(mov) {
        return this.movements.push(mov);
    }

}

console.log(accounts.latest);
accounts.latest = 40;
console.log(accounts.movements);

//static methods (these functions only exists on constructor functions and not on objects created)
class UserCl {
    constructor(name, age) {
        this.name = name,
        this.age = age
    }

    static ageUser() {
      console.log('Hello');
    }
}

UserCl.ageUser();

//Object.create (this create an object to be the prototype of anothe object we create)

const AdminProto = { //this object will now become the prototype for the steven object created using the Object.create()
    calcAge() {
        console.log(2025-this.birthYear);
    }
}

const steven = Object.create(AdminProto);

//Public Interfaces
class Accounts {
    locale = navigator.language; //public field
    #pin;
    #movements = []; //private field

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        // this.movements = []; //this is also valid
        // this.locale = navigator.language;
    }

    //public method
    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdrawal(val) {
        this.deposit(-val);
        return this;
    }

    //private method
    #approveLoan(val) {
        if(val)
        return true;
    }

    requestLoan(val) {
        if(this.#approveLoan(val)){
            this.#movements.push(val);
        }
        console.log(`Your loan request ha been approved an ammount of ${val} has been added to the account`);
        return this;
    }


}

const acc1 = new Accounts('Anuj Raj', 'RUP', 1234);
console.log(acc1);

acc1.deposit(1000);
acc1.withdrawal(200);
console.log(acc1);

//chaining class methods using the return this
acc1.deposit(1000).withdrawal(200).withdrawal(300).deposit(20).requestLoan(30000).withdrawal(4000);
console.log(acc1);
// acc1.requestLoan(2000);

