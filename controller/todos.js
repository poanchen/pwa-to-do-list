const todosService = require('../service/todos')

let list = (req, res) => {
  todosService.list(todos => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({todos: todos}, null, 4))
  })
}

let listByKey = (req, res) => {
  todosService.findByKey(parseInt(req.params.key), todo => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({todo: todo}, null, 4))
  })
}

let create = (req, res) => {
  let todo = todosService.create(req.body.description, todo => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({todo: todo}, null, 4))
  })
}

let deleteByKey = (req, res) => {
  let status = todosService.deleteByKey(parseInt(req.params.key), status => {  
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({status: status}, null, 4))
  })
}

module.exports = {
  list: list,
  listByKey: listByKey,
  create: create,
  deleteByKey: deleteByKey
}
