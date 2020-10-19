const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    user(login: String!): User
  }

  type User {
    id: ID!
    login: String!
    password: String!
    genres: [Genre]
    movies: [Movie]
  }
`
