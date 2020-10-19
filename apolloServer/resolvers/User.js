const { User } = require('../../build/entity/User')
const { getRepository } = require('typeorm')

module.exports = {
  Query: {
    user: async (parent, { login }) => {
      return await getRepository(User).findOne({ login })
    }
  }
}