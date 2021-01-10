'use strict';

// Selecting Elements
const player0 = document.querySelector(`.player--0`);
const player1 = document.querySelector(`.player--1`);
const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);
const current0 = document.getElementById(`current--0`);
const current1 = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
let currentScore = 0;
let score0 = 0;
let score1 = 0;

// starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);


const switchPlayer = function() {
    if(player0.classList.contains(`player--active`)) {
        player0.classList.remove(`player--active`);
        player1.classList.add(`player--active`);
        score0 += currentScore;
        score0El.textContent = score0;
        currentScore = 0;
        current0.textContent = currentScore;
    } else {
        player1.classList.remove(`player--active`);
        player0.classList.add(`player--active`);
        score1 += currentScore;
        score1El.textContent = score1;
        currentScore = 0;
        current1.textContent = currentScore;
    }
}

const diceRoll = function(){
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if(dice !== 1) {
        // add dice to current score
        currentScore += dice;
        console.log(currentScore);
        // current0.textContent = currentScore;
        if(player0.classList.contains(`player--active`)) {
            current0.textContent = currentScore;
        } else {
            current1.textContent = currentScore;
        }
    } else {
        currentScore = 0;
        switchPlayer();
    }
}
const holdScore = function(){
    switchPlayer();
    if (score0 >= 100) {
        player0.classList.add(`player--winner`);
        btnRoll.removeEventListener(`click`, diceRoll);
        btnHold.removeEventListener(`click`, holdScore);
    } else if (score1 >= 100){
        player1.classList.add(`player--winner`);
        btnRoll.removeEventListener(`click`, diceRoll);
        btnHold.removeEventListener(`click`, holdScore);
    }
}

const removeWinner = function (player) {
    player.classList.remove(`player--winner`)
}
const addEvent = function() {
    btnRoll.addEventListener(`click`, diceRoll);
    btnHold.addEventListener(`click`, holdScore);
}
// Rolling dice functionality

addEvent();

btnNew.addEventListener(`click`, function(){
    score0 = 0;
    score1 = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add(`hidden`);
    switchPlayer();
    if(player0.classList.contains(`player--winner`)){
        removeWinner(player0);
        addEvent();
    } else {
        removeWinner(player1);
        addEvent();
    }
})