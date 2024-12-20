import bcrypt from "bcrypt";

export default class Hash {
  static hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  static passwordMatch(password, confirmPassword) {
    return bcrypt.compare(password, confirmPassword);
  }
}
