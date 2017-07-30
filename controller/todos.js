const todosService = require('../service/todos')
const http         = require('../lib/http')

let list = (req, res) => {
  todosService.list(todos => {
    http.buildJSONResponse(res, {todos: todos})
  })
}

let listByKey = (req, res) => {
  todosService.findByKey(parseInt(req.params.key), todo => {
    http.buildJSONResponse(res, {todo: todo})
  })
}

let create = (req, res) => {
  let todo = todosService.create(req.body.description, todo => {
    http.buildJSONResponse(res, {todo: todo})
  })
}

let deleteByKey = (req, res) => {
  let status = todosService.deleteByKey(parseInt(req.params.key), status => {  
    http.buildJSONResponse(res, {status: status})
  })
}

module.exports = {
  list: list,
  listByKey: listByKey,
  create: create,
  deleteByKey: deleteByKey
}
