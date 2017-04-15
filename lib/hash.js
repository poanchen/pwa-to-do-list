// source are from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
// or http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
getHashCode = (desWithMTime) => {
  let hash = 0, i, chr, len

  if (desWithMTime.length === 0) {
  	return hash
  }

  for (i = 0, len = desWithMTime.length; i < len; i++) {
    chr   = desWithMTime.charCodeAt(i)
    hash  = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }

  return hash
}

module.exports = {
  getHashCode: getHashCode
}
