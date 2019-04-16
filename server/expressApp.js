import express from 'express';
import cors from 'cors';
import path from 'path';
import {ApolloServer} from 'apollo-server-express';
import {resolvers, typeDefs} from './graphql-schema';
import authRouter from "./routes/auth.route";
import apiRoute from "./routes/api.route";
import AuthService from "./services/auth.service";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

const expressApp = (db) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db },
  });

  server.applyMiddleware({ app });

  const passDB = (req, res, next) => {
    req.db = db;
    next();
  };

  app.use(passDB);
  app.use('/auth', passDB, authRouter);
  app.use('/api', (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!AuthService.validateToken(token)) {
      return res.json({
        success: false,
        message: 'Token is not valid'
      });
    } else {
      next();
    }
  }, apiRoute);

  return app;
};

export default expressApp;
