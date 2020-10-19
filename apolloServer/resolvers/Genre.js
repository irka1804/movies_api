const { Genre } = require('../../build/entity/Genre')
const { getRepository } = require('typeorm')
const axios = require('axios')

const API = process.env.API
const API_KEY = process.env.API_KEY

module.exports = {
  Query: {
    genres: async (parent, { language }) => {
      const response = await axios.get(
        `${API}/genre/movie/list?api_key=${API_KEY}&language=${language || ''}`
      )
      return response.data.genres.map((genre) => ({
        ...genre,
        genreId: genre.id,
      }))
    },
  },

  Mutation: {
    likeUnlikeGenre: async (parent, { userId, genreId }) => {
      const genreRepo = await getRepository(Genre)
      const genre =
        (await genreRepo.findOne({ user: userId, genreId })) ||
        genreRepo.create({ user: userId, genreId })
      genre.active = !genre.active
      return await genreRepo.save(genre)
    },
  },

  User: {
    genres: async (parent) => {
      return await getRepository(Genre).find({ user: parent.id, active: true })
    },
  },
}
