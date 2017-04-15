const time = require('../lib/time')
const hash = require('../lib/hash')

let todos = [
  {
    key: -1460539500,
    description: '1',
    createDate: 'Fri, 14 Apr 2017 23:40:51'
  },
  {
    key: -955044397,
    description: '2',
    createDate: 'Fri, 14 Apr 2017 23:40:48'
  },
  {
    key: -450197754,
    description: '3',
    createDate: 'Fri, 14 Apr 2017 23:40:29'
  }
]

let list = function() {
  return todos
}

let findByKey = function(key) {
  let todo = 'Not Found'

  todos.forEach(eachTodo => {
    if (eachTodo.key == key) {
      todo = eachTodo
      return
    }
  })

  return todo
}

let create = function(description) {
  let desWithMTime = description + new Date().getTime()
  let hashedDesWithMTime = hash.getHashCode(desWithMTime)
  let todo = {
    key: hashedDesWithMTime,
    description: description,
    createDate: time.getTime()
  }

  todos.push(todo)

  return todo
}

let deleteByKey = function(key) {
  let status = 'Failed'
  let indexToBeRemoved = 'Not Found'

  todos.forEach((eachTodo, index) => {
    if (eachTodo.key == key) {
      indexToBeRemoved = index
      return
    }
  })

  if (indexToBeRemoved != 'Not Found') {
    todos.splice(indexToBeRemoved, 1)
    status = 'Success'
  }

  return status
}

module.exports = {
  list: list,
  findByKey: findByKey,
  create: create,
  deleteByKey: deleteByKey
}
