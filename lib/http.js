let buildJSONResponse = (res, json) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(json, null, 4))
}

module.exports = {
  buildJSONResponse: buildJSONResponse
}
