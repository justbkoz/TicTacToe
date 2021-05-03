let player = (function () {
    const _playerFactory = (name) => {
        this.name = name;
        this.turn = false;
        this.wins = 0;
        return { name, turn, wins }
    }

    let a = _playerFactory('Player1');
    let b = _playerFactory('Player2');

    return { a, b }
})();



let gameModule = (function () {

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

    start.addEventListener('click', startGame);
    restart.addEventListener('click', restartGame);
    resetScore.addEventListener('click', resetWins);
    resetAll.addEventListener('click', resetPage);

    function whoGoesFirst() {
        if (Math.floor(Math.random() < .5)) {
            player.a.turn = true;
            player.b.turn = false;
        } else {
            player.b.turn = true;
            player.a.turn = false;
        }
    };

    function altTurns() {
        player.a.turn = !player.a.turn;
        player.b.turn = !player.b.turn;
    }

    function displayTurn() {
        if (player.a.turn) {
            ATurn.innerText = `X's turn`
        } else { ATurn.innerText = '' }
        if (player.b.turn) {
            BTurn.innerText = `O's turn`
        } else { BTurn.innerText = '' }
    }

    function turnFunction() {
        if (this.innerText !== '') {
            return
        } else if (playerA.innerText == '') {
            startGame();
        }
        else if (player.a.turn) {
            this.innerText = 'X';
        } else if (player.b.turn) {
            this.innerText = 'O'
        }
        altTurns();
        displayTurn();
        winner();
    }

    function restartGame() {
        for (i = 0; i < board.arr.length; i++) {
            board.arr[i].innerText = '';
        }
    }

    function playerNames() {
        if (player1.value !== '') {
            player.a.name = player1.value;
        }
        if (player2.value !== '') {
            player.b.name = player2.value;
        }
    }

    function startGame() {
        playerNames();
        playerA.innerText =
            `${player.a.name}\n${player.a.wins} Wins`
        playerB.innerText =
            `${player.b.name}\n${player.b.wins} Wins`
        start.style.display = 'none';
        whoGoesFirst();
        displayTurn();
    }

    function winner() {
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
            setTimeout(() => restartGame(), 1000)
        } else if (winCond.includes('OOO')) {
            player.b.wins += 1;
            startGame();
            setTimeout(() => restartGame(), 1000);
        } else tie();
    }

    function tie() {
        let temp = '';
        for (i = 0; i < 9; i++) {
            temp += board.arr[i].innerText;
        }
        if (temp.length == 9) {
            BTurn.innerText = 'Tie!'
            ATurn.innerText = 'Tie!'
            setTimeout(() => restartGame(), 1000)
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
        turnFunction: turnFunction
    }
})();




let board = (function () {
    const board = document.getElementById('gameBoard');
    let arr = new Array();

    // Populate arr Array
    for (i = 0; i < 9; i++) {
        temp = document.createElement('div');
        temp.className = 'board';
        temp.id = `board${i}`
        temp.addEventListener('click', gameModule.turnFunction);
        arr.push(temp)
    }

    // Render Board from Array
    for (i = 0; i < arr.length; i++) {
        board.appendChild(arr[i])
    }

    return { arr }
})();