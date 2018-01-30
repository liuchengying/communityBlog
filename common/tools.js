const validataId = {
  name: function (str) {
    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
  },
  isEmail: function (str) {
    return (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(str);
  }
}

module.exports = {
  validataId
}