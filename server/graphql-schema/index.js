import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    hello(name: String): String!
    messages: [String]
  }

  type Mutation {
    message(text: String!): String
    deleteUser(email: String!,password: String): Int
    resetProgress(email: String!): Int
    updateDetails(email: String!, name: String, newEmail: String, password: String): Int
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
    message: async (parent, { text }, context) => context.db.messages.insert({ text })
      .then((doc, err) => {
        if (err) return 'Failure';
        return 'Success';
      }),
    deleteUser: async (parent, { email, password }, context) => context.db.users.deleteOne({ email }).then(response => response.result.n), // const dbPassword = await context.db.users.findOne({email}).then(data=>data.password)
    // if(dbPassword===password){
    //     return await context.db.users.deleteOne({email}).then(response=>response.result.n)
    // }
    // return "Wrong Password"

    resetProgress: async (parent, { email }, context) => context.db.users.updateOne({ email }, { $set: { progress: 99 } })
      .then(response => response.result.n),
    updateDetails: async (parent, {
      email, name, newEmail, password,
    }, context) => {
      const output = {};
      name ? output.name = name : false;
      newEmail ? output.email = newEmail : false;
      password ? output.password = password : false;
      return context.db.users.updateOne({ email }, { $set: output })
        .then(response => response.result.n);
    },
  },
};

export { typeDefs, resolvers };
