const brain = require('brain.js');
const net = new brain.recurrent.LSTM();
const fs = require('fs');

function verifyIfOver(board) {
    // Verify Rows
    for (var i = 0; i < 3; i++) { // Each row
        var cell = i * 3;
        if (board.charAt(cell) !== "-") {
            if (board.charAt(cell + 1) === board.charAt(cell)) {
                if (board.charAt(cell + 2) === board.charAt(cell)) {
                    return {
                        finished: true,
                        winner: board.charAt(cell)
                    }
                }
            }
        }
    }
    // Verify Columns
    for (var i = 0; i < 3; i++) { // Each column
        var cell = i;
        var skip = 3;
        if (board.charAt(cell) !== "-") {
            if (board.charAt(cell + skip) === board.charAt(cell)) {
                if (board.charAt(cell + skip * 2) === board.charAt(cell)) {
                    return {
                        finished: true,
                        winner: board.charAt(cell)
                    }
                }
            }
        }
    }
    // Check center cell
    if (board.charAt(4) !== "-") {
        // Across from top left
        if (board.charAt(4) === board.charAt(0)) {
            if (board.charAt(8) === board.charAt(4)) {
                return {
                    finished: true,
                    winner: board.charAt(4)
                }
            }
        }
        // Across from top right
        if (board.charAt(4) === board.charAt(2)) {
            if (board.charAt(6) === board.charAt(4)) {
                return {
                    finished: true,
                    winner: board.charAt(4)
                }
            }
        }
    }
    // Check if tie
    if (board.search("-") === -1) {
        return {
            finished: true,
            winner: "tie"
        }
    }
    return {
        finished: false,
        winner: false
    }
}

function replaceAt(string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

function makePlay(pIndex, board) {
    function loop() {
        return Math.round(Math.random() * 9);
    }
    let random = loop();
    while (board.charAt(random) !== "-") {
        random = loop();
    }
    board = replaceAt(board, random, pIndex.toString());
    return board;
}

function checkGameState(board) {
    if (board.search("-") === -1) {
        return 'ended';
    } else return 'playing';
}

function generateRandomFinishedBoards() {
    let board = '---------';
    let gameState = 'playing';
    let count = 0;
    while (gameState === 'playing') {
        // console.log(count)
        count++;
        for (let pIndex = 0; pIndex < 2; pIndex++) {
            console.log(board)
            board = makePlay(pIndex, board);
            gameState = checkGameState(board);
            if (gameState === 'ended') break;
        }
    }
    console.log(board);
}

let winBoards = [
    '111------',
    '---111---',
    '------111',
    '1--1--1--',
    '-1--1--1-',
    '--1--1--1',
    '1---1---1',
    '--1-1-1--'
]

let filledBoards = [];

for (let i = 0; i < winBoards.length; i++) {

}

// generateRandomFinishedBoards();