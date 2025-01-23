const Config = require("./Config");

class DiceValidator {
  static validateDice(arg, index) {
    const faces = DiceValidator.parseFaces(arg);
    const errors = DiceValidator.collectErrors(faces, index);
    if (errors.length > 0) {
      throw new Error(errors.join(" "));
    }
    return faces;
  }

  static parseFaces(arg) {
    return arg.split(",").map((value) => (/^-?\d+$/.test(value) ? Number(value) : value));
  }

  static collectErrors(faces, index) {
    const errors = [];
    if (faces.length !== Config.SIDES_PER_DICE) {
      errors.push(Config.ERROR_MESSAGES.INVALID_SIDES(index, faces.length));
    }
    const invalidValues = faces.filter((value) => !Number.isInteger(value));
    if (invalidValues.length > 0) {
      errors.push(Config.ERROR_MESSAGES.NON_INTEGER_VALUES(index, invalidValues));
    }
    return errors;
  }

  static isValidDiceSelection(diceIndex, diceList, excludeDice) {
    return (
      !isNaN(diceIndex) &&
      diceIndex >= 0 &&
      diceIndex < diceList.length &&
      diceList[diceIndex] !== excludeDice
    );
  }
}

module.exports = DiceValidator;
