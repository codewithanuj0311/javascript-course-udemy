'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//https://countries-api-836d.onrender.com/countries/


// const getCountryData = function(country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
//     request.send();

//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText);
    
//         const html = `
//         <article class="country">
//               <img class="country__img" src="${data.flag}" />
//               <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}M people</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//               </div>
//             </article>
//         `
//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
    
//         console.log(data);
//     })

// }

// getCountryData('portugal');
// getCountryData('usa')

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
}

const renderCountry = function(data, className = '') {
    const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;

}

// const getCountryAndNeighbour = function(country) {

//     //AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
//     request.send();

//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText);

//         //Render Country 1
//         renderCountry(data);

//         //GET neighbour country
//         const neighbourCountry = data.borders?.[0];

//         //AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbourCountry}`);
//         request2.send();

//         request2.addEventListener('load', function() {
//             const data2 = JSON.parse(this.responseText);
//             //Render Country 2
//             renderCountry(data2, 'neighbour');

//         })

        
    
//     })

// }

// getCountryAndNeighbour('portugal')


const getJSON = function(Url, errorMessage = `Something went wrong`) {
  return  fetch(Url).then((response)=> {
        if(!response.ok) {
            throw new Error(`${errorMessage} (${response.status})`);
        }
        return response.json()

    })
}

// const getCountryData = function(country) {
//     fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function(response) { 
//         if(!response.ok) {
//             throw new Error(`Country could not found (${response.status})`);
//         }
//         return response.json()}
//     )
//     .then((data)=> { 
//         renderCountry(data[0]);
//         const neighbour = data[0].borders?.[0];

//         return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
//     }).then((response)=> {
//         if(!response.ok) {
//             throw new Error(`Neighbour could not found (${response.status})`);
//         }

//          return response.json();
//     }).then((data)=> {
//         renderCountry(data, 'neighbour')
//     }).catch( (err)=> {
//         console.error(err);
//         renderError(`Something went wrong, ${err.message}. Try again later !!!`)
//     }      
//     ).finally(()=> {
//         countriesContainer.style.opacity = 1; 
//     })
// }

const getCountryData = function(country) {
    getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`, 'Country could not found')
    .then((data)=> { 
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];
        if(!neighbour) throw new Error('Neighbour not found')

        return getJSON(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`, 'Neighbour could not found' )
    })
    .then((data)=> {
        renderCountry(data, 'neighbour')
    }).catch( (err)=> {
        console.error(err);
        renderError(`Something went wrong, ${err.message}. Try again later !!!`)
    }      
    ).finally(()=> {
        countriesContainer.style.opacity = 1; 
    })
}

btn.addEventListener('click', function() {
    getCountryData('portugal');
})

//Event loop in practice

console.log('Test start');
setTimeout(()=> {
    console.log('Test after 0 sec');
}, 0);
Promise.resolve('Promise 1 resolve')
.then((response)=> {
    console.log(response);
});
Promise.resolve('Promise 2 resolve')
.then((response)=> {
    for(let i=0; i<1000000000; i++) {}
    console.log(response);
});
console.log('Test end');


//Creating a promise
const lottery = new Promise(function(resolve, reject) {
    console.log('Lottery Draw is happening');
    setTimeout(function(){
        if(Math.random() >=0.5) {
            resolve('You win the lottery')
        } else {
            reject(new Error('You lose the lottery'))
        }
    }, 5000)
})

lottery.then((res)=> {
    console.log(res);
})
.catch((err)=> {
    console.error(err);
})

//Promisifying the setTimeout function
const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds*1000)
    })
}

wait(2).then(()=> {
    console.log('I waited for 2 seconds');
})

//Async/Await
const whereYouAre = async function (country) {
    try {
        const res = await fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`);
        const data = await res.json();
        renderCountry(data[0]);
        return `Germanyyyy`;
    } catch (error) {
        console.error(error.message);
    }
}

whereYouAre('germany');
console.log('FIRST');

//try...catch
try {
    let y = 1;
    const x = 2;
    x = 3;
} catch(err) {
    console.error(err.message);
}

console.log('1: getting my location');


//IIFE function call with a async function returning the value
(async function(){
   try {
        const res = await whereYouAre('germany');
    console.log(`2: I am in ${res}`);
} catch(err) {
    console.error(`2: ${err.message}`) 
}
console.log('3: Location finished');
}) ();

//Runnning promises in parallel
const get3CountiesCapital = async function (c1, c2, c3) {
    try { 
        // const [data1] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`);
        // const [data2] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`);
        // const [data3] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`);

        // console.log([data1.capital, data2.capital, data3.capital]);

        const data = await Promise.all([getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
        getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
        getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`)])

        console.log(data.map((d) => {
            return d[0].capital
        }));
    } catch (err) {
        console.error(err);
    }

}

get3CountiesCapital('portugal', 'canada', 'spain')
