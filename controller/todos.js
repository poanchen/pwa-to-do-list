const todosService = require('../service/todos')

let list = function(req, res) {
  let todos = todosService.list()

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({todos: todos}, null, 4))
}

let listByKey = function(req, res) {
  let todo = todosService.findByKey(parseInt(req.params.key))

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({todo: todo}, null, 4))
}

let create = function(req, res) {
  let todo = todosService.create(req.body.description)

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({todo: todo}, null, 4))
}

let deleteByKey = function(req, res) {
  let status = todosService.deleteByKey(parseInt(req.params.key))

  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({status: status}, null, 4))
}

module.exports = {
  list: list,
  listByKey: listByKey,
  create: create,
  deleteByKey: deleteByKey
}
