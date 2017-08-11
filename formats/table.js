let os = require('os'),
    table = require('cli-table2');

module.exports = function formatTable(data){

  let t = new table({
    head: data.shift()
  });
  for(let r of data){
    t.push(r);
  }
  return t.toString() + os.EOL; // table looks better with a line break at end
}
