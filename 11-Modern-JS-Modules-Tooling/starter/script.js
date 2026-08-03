//Importing module
console.log('Importing module');
import {addToCart, totalPrice as price, shippingPrice} from './shoppingCart.js'

console.log('Importing Module');

addToCart('bread', 10);
console.log(price, shippingPrice);


// Named export functionality
import * as Shoppingcart from './shoppingCart.js';

console.log('Importing Module');

Shoppingcart.addToCart('pizza', 2);

//Defualt export functionality
import add from './shoppingCart.js';
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
add('Milk', 5)

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

const getLastPost = async function() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    return {title: data.at(-1).title, text: data.at(-1).body};
}

//Using await to get the returned value from async function
// const lastPost = await getLastPost();
// console.log(lastPost);

//NPM package using
const state = {
    application: [
        {name: 'Raj', lastName: 'Anuj'},
        {name: 'Sharma', lastName: 'Jay'}
    ],

    user: {loggedIn: true}
}

const state2 = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log('state', state);
console.log('state2', state2);
console.log('statedeep', stateDeepClone);
