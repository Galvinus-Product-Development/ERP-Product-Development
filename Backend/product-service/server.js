const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const brandRoutes = require("./routes/brandRoutes");
const colourRoutes = require('./routes/colourRoutes');
const productReviewRoutes = require('./routes/productReviewRoutes');
const ratingTypeRoutes = require('./routes/ratingTypeRoutes');
const sizeCategoryRoutes = require('./routes/sizeCategoryRoutes');
const sizeOptionRoutes = require('./routes/sizeOptionRoutes');
const productImageRoutes=require('./routes/productImageRoutes');
const productItemRoutes = require('./routes/productItemRoutes');
const productCategoryRoutes = require('./routes/productCategoryRoutes');
//const productReviewRoutes = require('./routes/productReviewRoutes');
const ratingProductRoutes = require('./routes/ratingProductRoutes');
const homepageRoutes = require("./routes/homepage");
const { connectDB } = require("./config/db");
const { redisClient } = require("./config/redis");
//const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

dotenv.config();
const app = express();

// Middleware
app.use(morgan("dev")); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect PostgreSQL
connectDB();

// Connect Redis
redisClient.connect().catch(console.error);

// Initialize Apollo Server (v4)
const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server.start();
  app.use("/graphql", expressMiddleware(server));
}

startApolloServer();

// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/colours", colourRoutes);
app.use("/api/v1/rating-types", ratingTypeRoutes);
app.use("/api/v1/size-categories", sizeCategoryRoutes);
app.use("/api/v1/size-options", sizeOptionRoutes);
app.use("/api/v1/product-images", productImageRoutes);
app.use("/api/v1/product-items", productItemRoutes);
app.use("/api/v1/product-categories", productCategoryRoutes);
app.use("/api/v1/product-reviews", productReviewRoutes);
app.use("/api/v1/product-ratings", ratingProductRoutes);
app.use("/api/v1/homepage", homepageRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
