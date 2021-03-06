// This report will display information about one or more exercises
// details on a per track basis
module.exports = function(configfile, targets){

  let output = [['Exercise', 'Track', 'Diff', 'Topics']];
  for(let trackSlug in configfile.tracks){
    let track = configfile.tracks[trackSlug];
    for(let exercise of track.exercises){

      if(!targets.includes(exercise.slug)){
        continue;
      }

      output.push([exercise.slug, trackSlug, exercise.difficulty, exercise.topics]);
    }
  }

  return output;
}
