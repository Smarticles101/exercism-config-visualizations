let os = require('os'),
    table = require('markdown-table');

module.exports = function formatMarkdownTable(data){
  return table(data) + os.EOL; // table looks better with a line break at end
}


