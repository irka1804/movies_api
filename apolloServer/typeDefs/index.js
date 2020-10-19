const { gql } = require('apollo-server-express')
const User = require('./User')
const Genre = require('./Genre')
const Movie = require('./Movie')

const linkedSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`

module.exports = [linkedSchema, User, Genre, Movie]
