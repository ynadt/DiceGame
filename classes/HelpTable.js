const AsciiTable = require("ascii-table");
const Config = require("./Config");
const ProbabilityCalculator = require("./ProbabilityCalculator");
const DisplayManager = require("./DisplayManager");

class HelpTable {
  static display(diceList) {
    const table = new AsciiTable("Probability of Winning");
    table.setHeading(
      "User Dice vs",
      ...diceList.map((d) => d.faces.join(","))
    );

    diceList.forEach((userDice, i) => {
      table.addRow(
        userDice.faces.join(","),
        ...diceList.map((computerDice, j) =>
          i === j ? "- (0.3333)" : ProbabilityCalculator.calculateWinProbability(userDice, computerDice).toFixed(4)
        )
      );
    });

    DisplayManager.showMessage(Config.Colors.HEADING(table.toString()));
  }
}

module.exports = HelpTable;