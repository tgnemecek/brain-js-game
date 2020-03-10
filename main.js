const generate = require('./generate-games');
const train = require('./train');

console.log("Generating Games...")
generate(100);
console.log("Training Model...")
train()