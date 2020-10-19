const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    genres(language: String): [Genre]
  }

  extend type Mutation {
    likeUnlikeGenre(userId: ID!, genreId: ID!): Genre
  }

  type Genre {
    genreId: ID!
    name: String
    active: Boolean
  }
`
