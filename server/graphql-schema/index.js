import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello(name: String): String!
    messages: [String]
  }

  type Mutation {
    message(text: String!): String
  }
`;
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    messages: async (parent, args, context) => {
      return (await context.db.messages.find({}).toArray()).map(
        item => item.text
      );
    }
  },

  Mutation: {
    message: async (parent, { text }, context) => {
      return await context.db.messages.insert({ text }).then((doc, err) => {
        if (err) return "Failure";
        return "Success";
      });
    }
  }
};

export { typeDefs, resolvers };
