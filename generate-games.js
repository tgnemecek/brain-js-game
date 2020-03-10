const brain = require('brain.js');
const net = new brain.recurrent.LSTM()
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

function getRandomPlayer() {
    var random = Math.round(Math.random());
    if (random === 1) {
        return "C"
    } else return "P"
}

function getRandomGame() {
    console.log("CREATING NEW GAME...")
    var board = '---------';
    var nextPlayer = getRandomPlayer();
    var count = 0;
    var gameStatus = {};
    while (!gameStatus.finished) {
        var newBoard = board.slice(-9);
        var random = Math.round(Math.random() * 9);
        while (board.charAt(random) !== "-") {
            random = Math.round(Math.random() * 9);
        }

        newBoard = replaceAt(newBoard, random, nextPlayer);
        if (nextPlayer === "C") {
            nextPlayer = "P";
        } else nextPlayer = "C";
        board += " " + newBoard;
        gameStatus = verifyIfOver(newBoard);
    }
    if (gameStatus.winner === "C") {
        console.log("GAME SUCCESSFUL!")
        return board;
    } else {
        console.log("GAME FAILED, RESTARTING...")
        return getRandomGame();
    }
}

function createRandomGames(numberOfGames) {
    var result = [];
    for (var i = 0; i < numberOfGames; i++) {
        result.push(getRandomGame());
    }
    return result;
}

module.exports = function generate(numberOfGames) {
    var games = createRandomGames(numberOfGames);
    var json = JSON.stringify(games);
    fs.writeFileSync('data/games.json', json);
}