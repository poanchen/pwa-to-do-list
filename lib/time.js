let getTime = function () {
  let date = new Date()
  date.setUTCHours(date.getUTCHours() - 7)
  let dateToString = date.toUTCString().replace('GMT', '').trim()

  return dateToString
}

module.exports = {
  getTime: getTime
}
