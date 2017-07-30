const time = require('../lib/time')
const hash = require('../lib/hash')
const AWS  = require('aws-sdk')

let options = {
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-west-2'
}
let dynamodb = new AWS.DynamoDB(options)
let tableName = 'todos'

let list = callback => {
  let params = {
    TableName: tableName
  }

  // to-do: scan has poor performance, safer to use query instead
  dynamodb.scan(params, (err, data) => {
    if (err || data.Items === undefined || data.Count == 0) {
      callback([])
    } else {
      callback(data.Items)
    }
  })
}

let findByKey = (key, callback) => {
  let todo = 'Not Found'
  let params = {
    TableName: tableName,
    Key: {
      key: {
        N: key.toString()
      }
    }
  }

  dynamodb.getItem(params, (err, data) => {
    if (err || data.Item === undefined) {
      callback(todo)
    } else {
      callback(data.Item)
    }
  })
}

let create = (description, callback) => {
  let status = 'Failed'
  let desWithMTime = description + new Date().getTime()
  let hashedDesWithMTime = hash.getHashCode(desWithMTime)
  let todo = {
    key: {
      N: hashedDesWithMTime.toString()
    },
    description: {
      S: description
    },
    createDate: {
      S: time.getTime()
    }
  }
  let params = {
    TableName: tableName,
    Item: {
      key: {
        N: todo.key.N
      },
      description: {
        S: todo.description.S
      },
      createDate: {
        S: todo.createDate.S
      }
    },
    ReturnConsumedCapacity: 'TOTAL'
  }

  dynamodb.putItem(params, (err, data) => {
    if (err || data.ConsumedCapacity.CapacityUnits != 1) {
      callback(status)
    } else {
      callback(todo)
    }
  })
}

let deleteByKey = (key, callback) => {
  let status = 'Failed'
  let params = {
    TableName: tableName,
    Key: {
      key: {
        N: key.toString()
      }
    },
    ReturnConsumedCapacity: 'TOTAL'
  }

  dynamodb.deleteItem(params, (err, data) => {
    if (err || data.ConsumedCapacity.CapacityUnits != 1) {
      callback(status)
    } else {
      callback('Success')
    }
  })

  return status
}

module.exports = {
  list: list,
  findByKey: findByKey,
  create: create,
  deleteByKey: deleteByKey
}
