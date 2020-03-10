const brain = require('brain.js');
const net = new brain.recurrent.LSTM();
const fs = require('fs');

var modelJson = fs.readFileSync('data/model.json', {
    encoding: "utf-8"
});

var model = JSON.parse(modelJson);

net.fromJSON(model);

var output = net.run('--------- C-------- '); // Dont forget the space at the last char!
console.log(output);