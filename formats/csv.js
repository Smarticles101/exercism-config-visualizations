let aToCSV = require('array-to-csv'),
    format = require('../lib/format');

module.exports = function formatCSV(data){
  let d = format.dataFlatten(data, ' ');
  return aToCSV(d);
}
