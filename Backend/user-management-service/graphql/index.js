// graphql/index.js
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const authResolvers = require('./resolvers/authResolvers');
const authenticate = require('../middlewares/authMiddleware');


const typeDefs = loadSchemaSync('graphql/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});
const resolvers = authResolvers;

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Async function to start Apollo Server
async function startServer(app) {

  await server.start();
  console.log('Apollo Server started');
  // Apply authentication middleware to all routes before Apollo Server
  app.use(authenticate); 

  // Log message when authentication middleware is applied
  console.log('Authentication middleware applied');

 // GraphQL endpoint middleware
 app.use(
  '/graphql',
  cors({ origin: ['http://localhost:5173', 'http://192.168.29.199:5173'], credentials: true }),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      let userId = null;

      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          userId = decoded.userId;
        } catch (error) {
          console.error('Invalid token');
        }
      }

      return { userId };
    },
  })
);

console.log('GraphQL server set up at /graphql');
}

module.exports = startServer;
