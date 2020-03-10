const brain = require('brain.js');
const net = new brain.recurrent.LSTM();
const fs = require('fs');

function convertStringToMatrix(string) {
    return string.match(/.{1,9}/g);
}

function guessNextStep(currentSteps) {
    var modelJson = fs.readFileSync('data/model.json', {
        encoding: "utf-8"
    });

    var model = JSON.parse(modelJson);

    net.fromJSON(model);

    var output = net.run(currentSteps);
    var nextStep = output.trim().split(" ")[0];
    console.log(nextStep);
}

guessNextStep('-------C-');
