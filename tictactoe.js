
const board = document.getElementById('gameBoard');
const restart = document.getElementById('restart');
const resetScore = document.getElementById('resetScore');
const resetAll = document.getElementById('resetAll');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const playerA = document.getElementById('playerA');
const playerB = document.getElementById('playerB');
const ATurn = document.getElementById('ATurn');
const BTurn = document.getElementById('BTurn');
const start = document.getElementById('start');

let gBoard = new Array();

start.addEventListener('click', startGame);
restart.addEventListener('click', restartGame);
resetScore.addEventListener('click', resetWins);
resetAll.addEventListener('click', resetPage);

const playerFactory = (name) => {
    this.name = name;
    this.turn = false;
    this.wins = 0;
    return { name, turn, wins }
}

(function () { // Populate gBoard Array
    for (i = 0; i < 9; i++) {
        temp = document.createElement('div');
        temp.className = 'board';
        temp.id = `board${i}`
        temp.addEventListener('click', turnFunction);
        gBoard.push(temp)
    }
})();

(function () { // Render Board
    for (i = 0; i < gBoard.length; i++) {
        board.appendChild(gBoard[i])
    }
})();

function whoGoesFirst() {
    if (Math.floor(Math.random() < .5)) {
        play1.turn = true;
        play2.turn = false;
    } else {
        play2.turn = true;
        play1.turn = false;
    }
};

function altTurns() {
    play1.turn = !play1.turn;
    play2.turn = !play2.turn;
}

function displayTurn() {
    if (play1.turn) {
        ATurn.innerText = `X's turn`
    } else { ATurn.innerText = '' }
    if (play2.turn) {
        BTurn.innerText = `O's turn`
    } else { BTurn.innerText = '' }
}

function turnFunction() {
    if (this.innerText !== '') {
        return
    } else if (playerA.innerText == '') {
        startGame();
    }
    else if (play1.turn) {
        this.innerText = 'X';
    } else if (play2.turn) {
        this.innerText = 'O'
    }
    altTurns();
    displayTurn();
    winner();
}

function restartGame() {
    for (i = 0; i < gBoard.length; i++) {
        gBoard[i].innerText = '';
    }
}

function playerNames() {
    if (player1.value !== '') {
        play1.name = player1.value;
    }
    if (player2.value !== '') {
        play2.name = player2.value;
    }
}

function startGame() {
    playerNames();
    playerA.innerText =
        `${play1.name}\n${play1.wins} Wins`
    playerB.innerText =
        `${play2.name}\n${play2.wins} Wins`
    start.style.display = 'none';
    whoGoesFirst();
    displayTurn();
}

function winner() {
    let winCond = [
        gBoard[0].innerText + gBoard[1].innerText + gBoard[2].innerText,
        gBoard[3].innerText + gBoard[4].innerText + gBoard[5].innerText,
        gBoard[6].innerText + gBoard[7].innerText + gBoard[8].innerText,
        gBoard[0].innerText + gBoard[3].innerText + gBoard[6].innerText,
        gBoard[1].innerText + gBoard[4].innerText + gBoard[7].innerText,
        gBoard[2].innerText + gBoard[5].innerText + gBoard[8].innerText,
        gBoard[0].innerText + gBoard[4].innerText + gBoard[8].innerText,
        gBoard[2].innerText + gBoard[4].innerText + gBoard[6].innerText]

    if (winCond.includes('XXX')) {
        play1.wins += 1;
        startGame();
        setTimeout(() => restartGame(), 1000)
    } else if (winCond.includes('OOO')) {
        play2.wins += 1;
        startGame();
        setTimeout(() => restartGame(), 1000);
    } else tie();
}

function tie() {
    let temp = '';
    for (i = 0; i < 9; i++) {
        temp += gBoard[i].innerText;
    }
    if (temp.length == 9) {
        BTurn.innerText = 'Tie!'
        ATurn.innerText = 'Tie!'
        setTimeout(() => restartGame(), 1000)
    }
}

function resetWins() {
    play1.wins = 0;
    play2.wins = 0;
    playerA.innerText =
        `${play1.name}\n${play1.wins} Wins`
    playerB.innerText =
        `${play2.name}\n${play2.wins} Wins`
}

function resetPage() {
    location.reload();
}

let play1 = playerFactory('Player1');
let play2 = playerFactory('Player2');