const config     = require('./config/config.json')
const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const todos      = require('./controller/todos')

app.set('port', (process.env.PORT || config.port))
app.use(express.static(__dirname + config.root))
app.use(bodyParser.json())

// api/todos end point
app.get('/api/todos', todos.list)
app.get('/api/todos/:key', todos.listByKey)
app.post('/api/todos', todos.create)
app.delete('/api/todos/:key', todos.deleteByKey)

app.listen(app.get('port'), function() {
  console.log(`NodeJS powered app listening on port ${app.get('port')}!`)
})
