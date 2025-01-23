class ErrorManager {
  static throwError(message, additionalMessage = "") {
    throw new Error(`${message} ${additionalMessage}`);
  }
}

module.exports = ErrorManager;