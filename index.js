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
    const playerOne = createPlayer('', 'X');
    const playerTwo = createPlayer('', 'O');

    // instantiate board
    const board = createBoard();

    let turn = '';
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

    return { playerOne, playerTwo, board , setTurn};
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
    const setTile = (x, y, value) => board[x][y] = value;

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
        // this states no one won
        return 0;
    };

    return {getBoard, setTile, checkWin};
}