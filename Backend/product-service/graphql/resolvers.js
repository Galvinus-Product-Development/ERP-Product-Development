const Product = require("../models/Product");

const resolvers = {
  Query: {
    products: async () => await Product.findAll(),
    product: async (_, { id }) => await Product.findByPk(id),
  },
  Mutation: {
    createProduct: async (_, { product_name, product_description, price, stock }) => {
      return await Product.create({ product_name, product_description, price, stock });
    },
  },
};

module.exports = resolvers;
