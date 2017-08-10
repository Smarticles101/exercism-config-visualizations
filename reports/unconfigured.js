// This report will display the average exercise difficulty and # of topics
// on a per track basis.
module.exports = function(configfile){

  let boolTranslate = b => (b ? 'no' : 'yes'),
      data = require('./averages')(configfile), // piggyback on averages to mine tracks with missing data
      output = [['Track', 'Diff', 'Topics']];

  data.shift(); // remove header row
  for(let track of data){
    let slug = track[0],
        diff = (track[1] == 1), // if difficulty averages to 1 difficulty is probably not set
        topics = (track[2] == 0); // if average # of topics is 0 no topics set

    if(diff || topics) output.push([
      slug, // track slug
      boolTranslate(diff),
      boolTranslate(topics)
    ]);
  }

  return output;
}
