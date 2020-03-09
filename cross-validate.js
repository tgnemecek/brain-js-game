const brain = require('brain.js');
const assert = require('assert');
const fs = require('fs');

const net = new brain.recurrent.RNN();

var modelPath = './data/model.json';
var model = fs.readFileSync(modelPath, {
    encoding: 'utf-8'
})
model = JSON.parse(model);
console.log(model)


const crossValidate = new brain.CrossValidate(brain.recurrent.RNN);
// crossValidate.fromJSON(model);

var trainingDataJson = fs.readFileSync('data/games.json', {
    encoding: "utf-8"
});

var trainingData = JSON.parse(trainingDataJson);

crossValidate.train(trainingData, {
    log: true,
    iterations: 1000
});

var net1 = crossValidate.toNeuralNetwork();
console.log(net1.run([
    "C--------"
]))


// var trainingDataJson = fs.readFileSync('data/games.json', {
//     encoding: "utf-8"
// });

// var trainingData = JSON.parse(trainingDataJson);

// var modelJson;

// if (fs.existsSync(modelPath)) {
    
// }

// net.train(trainingData, {
//     iterations: 1000,
//     log: true
// })

// model = net.toJSON();
// model = JSON.stringify(model);

// fs.writeFileSync('data/model.json', model)
// console.log("Model Saved!");