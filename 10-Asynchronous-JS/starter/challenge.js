/*Coding Challenge #1
In this challenge you will build a function 'whereAmI' which renders a country
only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
Your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test
data below).
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
promises to get the data. Do not use the 'getJSON' function we created, that
is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”
4. Chain a .catch method to the end of the promise chain and log errors to the
console
5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message
PART 2
6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.
7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)
The Complete JavaScript Course
30Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
GOOD LUCK 😀 */

const whereAmI = function(lat, lng) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    .then((response)=> {
        if(!response.ok) {
            throw new Error(`Sorry we could not get your request complete, ${response.status}`)
        }
        return response.json();
    })
    .then((data)=> {
        console.log(`Im in ${data.city}, ${data.countryName}`);
    })
    .catch((err)=> {
        console.error(err.message);
    })

}

whereAmI(52.508, 13.381);


/*Coding Challenge #2
For this challenge you will actually have to watch the video! Then, build the image
loading functionality that I just showed you on the screen.
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by
yourself. Pretend you're working on your own 😉
PART 1
1. Create a function 'createImage' which receives 'imgPath' as an input.
This function returns a promise which creates a new image (use
document.createElement('img')) and sets the .src attribute to the
provided image path
2. When the image is done loading, append it to the DOM element with the
'images' class, and resolve the promise. The fulfilled value should be the
image element itself. In case there is an error loading the image (listen for
the'error' event), reject the promise
3. If this part is too tricky for you, just watch the first part of the solution
PART 2
4. Consume the promise using .then and also add an error handler
5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier
6. After the 2 seconds have passed, hide the current image (set display CSS
property to 'none'), and load a second image (Hint: Use the image element
returned by the 'createImage' promise to hide the current image. You will
need a global variable for that 😉)
7. After the second image has loaded, pause execution for 2 seconds again
8. After the 2 seconds have passed, hide the current image
Test data: Images in the img folder. Test the error handler by passing a wrong
image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
otherwise images load too fast
GOOD LUCK 😀 */

let images = document.querySelector('.images');
let image;

const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds*1000)
    })
}

//1
const createImage = function(imgPath)  {
    return new Promise(function(resolve, reject) {
        image = document.createElement('img');
        image.src = imgPath;

        image.addEventListener('load', function() {
            images.append(image);
            resolve(image);
        })

        image.addEventListener('error', function() {
            reject(new Error(`Could not found the image`));
        })


    })
}

//2,3,4,5,6,7,8
createImage('https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg').then(()=> {
    console.log('Image 1 loaded');
    return wait(10);
})
.then(()=> {
    image.style.display = 'none';
    return createImage(`https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg`)
})
.then(()=> {
    console.log('Image 2 loaded');
    return wait(10);
})
.catch((err)=> {
    console.error(err);
})