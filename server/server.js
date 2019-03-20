import express from "express";
import cors from "cors";
import path from "path";
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql-schema");

const app = express();
const router = express.Router();

app.use(cors());
app.use("/api", router);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

router.get("/", (req, res) => {
  res.json({ message: "Hello" });
  // res.send('Api')
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening on port:${process.env.PORT || 5000}`);
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
});

export default app;
