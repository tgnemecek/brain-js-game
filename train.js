const brain = require('brain.js');
const JSONStream = require('JSONStream');
const net = new brain.recurrent.LSTM();
const fs = require('fs');

var trainingDataJson = fs.readFileSync('data/games.json', {
    encoding: "utf-8"
});

var trainingData = JSON.parse(trainingDataJson);

net.train(trainingData, {
    iterations: 100,
    log: true
})

const modelJson = net.toJSON()
const model = JSON.stringify(modelJson);
fs.writeFileSync('data/model.json', model)
console.log("Model Saved!");