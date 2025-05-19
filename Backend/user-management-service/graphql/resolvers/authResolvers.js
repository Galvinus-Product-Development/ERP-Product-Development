// graphql/resolvers/authResolvers.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = require('../../models/prisma/prismaClient');

module.exports = {
  Query: {
    getUser: async (_, { id }) => {
      return await prisma.user.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error('User not found');
      }

      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        throw new Error('Invalid password');
      }

      // Create JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return token;
    },

    register: async (_, { name, email, password }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('Email already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return token;
    },
  },
};
