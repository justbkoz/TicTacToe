let player = (function () {
    const aiCheck = document.getElementById('aiCheck');
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');

    aiCheck.addEventListener('change', aiChecked);

    const _playerFactory = (name, marker, ai) => {
        this.name = name;
        this.turn = false;
        this.wins = 0;
        this.marker = marker;
        this.ai = ai;
        return { name, turn, wins, marker, ai }
    }

    let a = _playerFactory('Player1', 'X', false);
    let b = _playerFactory('Player2', 'O', false);

    function playerNames() {
        if (player1.value) {
            this.a.name = player1.value;
        }
        if (player2.value) {
            this.b.name = player2.value;
        }
    }

    function aiChecked() {
        aiCheck.checked ? player.b.ai = true : player.b.ai = false;
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
    let gameStarted = false;
    let gamePaused = false;

    start.addEventListener('click', startGame);
    restart.addEventListener('click', clearBoard);
    resetScore.addEventListener('click', resetWins);
    resetAll.addEventListener('click', resetPage);
    swap.addEventListener('click', swapGame);

    function whoGoesFirst() {
        Math.floor(Math.random() <= .5) ?
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
        gameStarted = true;
        player.playerNames();
        playerA.innerText = `${player.a.name}\n${player.a.wins} Wins`
        playerB.innerText = `${player.b.name}\n${player.b.wins} Wins`
        start.style.display = 'none';
        whoGoesFirst();
        displayTurn();
        if (player.b.turn && player.b.ai) { turnFunction() }
    }

    function swapGame() {
        if (gameModule.superGame) {
            supBoard.style.display = 'none';
            regBoard.style.display = '';
            superWins.style.display = 'none';
            title.innerText = 'Tic Tac Toe'
            swap.innerText = 'Super Game'
            clearBoard();
        } else {
            supBoard.style.display = '';
            regBoard.style.display = 'none';
            superWins.style.display = '';
            title.innerHTML = `<i>Super</i> Tic Tac Toe`
            swap.innerText = 'Regular Game'
            clearBoard();
        }
        gameModule.superGame = !gameModule.superGame;
    }

    function turnFunction() {
        if (gamePaused) {
            return
        }
        if (this.innerText) {
            return
        } else if (!gameStarted) {
            startGame();
            return;
        } else if (player.a.turn) {
            this.innerText = player.a.marker;
        } else if (player.b.turn && !player.b.ai) {
            this.innerText = player.b.marker;
        } else if (player.b.turn && player.b.ai) {
            gamePaused = true
            setTimeout(() => (
                aiModule.aiChoice(),
                gamePaused = false,
                altTurns(),
                displayTurn(),
                winner()
            ), 1000)
            return;
        }
        altTurns();
        displayTurn();
        winner();
    }

    function winner() {
        if (gameModule.superGame) {
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
                clearBoard();
                startGame();
            } else if (winCond.includes('OOOO')) {
                player.b.wins += 1;
                clearBoard();
                startGame();
            } else {
                tie();
            }
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
                clearBoard();
                startGame();
            } else if (winCond.includes('OOO')) {
                player.b.wins += 1;
                clearBoard();
                startGame();
            } else {
                tie();
            }
        }
    }

    function tie() {
        if (gameModule.superGame) {
            let temp = '';
            for (i = 0; i < superBoard.arr.length; i++) {
                temp += superBoard.arr[i].innerText;
            }
            if (temp.length == 16) {
                bTurn.innerText = 'Tie!'
                aTurn.innerText = 'Tie!'
                clearBoard();
                setTimeout(() => displayTurn(), 1000)
            } else if (player.b.turn && player.b.ai) { turnFunction() }
        } else {
            let temp = '';
            for (i = 0; i < board.arr.length; i++) {
                temp += board.arr[i].innerText;
            }
            if (temp.length == 9) {
                bTurn.innerText = 'Tie!'
                aTurn.innerText = 'Tie!'
                clearBoard();
                setTimeout(() => displayTurn(), 1000)
            } else if (player.b.turn && player.b.ai) { turnFunction() }
        }
    }

    function clearBoard() {
        if (gameModule.superGame) {
            for (i = 0; i < superBoard.arr.length; i++) {
                superBoard.arr[i].innerText = '';
            }
        } else {
            for (i = 0; i < board.arr.length; i++) {
                board.arr[i].innerText = '';
            }
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

    return { turnFunction, superGame }
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


let aiModule = (function () {
    let x

    function gameTurn() {
        x = Math.floor(Math.random() * 9);
        if (board.arr[x].innerText == '') { return }
        else { gameTurn() }
    }

    function superGameTurn() {
        x = Math.floor(Math.random() * 16);
        if (superBoard.arr[x].innerText == '') { return }
        else { superGameTurn() }
    }

    function aiTurn() {
        gameModule.superGame ? superGameTurn() : gameTurn();
    }

    function aiChoice() {
        aiTurn();
        gameModule.superGame ? (superBoard.arr[x].innerText = player.b.marker) : (board.arr[x].innerText = player.b.marker);
    }

    return { aiChoice }
})();






// dispay that first move is chosen randomly

//wish list:  delay after win/tie
            //could... no delay, but show results of previous game

//change player name if AI

//character limit to names
