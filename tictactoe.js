let player = (function () {
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');

    const _playerFactory = (name, marker) => {
        this.name = name;
        this.turn = false;
        this.wins = 0;
        this.marker = marker;
        return { name, turn, wins, marker }
    }

    let a = _playerFactory('Player1', 'X');
    let b = _playerFactory('Player2', 'O');

    function playerNames() {
        if (player1.value) {
            this.a.name = player1.value;
        }
        if (player2.value) {
            this.b.name = player2.value;
        }
    }

    return { a, b, playerNames }
})();


let gameModule = (function () {
    const title = document.getElementById('title');
    const supBoard = document.getElementById('superBoard');
    const regBoard = document.getElementById('gameBoard');
    const restart = document.getElementById('restart');
    const resetScore = document.getElementById('resetScore');
    const resetAll = document.getElementById('resetAll');
    const playerA = document.getElementById('playerA');
    const playerB = document.getElementById('playerB');
    const aTurn = document.getElementById('aTurn');
    const bTurn = document.getElementById('bTurn');
    const start = document.getElementById('start');
    const swap = document.getElementById('swap');
    const superWins = document.getElementById('superWins');

    let superGame = true;

    start.addEventListener('click', startGame);
    restart.addEventListener('click', restartGame);
    resetScore.addEventListener('click', resetWins);
    resetAll.addEventListener('click', resetPage);
    swap.addEventListener('click', swapGame);

    function whoGoesFirst() {
        Math.floor(Math.random() < .5) ?
            (player.a.turn = true, player.b.turn = false)
            : (player.b.turn = true, player.a.turn = false)
    };

    function altTurns() {
        player.a.turn = !player.a.turn;
        player.b.turn = !player.b.turn;
    }

    function displayTurn() {
        player.a.turn ? aTurn.innerText = `X's turn` : aTurn.innerText = ''
        player.b.turn ? bTurn.innerText = `O's turn` : bTurn.innerText = ''
    }

    function startGame() {
        player.playerNames();
        playerA.innerText = `${player.a.name}\n${player.a.wins} Wins`
        playerB.innerText = `${player.b.name}\n${player.b.wins} Wins`
        start.style.display = 'none';
        whoGoesFirst();
        displayTurn();
    }

    function swapGame() {
        if (superGame) {
            supBoard.style.display = 'none';
            regBoard.style.display = '';
            superWins.style.display = 'none';
            title.innerText = 'Tic Tac Toe'
            swap.innerText = 'Super Game'
            restartGame();
        } else {
            supBoard.style.display = '';
            regBoard.style.display = 'none';
            superWins.style.display = '';
            title.innerHTML = `<i>Super</i> Tic Tac Toe`
            swap.innerText = 'Regular Game'
            restartGame();
        }
        superGame = !superGame;
    }

    function turnFunction() {
        if (this.innerText) {
            return
        } else if (playerA.innerText == '') {
            startGame();
        }
        else if (player.a.turn) {
            this.innerText = player.a.marker;
        } else if (player.b.turn) {
            this.innerText = player.b.marker;
        }
        altTurns();
        displayTurn();
        winner();
    }

    function winner() {
        if (superGame) {
            let winCond = [
                superBoard.arr[0].innerText + superBoard.arr[1].innerText + superBoard.arr[2].innerText + superBoard.arr[3].innerText,
                superBoard.arr[4].innerText + superBoard.arr[5].innerText + superBoard.arr[6].innerText + superBoard.arr[7].innerText,
                superBoard.arr[8].innerText + superBoard.arr[9].innerText + superBoard.arr[10].innerText + superBoard.arr[11].innerText,
                superBoard.arr[12].innerText + superBoard.arr[13].innerText + superBoard.arr[14].innerText + superBoard.arr[15].innerText,
                superBoard.arr[0].innerText + superBoard.arr[4].innerText + superBoard.arr[8].innerText + superBoard.arr[12].innerText,
                superBoard.arr[1].innerText + superBoard.arr[5].innerText + superBoard.arr[9].innerText + superBoard.arr[13].innerText,
                superBoard.arr[2].innerText + superBoard.arr[6].innerText + superBoard.arr[10].innerText + superBoard.arr[14].innerText,
                superBoard.arr[3].innerText + superBoard.arr[7].innerText + superBoard.arr[11].innerText + superBoard.arr[15].innerText,
                superBoard.arr[0].innerText + superBoard.arr[5].innerText + superBoard.arr[10].innerText + superBoard.arr[15].innerText,
                superBoard.arr[3].innerText + superBoard.arr[6].innerText + superBoard.arr[9].innerText + superBoard.arr[12].innerText,
                superBoard.arr[0].innerText + superBoard.arr[1].innerText + superBoard.arr[4].innerText + superBoard.arr[5].innerText,
                superBoard.arr[1].innerText + superBoard.arr[2].innerText + superBoard.arr[5].innerText + superBoard.arr[6].innerText,
                superBoard.arr[2].innerText + superBoard.arr[3].innerText + superBoard.arr[6].innerText + superBoard.arr[7].innerText,
                superBoard.arr[4].innerText + superBoard.arr[5].innerText + superBoard.arr[8].innerText + superBoard.arr[9].innerText,
                superBoard.arr[5].innerText + superBoard.arr[6].innerText + superBoard.arr[9].innerText + superBoard.arr[10].innerText,
                superBoard.arr[6].innerText + superBoard.arr[7].innerText + superBoard.arr[10].innerText + superBoard.arr[11].innerText,
                superBoard.arr[8].innerText + superBoard.arr[9].innerText + superBoard.arr[12].innerText + superBoard.arr[13].innerText,
                superBoard.arr[9].innerText + superBoard.arr[10].innerText + superBoard.arr[13].innerText + superBoard.arr[14].innerText,
                superBoard.arr[10].innerText + superBoard.arr[11].innerText + superBoard.arr[14].innerText + superBoard.arr[15].innerText,
                superBoard.arr[0].innerText + superBoard.arr[3].innerText + superBoard.arr[12].innerText + superBoard.arr[15].innerText]

            if (winCond.includes('XXXX')) {
                player.a.wins += 1;
                startGame();
                delayRestartGame();
            } else if (winCond.includes('OOOO')) {
                player.b.wins += 1;
                startGame();
                delayRestartGame();;
            } else tie();
        } else {
            let winCond = [
                board.arr[0].innerText + board.arr[1].innerText + board.arr[2].innerText,
                board.arr[3].innerText + board.arr[4].innerText + board.arr[5].innerText,
                board.arr[6].innerText + board.arr[7].innerText + board.arr[8].innerText,
                board.arr[0].innerText + board.arr[3].innerText + board.arr[6].innerText,
                board.arr[1].innerText + board.arr[4].innerText + board.arr[7].innerText,
                board.arr[2].innerText + board.arr[5].innerText + board.arr[8].innerText,
                board.arr[0].innerText + board.arr[4].innerText + board.arr[8].innerText,
                board.arr[2].innerText + board.arr[4].innerText + board.arr[6].innerText]

            if (winCond.includes('XXX')) {
                player.a.wins += 1;
                startGame();
                delayRestartGame();
            } else if (winCond.includes('OOO')) {
                player.b.wins += 1;
                startGame();
                delayRestartGame();;
            } else tie();
        }
    }

    function tie() {
        if (superGame) {
            let temp = '';
            for (i = 0; i < superBoard.arr.length; i++) {
                temp += superBoard.arr[i].innerText;
            }
            if (temp.length == 16) {
                bTurn.innerText = 'Tie!'
                aTurn.innerText = 'Tie!'
                delayRestartGame();
                setTimeout(() => displayTurn(), 1000)
            }
        } else {
            let temp = '';
            for (i = 0; i < board.arr.length; i++) {
                temp += board.arr[i].innerText;
            }
            if (temp.length == 9) {
                bTurn.innerText = 'Tie!'
                aTurn.innerText = 'Tie!'
                delayRestartGame();
                setTimeout(() => displayTurn(), 1000)
            }
        }
    }

    function restartGame() {
        if (superGame) {
            for (i = 0; i < superBoard.arr.length; i++) {
                superBoard.arr[i].innerText = '';
            }
        } else {
            for (i = 0; i < board.arr.length; i++) {
                board.arr[i].innerText = '';
            }
        }
    }

    function delayRestartGame() {
        if (superGame) {
            setTimeout(function () {
                for (i = 0; i < superBoard.arr.length; i++) {
                    superBoard.arr[i].innerText = '';
                }
            }, 1000);
        } else {
            setTimeout(function () {
                for (i = 0; i < board.arr.length; i++) {
                    board.arr[i].innerText = '';
                }
            }, 1000)
        }
    }

    function resetWins() {
        player.a.wins = 0;
        player.b.wins = 0;
        playerA.innerText =
            `${player.a.name}\n${player.a.wins} Wins`
        playerB.innerText =
            `${player.b.name}\n${player.b.wins} Wins`
    }

    function resetPage() {
        location.reload();
    }

    return {
        turnFunction
    }
})();


let board = (function () {
    const board = document.getElementById('gameBoard');
    let arr = new Array();

    for (i = 0; i < 9; i++) {
        temp = document.createElement('div');
        temp.className = 'board';
        temp.id = `board${i}`
        temp.addEventListener('click', gameModule.turnFunction);
        arr.push(temp)
        board.appendChild(arr[i])
    }

    board.style.display = 'none';

    return { arr }
})();

let superBoard = (function () {
    const superBoard = document.getElementById('superBoard');
    let arr = new Array();

    for (i = 0; i < 16; i++) {
        temp = document.createElement('div');
        temp.className = 'board';
        temp.id = `super${i}`
        temp.addEventListener('click', gameModule.turnFunction);
        arr.push(temp)
        superBoard.appendChild(arr[i])
    }

    return { arr }
})();