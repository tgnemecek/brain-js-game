const brain = require('brain.js');
const net = new brain.recurrent.LSTM({
    maxPredictionLength: 9
});
const fs = require('fs');
const moment = require('moment');

module.exports = function train() {
    var startDate = moment();
    console.log("Training started on " + startDate.format('DD-MM HH:MM'));
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
        iterations: 50,
        log: true
    })

    model = net.toJSON();
    model = JSON.stringify(model);

    fs.writeFileSync('data/model.json', model);
    console.log("Training ended on " + moment().format('DD-MM HH:MM'));
    console.log(moment().diff(startDate, "minutes") + "minutes have passed.");
}

