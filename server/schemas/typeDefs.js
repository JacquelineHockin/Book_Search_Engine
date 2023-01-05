const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: Profile
  }

  type Query {
    me: Profile
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addProfile(username: String!, email: String!, password: String!): Auth
    saveB(bookData: BookInput!): Profile
    deleteB(bookId: ID!): Profile
  }
`;

module.exports = typeDefs;
