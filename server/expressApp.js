import express from 'express';
import cors from 'cors';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import { resolvers, typeDefs } from './graphql-schema';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

const expressApp = (db) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db },
  });

  server.applyMiddleware({ app });

  async function isValidCredentials(payloadCreds) {
    // TODO fetch credentials from DB
    const { email, password } = payloadCreds;
    const data = await db.users.findOne({ email });
    if (data) {
      if (password === data.password) {
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

    // console.log(data);
    // const validCredentials = { email: 'test@email.com', password: 'password' };
    // return payloadCreds.email === validCredentials.email
    //   && payloadCreds.password === validCredentials.password;
  }

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

  router.get('/', (req, res) => {
    res.json({ message: 'Hello' });
  });

  router.post('/account/login', async (req, res) => {
    res.json({
      result: await isValidCredentials(req.body),
    });
  });

  router.get('/db', (req, res) => {
    db.messages.find({}).toArray((err, docs) => {
      if (err) return err;
      return docs;
    });
    res.redirect('/api');
  });

  return app;
};

export default expressApp;
