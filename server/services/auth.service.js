import crypto from 'crypto';
import jwt from 'jsonwebtoken';

class AuthService {
  static async isValidCredentials(db, payloadCreds) {
    const { email, password } = payloadCreds;
    const data = await db.users.findOne({ email });
    if (data) {
      if (this.validatePassword(password, data.password, data.salt)) {
        const token = this.createToken(data);
        console.log(token);
        return {
          validEmail: true,
          validPassword: true,
          email: data.email,
          name: data.name,
          progress: data.progress,
          token,
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

  static createToken(user) {
    return jwt.sign({ email: user.email, name: user.name },
      'test', {
        expiresIn: '24h',
      });
  }

  static validateToken(tokenParam) {
    let token = tokenParam;
    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, 'test');
        console.log(decoded);
        return decoded;
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  // eslint-disable-next-line consistent-return
  static checkToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!AuthService.validateToken(token)) {
      return res.json({
        success: false,
        message: 'Token is not valid',
      });
    }
    next();
  }
}

export default AuthService;
