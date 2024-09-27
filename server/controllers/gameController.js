// axis is on x,y in every function

exports.createGrid = function (gridSize) {
  let grid = []
  for (let i = 0; i < gridSize[1]; i++) {
    grid.push(new Array(gridSize[0]).fill(0))
  }
  return grid
}

exports.generateBombs = function (gridSize, bombAmount) {
  let i = 0
  const bombPoints = []
  while (i < bombAmount) {
    // generate bomb point in format of a string 'x,y' before convert it into array of number ([x,y])
    let bombX = Math.floor(Math.random() * gridSize[0]) + ''
    let bombY = Math.floor(Math.random() * gridSize[1]) + ''
    if (bombPoints.includes(bombX + ',' + bombY)) continue
    bombPoints.push(bombX + ',' + bombY)
    i++
  }
  return [...bombPoints].map((el) => el.split(',').map(Number)).sort()
}

exports.placeBombs = function (grid, bombPoints) {
  for (bomb of bombPoints) {
    grid[bomb[1]][bomb[0]] = -1
  }
}

exports.generateHint = function (grid, bombPoints, gridSize) {
  let adjacentPoints = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  for (let bomb of bombPoints) {
    for (adjust of adjacentPoints) {
      let newX = bomb[0] + adjust[0]
      let newY = bomb[1] + adjust[1]
      if (0 <= newX && newX < gridSize[0] && 0 <= newY && newY < gridSize[1]) {
        if (grid[newY][newX] !== -1) grid[newY][newX] += 1
      }
    }
  }
}

exports.checkGuess = function (guess, game) {
  const [x, y] = guess.split(' ')
  if (game.grid[y][x] == -1) {
    // selected on the bomb
    return {
      result: 'lose',
      score: game.score,
      message: 'You lose, try again T   T',
    }
  } else if (game.score == 10) {
    return {
      result: 'success',
      score: game.score,
      message: 'Congratulation!',
    }
  } else {
    return {
      result: 'success',
      score: game.score,
      message: `The hint is ${game.grid[y][x]}`,
    }
  }
}

exports.createGame = function (gameId, grid, games) {
  const score = 0
  const flags = new Set()
  games[gameId] = { grid, score, flags }
}

exports.addFlag = function (flag, game) {
  console.log(game, flag)
}
