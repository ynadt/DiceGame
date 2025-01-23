const DiceParser = require("./classes/DiceParser");
const Game = require("./classes/Game");

try {
  const diceList = DiceParser.parse(process.argv.slice(2));
  const game = new Game(diceList);
  game.start();
} catch (error) {
  console.error(error.message);
}



