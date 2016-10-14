var getTime = function () {
  var date = new Date();
  date.setUTCHours(date.getUTCHours() - 7);
  var dateToString = date.toUTCString().replace('GMT', '').trim();
  return dateToString;
};