/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const roll = document.querySelector('.btn-roll');
const hold = document.querySelector('.btn-hold');
const newGame = document.querySelector('.btn-new');
const playerOneScore = document.getElementById('score-0');
const playerTwoScore = document.getElementById('score-1');
const playerOneCurrent = document.getElementById('current-0');
const playerTwoCurrent = document.getElementById('current-1');

let scores, roundScore, activePlayer, gamePlaying;
// let diceDOM1 = document.getElementById('dice-1');
// let diceDOM2 = document.getElementById('dice-2');

init();



let lastRoll;
let input;


function rollDice() {
    if (gamePlaying) {

        //1. Random number generator
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Shows the number on the dice
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. If a 6 was rolled two times set players score to 0
        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        //     if (dice === 6 && lastRoll === 6) {
        //         scores[activePlayer] = 0;
        //         document.querySelector('#score-' + activePlayer).innerHTML = '0';
        //         nextPlayer();
        //     }else if (dice !== 1) {
        //         roundScore += dice;
        //         document.querySelector('#current-' + activePlayer).innerHTML = roundScore;
        //         // console.log(roundScore);
        //     } else {
        //         nextPlayer();
        //     }
        //     lastRoll = dice;

    }
}

function holdBtn() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        //Update UI
        document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];

        input = document.querySelector('.final-score').value;
        let winningScore;

        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

            //Check if player won game
            if (scores[activePlayer] >= winningScore) {
                document.getElementById('dice-1').style.display = 'none';
                document.getElementById('dice-2').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                document.querySelector('#name-' + activePlayer).innerHTML = ("Winner");
                gamePlaying = false;
            } else {
                nextPlayer();
            }
        }
        //Add current score to global score
    }

const nextPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    playerOneCurrent.innerHTML = 0;
    playerTwoCurrent.innerHTML = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.getElementById('dice-1').style.display = 'none';
    // document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;


    playerOneScore.textContent = scores[0];
    playerTwoScore.textContent = scores[1];
    playerOneCurrent.textContent = '0';
    playerTwoCurrent.textContent = '0';
    document.querySelector('#name-0').innerHTML = 'Player 1';
    document.querySelector('#name-1').innerHTML = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}



roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdBtn);
newGame.addEventListener('click', init);