const JSONStream = require('JSONStream');
const fs = require('fs');

var lastPlayer = "P"; // P = player, C = computer
var winner;

function getMark() {
    if (lastPlayer === "P") {
        lastPlayer = "C";
    } else lastPlayer = "P";
    return lastPlayer;
}

function verifyIfOver(matrix) {
    // left column
    if (matrix[0][0] !== "-"
        && matrix[0][0] === matrix[1][0]
        && matrix[0][0] === matrix[2][0]
    ) {
        winner = matrix[0][0];
        return true;
    }
    // top row
    if (matrix[0][0] !== "-"
        && matrix[0][0] === matrix[0][1]
        && matrix[0][0] === matrix[0][2]
    ) {
        winner = matrix[0][0];
        return true;
    }
    // across (top left to bottom right)
    if (matrix[0][0] !== "-"
        && matrix[0][0] === matrix[1][1]
        && matrix[0][0] === matrix[2][2]
    ) {
        winner = matrix[0][0];
        return true;
    }
    // middle column
    if (matrix[0][1] !== "-"
        && matrix[0][1] === matrix[1][1]
        && matrix[0][1] === matrix[2][1]
    ) {
        winner = matrix[0][1];
        return true;
    }
    // right column
    if (matrix[0][2] !== "-"
        && matrix[0][2] === matrix[1][2]
        && matrix[0][2] === matrix[2][2]
    ) {
        winner = matrix[0][2];
        return true;
    }
    // across (top right to bottom left)
    if (matrix[0][2] !== "-"
        && matrix[0][2] === matrix[1][1]
        && matrix[0][2] === matrix[2][0]
    ) {
        winner = matrix[0][2];
        return true;
    }
    // middle row
    if (matrix[1][0] !== "-"
        && matrix[1][0] === matrix[1][1]
        && matrix[1][0] === matrix[1][2]
    ) {
        winner = matrix[1][0];
        return true;
    }
    // bottom row
    if (matrix[2][0] !== "-"
        && matrix[2][0] === matrix[2][1]
        && matrix[2][0] === matrix[2][2]
    ) {
        winner = matrix[2][0];
        return true;
    }
    // all fields filled (tie)
    if (matrix[0][0] !== "-"
        && matrix[0][1] !== "-"
        && matrix[0][2] !== "-"
        && matrix[1][0] !== "-"
        && matrix[1][1] !== "-"
        && matrix[1][2] !== "-"
        && matrix[2][0] !== "-"
        && matrix[2][1] !== "-"
        && matrix[2][2] !== "-"
    ) return true;
    return false;
}

function convertMatrixToString(matrix) {
    var subMatrix = matrix.map((row) => {
        return row.join("");
    })
    return subMatrix.join("");
}

function generateTrainingData(numberOfGames) {
    var games = [];
    for (var g = 0; g < numberOfGames; g++) {
        var steps = [];
        var matrix = [
            ["-", "-", "-"],
            ["-", "-", "-"],
            ["-", "-", "-"]
        ]
        for (var i = 0; i < 9; i++) {
            var randomX, randomY;
            while (randomX === undefined || randomY === undefined ||
                matrix[randomY][randomX] !== "-") {
                randomX = Math.floor(Math.random() * 3);
                randomY = Math.floor(Math.random() * 3);
            }

            matrix[randomY][randomX] = getMark();
            steps.push(convertMatrixToString(matrix));
            var isOver = verifyIfOver(matrix);
            if (isOver) break;
        }
        if (!winner || winner === "C") {
            games.push(steps);
        }
        // console.log(steps)
    }
    console.log(games);
    return games;
}

var trainingData = generateTrainingData(300);
const json = JSON.stringify(trainingData);
fs.writeFileSync('data/games.json', json)
console.log("Json saved!");