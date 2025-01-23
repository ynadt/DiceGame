class ProbabilityCalculator {
  static calculateWinProbability(userDice, computerDice) {
    const userFaces = userDice.faces;
    const computerFaces = computerDice.faces;

    const winCount = userFaces
      .flatMap((userFace) => computerFaces.map((computerFace) => userFace > computerFace))
      .filter((isWin) => isWin).length;

    const totalCombinations = userFaces.length * computerFaces.length;
    return winCount / totalCombinations;
  }
}

module.exports = ProbabilityCalculator;