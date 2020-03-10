var winner = false;

function replaceAt(string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

function generateNextPlays(lastBoard, currentPlayer) {
    var newPlays = [];
    for (var i = 0; i < lastBoard.length; i++) {
        if (lastBoard.charAt(i) === "-") {
            var newBoard = replaceAt(lastBoard, i, currentPlayer);
            newPlays.push(newBoard)
        }
    }
    return newPlays;
}

function isItDone(games) {
    return games.every((game) => {
        var lastBoard = game.slice(-9);
        if (verifyIfOver(lastBoard)) {
            return true;
        }
        return lastBoard.search("-") === -1;
    })
}

function verifyIfOver(board) {
    // Verify Rows
    for (var i = 0; i < 3; i++) { // Each row
        var cell = i * 3;
        if (board.charAt(cell) !== "-") {
            if (board.charAt(cell + 1) === board.charAt(cell)) {
                if (board.charAt(cell + 2) === board.charAt(cell)) {
                    winner = board.charAt(cell);
                    return true;
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
                    winner = board.charAt(cell);
                    return true;
                }
            }
        }
    }
    // Check center cell
    if (board.charAt(4) !== "-") {
        // Across from top left
        if (board.charAt(4) === board.charAt(0)) {
            if (board.charAt(8) === board.charAt(4)) {
                winner = board.charAt(4);
                return true;
            }
        }
        // Across from top right
        if (board.charAt(4) === board.charAt(2)) {
            if (board.charAt(6) === board.charAt(4)) {
                winner = board.charAt(4);
                return true;
            }
        }
    }
    // Check if tie
    if (board.search("-") === -1) {
        winner = false;
        return true;
    }
    return false;
}

function main() {
    var games = ['---------'];
    var currentPlayer = "C";

    

    
    var count = 0;
    while (!isItDone(games)) {
        console.log('starting loop #' + count);
        if (count >= 7) break;
        count++;
        var newGames = [];
        games.forEach((game) => {
            var lastBoard = game.slice(-9);
            var isOver = verifyIfOver(lastBoard);
            if (!isOver) {
                var plays = generateNextPlays(lastBoard, currentPlayer)
                    .map((play) => {
                        return game + " " + play;
                    })
                newGames = newGames.concat(plays);
            }
        })
        if (currentPlayer === "P") {
            currentPlayer = "C";
        } else currentPlayer = "P";
        
        games = [...newGames];
    }
    console.log(games)
}

main()