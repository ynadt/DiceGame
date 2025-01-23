const Config = require("./Config");
const DisplayManager = require("./DisplayManager");
const FairProtocol = require("./FairProtocol");
const DiceValidator = require("./DiceValidator");
const InputManager = require("./InputManager");
const FairRandom = require("./FairRandom");

class Game {
  constructor(diceList) {
    this.diceList = diceList;
  }

  start() {
    // console.clear();
    DisplayManager.showMessage("Let's determine who makes the first move.");
    const result = FairProtocol.execute(2, this.diceList);
    DisplayManager.showMessage(result === 0 ? Config.Colors.VICTORY("You make the first move.") : "I make the first move.");
    result === 0 ? this.userTurn() : this.computerTurn();
  }

  userTurn() {
    this.playRound(this.selectDice("Choose your dice (X - exit, ? - help): "), this.selectDiceForComputer());
  }

  computerTurn() {
    const computerDice = this.selectDiceForComputer();
    const userDice = this.selectDice("Choose your dice (X - exit, ? - help): ", computerDice);
    this.playRound(userDice, computerDice);
  }

  selectDice(prompt, excludeDice = null) {
    while (true) {
      DisplayManager.showDiceOptions(this.diceList, excludeDice);
      const userInput = InputManager.getInput(prompt);
      if (InputManager.handleSpecialInputs(userInput, this.diceList)) continue;

      const diceIndex = parseInt(userInput, 10);
      if (!DiceValidator.isValidDiceSelection(diceIndex, this.diceList, excludeDice)) {
        DisplayManager.showMessage(Config.Colors.ERROR("Invalid selection."));
        continue;
      }
      const selectedDice = this.diceList[diceIndex];
      DisplayManager.showMessage(`You chose the dice: ${selectedDice.faces.join(",")}`);
      return selectedDice;
    }
  }

  selectDiceForComputer(excludeDice = null) {
    const availableDice = this.diceList.filter((dice) => dice !== excludeDice);
    const selectedDice = availableDice[Math.floor(Math.random() * availableDice.length)];
    DisplayManager.showMessage(`I chose the following dice: ${selectedDice.faces.join(",")}`);
    return selectedDice;
  }

  playRound(userDice, computerDice) {
    DisplayManager.showMessage("It's time for my throw.");
    const computerThrow = this.performThrow(computerDice, Config.SIDES_PER_DICE, "My");
    DisplayManager.showMessage("It's time for your throw.");
    const userThrow = this.performThrow(userDice, Config.SIDES_PER_DICE, "Your");
    DisplayManager.showMessage(
      userThrow > computerThrow
        ? Config.Colors.VICTORY(`You win (${userThrow} > ${computerThrow})!`)
        : computerThrow > userThrow
          ? Config.Colors.ERROR(`I win (${computerThrow} > ${userThrow})!`)
          : `It's a tie (${userThrow} = ${computerThrow})!`
    );
  }

  performThrow(dice, range, owner) {
    const { hmac, key, value: rollIndex } = FairRandom.generateRandom(range);
    DisplayManager.showMessage(`I selected a random value in the range 0..${range - 1} (HMAC=${hmac}).`);
    DisplayManager.showMessage(`Add your number modulo ${Config.SIDES_PER_DICE}.`);
    dice.faces.forEach((_, index) => DisplayManager.showMessage(`${index} - ${index}`));
    DisplayManager.showMessage("X - exit\n? - help");
    while (true) {
      const userInput = InputManager.getInput("Your selection: ");
      if (InputManager.handleSpecialInputs(userInput, this.diceList)) continue;

      if (!/^\d+$/.test(userInput) || parseInt(userInput, 10) >= range) {
        DisplayManager.showMessage(Config.Colors.ERROR("Invalid selection. Try again."));
        continue;
      }

      const userValue = parseInt(userInput, 10);
      const resultIndex = (rollIndex + userValue) % Config.SIDES_PER_DICE;
      DisplayManager.showThrowDetails(owner, rollIndex, key, userValue, resultIndex, dice.faces[resultIndex]);
      return dice.faces[resultIndex];
    }
  }
}

module.exports = Game;