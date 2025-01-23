const crypto = require("crypto");

class FairRandom {
  static generateRandom(range) {
    const key = crypto.randomBytes(32);
    const value = crypto.randomInt(0, range);
    const hmac = crypto.createHmac("sha3-256", key).update(value.toString()).digest("hex");
    return { key: key.toString("hex"), value, hmac };
  }
}

module.exports = FairRandom;