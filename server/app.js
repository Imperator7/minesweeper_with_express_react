const express = require('express')

const gameController = require('./controllers/gameController')
const app = express()

app.use(express.json())

let games = {}

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'hello world',
  })
})

app.get('/api/games', (req, res) => {
  res.json({
    data: games,
  })
})

app.post('/api/game', (req, res) => {
  const gameId = Date.now() //for developing only **********
  const bombAmount = 10
  const gridSize = [10, 8] // x, y length of the grid

  const playGrid = gameController.createGrid(gridSize)
  const bombPoints = gameController.generateBombs(gridSize, bombAmount) // generate x,y points of the bomb point

  gameController.placeBombs(playGrid, bombPoints)
  gameController.generateHint(playGrid, bombPoints, gridSize)

  gameController.createGame(gameId, playGrid, games)
  res.json({
    status: 'success',
    message: 'create game successfully',
    data: {
      gameId,
    },
  })
})

app.post('/api/game/:gameId/guess', (req, res) => {
  const gameId = req.params.gameId
  const cell = req.body.cell

  const result = gameController.checkGuess(cell, games[gameId])

  res.json({
    status: 'success',
    result,
  })
})

app.post('/api/game/:gameId/flag', (req, res) => {
  const gameId = req.params.gameId
  const cell = req.body.cell

  const result = gameController.addFlag(cell, games[gameId])

  res.json({
    status: 'success',
    result,
  })
})

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    data: `Can't find ${req.originalUrl} on this server!`,
  })
})

module.exports = app
