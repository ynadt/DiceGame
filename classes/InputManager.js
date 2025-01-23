const readline = require("readline-sync");
const DisplayManager = require("./DisplayManager");
const HelpTable = require("./HelpTable");

class InputManager {
  static getInput(prompt) {
    return readline.question(prompt).trim();
  }

  static handleSpecialInputs(input, diceList) {
    if (input === "X") {
      DisplayManager.showMessage("Game exited.");
      process.exit();
    }
    if (input === "?") {
      HelpTable.display(diceList);
      return true;
    }
    return false;
  }
}

module.exports = InputManager;