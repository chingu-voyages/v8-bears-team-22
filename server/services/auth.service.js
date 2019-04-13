import crypto from 'crypto';

class AuthService {
  static async isValidCredentials(db, payloadCreds) {
    const { email, password } = payloadCreds;
    const data = await db.users.findOne({ email });
    if (data) {
      if (this.validatePassword(password, data.password, data.salt)) {
        return {
          validEmail: true,
          validPassword: true,
          email: data.email,
          name: data.name,
          progress: data.progress,
        };
      }
      return {
        validEmail: true,
        validPassword: false,
      };
    }
    return { validEmail: false };
  }

  static hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt.toString('hex'), 10000, 512, 'sha512').toString('hex');
  }

  static validatePassword(fromPayload, fromDB, salt) {
    return this.hashPassword(fromPayload, salt) === fromDB;
  }
}

export default AuthService;
