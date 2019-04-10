import { gql } from 'apollo-server-express';

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
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    messages: async (parent, args, context) =>
      (await context.db.messages.find({}).toArray()).map(item => item.text), // eslint-disable-line
  },

  Mutation: {
    // eslint-disable-next-line
    message: async (parent, { text }, context) => context.db.messages.insert({ text }).then((doc, err) => {
      if (err) return 'Failure';
      return 'Success';
    }),
  },
};

export { typeDefs, resolvers };
