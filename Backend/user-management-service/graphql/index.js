// graphql/index.js
const { ApolloServer } = require('@apollo/server');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const authResolvers = require('./resolvers/authResolvers');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticate  = require('../middlewares/authMiddleware'); 


const typeDefs = loadSchemaSync('graphql/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});
const resolvers = authResolvers;

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    let userId = null;

    // If token exists, decode it
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch (error) {
        console.error('Invalid token');
      }
    }

    // Return userId in context
    return { userId };
  },
});

// Async function to start Apollo Server
async function startServer(app) {
  // Apply authentication middleware to all routes before Apollo Server
  app.use(authenticate); 

  // Log message when authentication middleware is applied
  console.log('Authentication middleware applied');

  // Start Apollo Server
  await server.start();
  
  // Log message when Apollo Server has started
  console.log('Apollo Server started');

  // Apply Apollo Server as middleware to the existing app
  server.applyMiddleware({ app, path: '/graphql' });
  
  // Log message when GraphQL endpoint is applied
  console.log('GraphQL server set up at /graphql');

  // Return the app for use in the app.js file
  return app;
}

module.exports = startServer; 
