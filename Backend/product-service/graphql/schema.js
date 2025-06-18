const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Product {
    product_id: ID!
    product_name: String!
    product_description: String!
    price: Float!
    stock: Int!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(product_name: String!, product_description: String!, price: Float!, stock: Int!): Product
  }
`;

module.exports = typeDefs;
