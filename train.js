const brain = require('brain.js');
const net = new brain.recurrent.LSTM({
    outputSize: 1
});
const fs = require('fs');

var trainingDataJson = fs.readFileSync('data/games.json', {
    encoding: "utf-8"
});

var trainingData = JSON.parse(trainingDataJson);

var model;
var modelPath = './data/model.json';
if (fs.existsSync(modelPath)) {
    model = fs.readFileSync(modelPath, {
        encoding: 'utf-8'
    })
    model = JSON.parse(model);
    net.fromJSON(model);
}

net.train(trainingData, {
    iterations: 100,
    log: true
})

model = net.toJSON();
model = JSON.stringify(model);

fs.writeFileSync('data/model.json', model)
console.log("Model Saved!");