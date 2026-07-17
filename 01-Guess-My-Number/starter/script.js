'use strict';

// document.querySelector('.message');
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = "🎉 Correct Number!";
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 12;

let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function() {
    let guess = Number(document.querySelector('.guess').value);
    //When there is no guess
    if(!guess) {
        document.querySelector('.message').textContent = "🚫 No Number!";

    //when the guess is correct
    } else if (guess === secretNumber) {
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('.message').textContent = "🎉 Correct Number!";
        document.querySelector('body').style.backgroundColor = "#60b347";
        document.querySelector('.number').style.width = "30rem";
        if(score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }

    } 
    //When the guess is different
    else if (guess !== secretNumber) {
        if(score > 1) {
            document.querySelector('.message').textContent = guess > secretNumber ? "📈 Too High!" : "📉 Too Low!";
            score--;
            document.querySelector('.score').textContent = score;
            } else {
                document.querySelector('.message').textContent = "🙁 You Lost the Game!";
                document.querySelector('.score').textContent = 0;
            }

    }
    //When the guess is too high
    // else if (guess > secretNumber) {
    //     if(score > 1) {
    //     document.querySelector('.message').textContent = "📈 Too High!";
    //     score--;
    //     document.querySelector('.score').textContent = score;
    //     } else {
    //         document.querySelector('.message').textContent = "🙁 You Lost the Game!";
    //         document.querySelector('.score').textContent = 0;
    //     }
        
    // //When the guess is too low
    // } else if (guess < secretNumber) {
    //     if(score > 1) {
    //     document.querySelector('.message').textContent = "📉 Too Low!";
    //     score--;
    //     document.querySelector('.score').textContent = score;
    //     } else {
    //         document.querySelector('.message').textContent = "🙁 You Lost the Game!";
    //         document.querySelector('.score').textContent = 0;
    //     }
    // }
});

document.querySelector('.again').addEventListener('click', function() {
    score = 20;
    secretNumber = Math.trunc(Math.random()*20)+1;
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = "?";  
    document.querySelector('.message').textContent = "Start guessing...";
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = "#222";
    document.querySelector('.number').style.width = "15rem";
})

