const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const MyGraphQLSchema = buildSchema(`
  type Query {
    hello: String
  }
`);

const Root = {
  hello: () => {
    return 'Hello world!';
  },
};

const app = express();
const PORT = process.env.APP_PORT || 4000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema: MyGraphQLSchema,
    rootValue: Root,
    graphiql: true,
  }),
);

app.listen(PORT, () => console.log(`App server running on ${PORT}`));