// This reports the tracks and exercise count.
// Also a good example of how to make a report...
module.exports = function(configfile, targets){
  // configfile is in uniconfig format
  // targets is variadic: basically whatever args are left on the command line

  // initialize return array with header row
  let returner = [['Track', 'Exercise Count']];
  for(let slug in configfile.tracks){
    let track = configfile.tracks[slug]
    returner.push([slug, track.exercises.length]);
  }

  // returning a two dimensional array which will allow the program
  // to output as CSV or tabular.
  return returner;
};
