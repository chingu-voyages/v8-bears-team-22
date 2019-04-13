import { MongoClient } from 'mongodb';
import crypto from 'crypto';
import AccountService from '../services/auth.service';

const uri = process.env.DB_STRING;

const mongod = async () => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
  });
  const mdb = client.db('prep');
  const messages = mdb.collection('messages');
  const users = mdb.collection('users');

  users.removeMany();

  // TODO Should be externalized to a service/repository
  const salt = crypto.randomBytes(16).toString('hex');
  users.insertOne({
    email: 'test@email.com',
    password: AccountService.hashPassword('password', salt),
    salt,
  });

  return { messages, users };
};

export default mongod;
