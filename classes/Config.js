const clc = require("cli-color");

class Config {
  static SIDES_PER_DICE = 6;
  static MIN_DICE_REQUIRED = 3;

  static Colors = {
    ERROR: clc.red.bold,
    HEADING: clc.magenta.bold.underline,
    VICTORY: clc.green.bold,
  };

  static ERROR_MESSAGES = {
    NO_DICE: Config.Colors.ERROR("No dice provided."),
    TOO_FEW_DICE: (count) => Config.Colors.ERROR(`Only ${count} dice provided.`),
    INVALID_SIDES: (index, found) =>
      Config.Colors.ERROR(`Dice ${index + 1} must contain exactly ${Config.SIDES_PER_DICE} values. Found ${found}.`),
    NON_INTEGER_VALUES: (index, invalidValues) =>
      Config.Colors.ERROR(`Dice ${index + 1} contains invalid (non-integer) values: ${invalidValues.join(", ")}.`),
    EXAMPLES: "Example: node index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3",
  };
}

module.exports = Config;