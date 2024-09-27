require('dotenv').config({ path: '../config.env' })

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION')
  console.log(err.name, err.message)

  process.exit(1)
})

const app = require('./app')

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
