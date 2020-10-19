const { Movie } = require('../../build/entity/Movie')
const { User } = require('../../build/entity/User')
const { getRepository } = require('typeorm')
const axios = require('axios')

const API = process.env.API
const API_KEY = process.env.API_KEY

module.exports = {
  Query: {
    movies: async (parent, query) => {
      const response = await axios.get(
        `${API}/discover/movie?api_key=${API_KEY}` +
          `&with_genres=${query.with_genres || ''}` +
          `&vote_average.lte=${(query.vote_average || {}).lte || ''}` +
          `&vote_average.gte=${(query.vote_average || {}).gte || ''}` +
          `&language=${query.language || ''}` +
          `&year=${query.year || ''}`
      )
      return response.data.results.map(movie => ({...movie, movieId: movie.id}))
    },
  },

  Mutation: {
    addMovie: async (parent, { userId, movie }) => {
      const user = await getRepository(User).findOne({ id: userId })
      const movieRepo = getRepository(Movie)
      const newMovie = movieRepo.create(movie)
      newMovie.user = user
      return await movieRepo.save(newMovie)
    },

    watchUnwatchMovie: async (parent, { userId, movieId }) => {
      const movieRepo = await getRepository(Movie)
      const movie = await movieRepo.findOne({ user: userId, movieId })
      movie.watched = !movie.watched
      return movieRepo.save(movie)
    },
  },

  User: {
    movies: async (parent, { language }) => {
      const compressMovies = await getRepository(Movie).find({ user: parent.id })
      const fullInfoMovies = await Promise.all(
        compressMovies.map(async (movie) => {
          const movieAddInfo = await axios.get(
            `${API}/movie/${movie.movieId}?api_key=${API_KEY}&language=${language || ''}`
          )
          return { ...movieAddInfo.data, ...movie }
        })
      )
      return fullInfoMovies
    },
  },
}
