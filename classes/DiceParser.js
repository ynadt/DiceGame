const Config = require("./Config");
const DiceValidator = require("./DiceValidator");
const Dice = require("./Dice");
const ErrorManager = require("./ErrorManager");

class DiceParser {
  static parse(args) {
    if (args.length < Config.MIN_DICE_REQUIRED) {
      const errorMessage =
        args.length === 0
          ? Config.ERROR_MESSAGES.NO_DICE
          : Config.ERROR_MESSAGES.TOO_FEW_DICE(args.length);
      ErrorManager.throwError(`${errorMessage} ${Config.ERROR_MESSAGES.EXAMPLES}`);
    }
    return args.map((arg, index) => {
      const faces = DiceValidator.validateDice(arg, index);
      return new Dice(faces);
    });
  }
}

module.exports = DiceParser;