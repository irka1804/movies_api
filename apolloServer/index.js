const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

module.exports = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
})
