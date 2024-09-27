// axis is on x,y in every function

function createGrid(gridSize) {
  let grid = []
  for (let i = 0; i < gridSize[1]; i++) {
    grid.push(new Array(gridSize[0]).fill(0))
  }
  return grid
}

function generateBombs(gridSize, bombAmount) {
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

function placeBombs(grid, bombPoints) {
  for (bomb of bombPoints) {
    grid[bomb[1]][bomb[0]] = -1
  }
}

function generateHint(grid, bombPoints, gridSize) {
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

function main() {
  let bombAmount = 10
  let gridSize = [10, 8] // x, y length of the grid

  let playGrid = createGrid(gridSize)

  const bombPoints = generateBombs(gridSize, bombAmount) // generate x,y points of the bomb point

  console.log(bombPoints)

  placeBombs(playGrid, bombPoints)
  generateHint(playGrid, bombPoints, gridSize)

  console.log(playGrid)

  let finish = false
  while (!finish) {
    // const trial = prompt('Enter your guess')
    finish = true
  }
}

main()
