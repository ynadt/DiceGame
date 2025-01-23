const FairRandom = require("./FairRandom");
const DisplayManager = require("./DisplayManager");
const InputManager = require("./InputManager");
const Config = require("./Config");

class FairProtocol {
  static execute(range, diceList) {
    const { key, value: computerValue, hmac } = FairRandom.generateRandom(range);
    DisplayManager.showMessage(`I selected a random value in the range 0..${range - 1} (HMAC=${hmac}).`);
    DisplayManager.showMessage("Try to guess my selection.");
    return FairProtocol.getUserInput(range, computerValue, key, diceList);
  }

  static getUserInput(range, computerValue, key, diceList) {
    while (true) {
      const userInput = InputManager.getInput("Your selection (0, 1, X - exit, ? - help): ");
      if (InputManager.handleSpecialInputs(userInput, diceList)) continue;

      const userValue = parseInt(userInput, 10);
      if (!Number.isInteger(userValue) || userValue < 0 || userValue >= range) {
        DisplayManager.showMessage(Config.Colors.ERROR("Invalid input. Enter 0 or 1."));
        continue;
      }
      DisplayManager.showMessage(`My selection: ${computerValue} (KEY=${key}).`);
      return computerValue === userValue ? 0 : 1;
    }
  }
}

module.exports = FairProtocol;
