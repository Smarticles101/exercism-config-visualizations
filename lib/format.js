// utilities for assisting in data formatting

module.exports = {
  dataFlatten: function dataFlatten(data, sep=' '){
    let returner = [];
    for (let row of data){
      let cols = [];
      for(let col of row){
        cols.push( Array.isArray(col) ? col.join(sep) : col);
      }
      returner.push(cols);
    }
    return returner;
  }

}
