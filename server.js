const json    = require('./config/config.json')
const express = require('express')
const app     = express()

app.set('port', json.port || 8080)
app.use(express.static(__dirname + json.root))

app.listen(app.get('port'), function () {
  console.log(`Example app listening on port ${app.get('port')}!`)
})
