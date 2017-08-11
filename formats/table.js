let format = require('../lib/format'),
    os = require('os'),
    table = require('text-table');

module.exports = function formatTable(data){
  let d = format.dataFlatten(data, ', ');
  return table(d).toString() + os.EOL; // table looks better with a line break at end
}
