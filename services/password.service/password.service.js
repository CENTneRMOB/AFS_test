const bcrypt = require("bcrypt");

const SALT = 10;

class PasswordService {
  static async hash(password) {
    return bcrypt.hash(password, SALT);
  }

  static async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = {
  PasswordService,
};
