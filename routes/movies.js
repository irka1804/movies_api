const express = require('express')
const querystring = require('querystring')
const request = require('request')
const router = express.Router()

const external_api = process.env.API
const api_key = process.env.API_KEY

router.get('/', (req, res) => {
  request.get(
    `${external_api}/discover/movie?api_key=${api_key}&${querystring.stringify(
      req.query
    )}`,

    (err, response, body) => {
      if (err) return res.status(500).send({ message: err })

      res.send(body)
    }
  )
})

module.exports = router
