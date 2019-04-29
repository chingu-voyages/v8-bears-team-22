import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// Created using: node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
// Reference: https://github.com/dwyl/hapi-auth-jwt2/issues/48
const secret = process.env.JWT_API_SECRET;

class AuthService {
  static async isValidCredentials(db, payloadCreds) {
    const { email, password } = payloadCreds;
    const data = await db.users.findOne({ email });
    if (data) {
      if (this.validatePassword(password, data.password, data.salt)) {
        const token = this.createToken(data);
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

  static async registerUser(db, payloadCreds) {
    const { email, name, password } = payloadCreds;
    try {
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = this.hashPassword(password, salt);
      await db.users.insertOne({
        email, name, password: hashedPassword, salt,
      });
      return {
        message: 'User Succesfully Registered',
      };
    } catch (err) {
      if (err.code === 11000) {
        return {
          error: 'Email already registered',
        };
      }
      return {
        error: 'Unspecified Error',
      };
    }
  }

  static hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt.toString('hex'), 10000, 512, 'sha512').toString('hex');
  }

  static validatePassword(fromPayload, fromDB, salt) {
    return this.hashPassword(fromPayload, salt) === fromDB;
  }

  static createToken(user) {
    return jwt.sign({ email: user.email, name: user.name },
      secret, {
        expiresIn: '24h',
      });
  }

  static validateToken(tokenParam) {
    let token = tokenParam;
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    if (token) {
      try {
        return jwt.verify(token, secret);
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
