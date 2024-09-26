const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'hello world',
  })
})

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    data: `Can't find ${req.originalUrl} on this server!`,
  })
})

module.exports = app
