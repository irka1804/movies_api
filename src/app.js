const express = require('express')
const querystring = require('querystring');
const request = require('request')

const external_api = 'https://api.themoviedb.org/3'
const api_key = 'f083e98b573c9bca9dca52e1113df4b9'

const app = express()

app.get('/genres', (req, res) => {
    request.get(
        `${external_api}/genre/movie/list?api_key=${api_key}`, 
        (err, response, body) => {
            if (err)
                return res.status(500).send({ message: err })

            return res.send(body)
        }
    )
})

app.get('/movies', (req, res) => {
    request.get(
        `${external_api}/discover/movie?api_key=${api_key}&${querystring.stringify(req.query)}`,

        (err, response, body) => {
            if (err)
                return res.status(500).send({ message: err })

            return res.send(body)
        }
    )
})

app.listen(3001)
