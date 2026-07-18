'use strict';

//Selecting Elements
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let diceEl = document.querySelector('.dice');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');


//Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

let switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function() {
    //1. Generate a random dice roll
    if (playing){
    let dice = Math.trunc(Math.random()*6 + 1);
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for 1 if TRUE switch the user
    if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
}
});

//Holding dice functionality
btnHold.addEventListener('click', function() {
    if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100){
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        switchPlayer();
    }
}
});

//Resetting the game
btnNew.addEventListener('click', function() {
    currentScore = 0;
    scores = [0, 0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = currentScore;
    current1El.textContent = currentScore;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    activePlayer = 0;
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    diceEl.classList.add('hidden');
    playing = true;
})
