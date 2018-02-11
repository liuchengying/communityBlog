let markdown = require('markdown-it');

let md = new markdown({
  html: true,
  prefix: 'code-',
});

module.exports = md;