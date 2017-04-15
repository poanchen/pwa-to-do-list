const config  = require('./config/config.json')
const express = require('express')
const app     = express()

app.set('port', (process.env.PORT || config.port))
app.use(express.static(__dirname + config.root))

app.listen(app.get('port'), function () {
  console.log(`NodeJS powered app listening on port ${app.get('port')}!`)
})
