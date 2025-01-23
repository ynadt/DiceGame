const Config = require("./Config");
const ErrorManager = require("./ErrorManager");

class Dice {
  constructor(faces) {
    if (!Array.isArray(faces) || faces.length !== Config.SIDES_PER_DICE || !faces.every(Number.isInteger)) {
      ErrorManager.throwError(`Each dice must have exactly ${Config.SIDES_PER_DICE} valid integers.`);
    }
    this.faces = faces;
  }
}

module.exports = Dice;