let format = require('../lib/format'),
    os = require('os'),
    table = require('markdown-table');

module.exports = function formatMarkdownTable(data){
  let d = format.dataFlatten(data, ', ');
  return table(d) + os.EOL; // table looks better with a line break at end
}
