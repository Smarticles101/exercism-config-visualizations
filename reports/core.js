// Display a list of core exercises for each track
module.exports = function(configfile, targets){

  let output = [[ 'Track', 'Exercises']];

  for(let trackSlug in configfile.tracks){

    let track = configfile.tracks[trackSlug],
        cores = [];

    for(let exercise of track.exercises){
      if(exercise.core) cores.push(exercise.slug);
    }

    if(cores.length === 0) continue;
    output.push([trackSlug, cores]);
  }

  return output;
}
