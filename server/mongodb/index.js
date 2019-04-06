import { MongoClient } from 'mongodb';

const uri = process.env.DB_STRING;

const mongod = async () => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
  });
  const mdb = client.db('prep');
  const messages = mdb.collection('messages');
  const users = mdb.collection('users');

  return { messages, users };
};

export default mongod;
