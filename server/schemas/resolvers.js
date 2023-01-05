const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addProfile: async (parent, args) => {
      const profile = await User.create(args);
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPassword = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(profile);
      return { token, profile };
    },
    saveB: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedProfile = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { saveB: bookData } },
          { new: true }
        );

        return updatedProfile;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    deleteB: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedProfile = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { saveB: { bookId } } },
          { new: true }
        );

        return updatedProfile;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
