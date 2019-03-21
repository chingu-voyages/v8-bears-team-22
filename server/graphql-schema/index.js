import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }
`;
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`
  }
};

export { typeDefs, resolvers };
