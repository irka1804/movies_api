const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    movies(query: InputQuery): [Movie]
  }

  extend type Mutation {
    addMovie(userId: ID!, movie: InputMovie): Movie
    watchUnwatchMovie(userId: ID!, movieId: ID!): Movie
  }

  input InputQuery {
    with_genres: [ID!]
    vote_average: VoteAverage
    language: String
    year: String
  }

  input VoteAverage {
    gte: Float
    lte: Float
  }

  input InputMovie {
    movieId: ID!
    title: String
    poster_path: String
    releas_date: String
  }

  type Movie {
    movieId: ID!
    title: String
    poster_path: String
    releas_date: String
    watched: Boolean
  }
`
