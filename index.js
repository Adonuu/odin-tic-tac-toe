// create a player for the game
function createPlayer(name, pieces) {
    // functions for get/set the name and pieces
    const getName = () => name;
    const setName = (value) => name = value;
    const getPieces = () => pieces;
    const setPieces = (value) => pieces = value;
    return { getName, setName, getPieces, setPieces};
}

// create a game
// this will host two players
// also will keep track of player turn
const game = (function () {
    // instantiate two players
    const playerOne = createPlayer('One', 'X');
    const playerTwo = createPlayer('Two', 'O');

    // instantiate board
    const board = createBoard();

    let turn = '';
    const getTurn = () => turn;
    // function to change turn or figure out who goes first
    const setTurn = () => {
        if (turn === playerOne.getName()) {
            turn = playerTwo.getName();
        } else if (turn === playerTwo.getName()) {
            turn = playerOne.getName();
        } else {
            let randomNumber = Math.round(Math.random() * 2);
            if (randomNumber === 1) {
                turn = playerOne.getName();
            } else {
                turn = playerTwo.getName();
            }
        }
    };

    // run set turn once to setup first players turn
    setTurn();

    return { playerOne, playerTwo, board , setTurn, getTurn};
})();

// create a board for the game
function createBoard () {
    // create a 3x3 array for keeping track of the board state
    let board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    const getBoard = () => board;
    const setTile = (x, y, value) => {
        board[x][y] = value;
        game.setTurn();
        return checkWin();
    };

    // function to check to see if someone won
    const checkWin = () => {
        // check rows
        for (let i = 0; i < board.length - 1; i++) {
            // figure out what the value is in the 1st column
            let valueToCheck = board[i][0];
            // if the other two match return piece string from the winning player
            if (board[i][1] === valueToCheck && board[i][2] === valueToCheck) {
                return valueToCheck;
            }
        }
        // check columns
        for (let i = 0; i < board.length - 1; i++) {
            // figure out what the value in the first row is
            let valueToCheck = board[0][i];
            if (board[1][i] === valueToCheck && board[2][i] === valueToCheck) {
                return valueToCheck;
            }
        }
        // check diagonals
        let valueToCheck = board[0][0];
        if (board[1][1] === valueToCheck && board[2][2] === valueToCheck) {
            return valueToCheck;
        }
        valueToCheck = board[0][2];
        if (board[1][1] === valueToCheck && board[2][0] === valueToCheck) {
            return valueToCheck;
        }
        // if we made it through checking the board return 0
        // this states no one won/tie
        return 0;
    };

    return {getBoard, setTile, checkWin};
}

// create element for an individual space on the grid
function createSpace(x, y) {
    // find parent container to append to
    let parent = document.querySelector('#board');
    // x and y used to know which space on the board the space is linked too
    let newDiv = document.createElement('button');
    // add class for styling
    newDiv.classList.add('space');
    // add function for setting the current value
    newDiv.addEventListener('click', () => {
        let gameStatus;
        // check to see which players turn it is and set the text accordingly
        if (game.getTurn() === game.playerOne.getName()) {
            newDiv.innerHTML = game.playerOne.getPieces();
            gameStatus = game.board.setTile(x, y, game.playerOne.getPieces());
            newDiv.classList.add('clicked');
        } else if (game.getTurn() === game.playerTwo.getName()) {
            newDiv.innerHTML = game.playerTwo.getPieces();
            gameStatus = game.board.setTile(x, y, game.playerTwo.getPieces());
            newDiv.classList.add('clicked');
        }
        // if gameStatus is not 0 then a player one
        if (gameStatus != 0) {
            if (gameStatus === game.playerOne.getPieces()) {
                console.log('player one won');

            } else if (gameStatus === game.playerTwo.getPieces()) {
                console.log('player two won');
            }
            // give the rest of the buttons clicked class so they can't be clicked anymore
            let boardChildren = document.querySelector('#board').childNodes;
            boardChildren.forEach(element => {
                element.classList.add('clicked');
            });
        };
        // check to see if board is full
        let boardFull = true;
        let currentBoard = game.board.getBoard();
        currentBoard.forEach(element => {
            if (element != game.playerOne.getPieces() && element != game.playerTwo.getPieces()){
                boardFull = false;
            }
        });
        // if board is full it is a tie
        if (boardFull) {
            console.log('tie');
        }
    });
    parent.appendChild(newDiv);
};

// render elements to click to set value
// create a 3 x 3 grid
function renderBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            createSpace(i, j);
        }
    }
}

renderBoard();