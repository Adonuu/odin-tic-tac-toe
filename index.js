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
    const setTurn = (randomTurn) => {
        // if randomTurn is passed in then pick a random user
        // if it is not passed in do normal logic of swapping turn
        if (randomTurn) {
            let randomNumber = Math.round(Math.random() * 2);
                if (randomNumber === 1) {
                    turn = playerOne.getName();
                    // add class to display which player's turn it is
                    document.querySelector('#playerOneTurn').classList.toggle('turn');
                    // remove class
                    document.querySelector('#playerTwoTurn').classList.toggle('turn');
                } else {
                    turn = playerTwo.getName();
                    // add class to display which player's turn it is
                    document.querySelector('#playerTwoTurn').classList.toggle('turn');
                    // remove class
                    document.querySelector('#playerOneTurn').classList.toggle('turn');
                }
        } else {
            if (turn === playerOne.getName()) {
                turn = playerTwo.getName();
                // add class to display which player's turn it is
                document.querySelector('#playerTwoTurn').classList.toggle('turn');
                // remove from current player
                document.querySelector('#playerOneTurn').classList.toggle('turn');
            } else if (turn === playerTwo.getName()) {
                turn = playerOne.getName();
                // add class to display which player's turn it is
                document.querySelector('#playerOneTurn').classList.toggle('turn');
                // remove from current player
                document.querySelector('#playerTwoTurn').classList.toggle('turn');
            } else {
                let randomNumber = Math.round(Math.random() * 2);
                if (randomNumber === 1) {
                    turn = playerOne.getName();
                    // add class to display which player's turn it is
                    document.querySelector('#playerOneTurn').classList.toggle('turn');
                } else {
                    turn = playerTwo.getName();
                    // add class to display which player's turn it is
                    document.querySelector('#playerTwoTurn').classList.toggle('turn');
                }
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
        game.setTurn(false);
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

    const resetBoard = () => {
        // loop through entire board and reset
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = '';
            }
        }
    };

    return {getBoard, setTile, checkWin, resetBoard};
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
        setTimeout(() => {
            // if gameStatus is not 0 then a player one
            if (gameStatus != 0) {
                if (gameStatus === game.playerOne.getPieces()) {
                    alert(game.playerOne.getName() + ' Won!');

                } else if (gameStatus === game.playerTwo.getPieces()) {
                    alert(game.playerTwo.getName() + ' Won!');
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
                for (let i = 0; i < element.length - 1; i ++) {
                    if (element[i] != game.playerOne.getPieces() && element[i] != game.playerTwo.getPieces()){
                        boardFull = false;
                    }
                }
            });
            // if board and no won has won above it is a tie
            if (boardFull) {
                alert('Tie!');
            }
        }, 500);

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

// function to set player name
function setPlayerName( player, name) {
    player.setName(name);
}

// add setPlayerName function to events on the input boxes for each player's name
// this allows the user to change each player's name
document.querySelector('#playerOneName').addEventListener('input', (e) => {
    setPlayerName(game.playerOne, e.target.value);
});

document.querySelector('#playerTwoName').addEventListener('input', (e) => {
    setPlayerName(game.playerTwo, e.target.value);
});

// function to reset the spaces when the restart game button is clicked
// this should loop through and remove text and .clicked if needed
function resetSpaces() {
    // grab all children
    let children = document.querySelector('#board').childNodes;
    children.forEach(element => {
        // if the text is not blank that means it needs reset
        // if the text is blank it hasn't been clicked yet so do nothing
        if (element.innerHTML != '') {
            element.innerHTML = '';
            element.classList.toggle('clicked');
        }
    });
}

// when restart button is clicked reset the game board and the spaces
document.querySelector('#restartGame').addEventListener('click', () => {
    game.board.resetBoard();
    resetSpaces();
    game.setTurn(true);
});

renderBoard();