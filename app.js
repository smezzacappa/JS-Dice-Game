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

init();




function rollDice() {
    if (gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1;
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).innerHTML = roundScore;
            // console.log(roundScore);
        } else {
            nextPlayer();
        }
    } 
}

function holdBtn() {
    if(gamePlaying){
        scores[activePlayer] += roundScore;
        //Update UI
        document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
        //Check if player won game
        if (scores[activePlayer] >= 30) {
            document.querySelector('.dice').style.display = 'none';
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

    document.querySelector('.dice').style.display = 'none';
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