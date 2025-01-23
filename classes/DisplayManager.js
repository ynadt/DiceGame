const Config = require("./Config");

class DisplayManager {
  static showMessage(message) {
    console.log(message);
  }

  static showDiceOptions(diceList, excludeDice = null) {
    this.showMessage("Available dice:");
    diceList.forEach((dice, index) => {
      if (dice !== excludeDice) {
        this.showMessage(`${index}: ${dice.faces.join(",")}`);
      }
    });
    this.showMessage("X - exit\n? - help");
  }

  static showThrowDetails(owner, rollIndex, key, userValue, resultIndex, diceFace) {
    const message = `My number is ${rollIndex} (KEY=${key}).\n` +
      `The result is ${rollIndex} + ${userValue} = ${resultIndex} (mod ${Config.SIDES_PER_DICE}).\n` +
      `${owner} throw is ${diceFace}.`;
    this.showMessage(message);
  }
}

module.exports = DisplayManager;