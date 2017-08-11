let os = require('os'),
    table = require('text-table');

module.exports = function formatTable(data){
  return table(data).toString() + os.EOL; // table looks better with a line break at end
}
