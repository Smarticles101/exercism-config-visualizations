// This report will display the spread of difficulty for one or more tracks
module.exports = function(configfile, targets){

  let output = [[ 'Track', 'Diff', 'Count', 'Exercises']];

  for(let trackSlug in configfile.tracks){

    if(!targets.includes(trackSlug)) continue;

    let track = configfile.tracks[trackSlug],
        difficulties = [];

    for(let exercise of track.exercises){

      // most likely a deprecated exercise
      if(!exercise['difficulty']) continue;

      if(!difficulties[exercise.difficulty]) difficulties[exercise.difficulty] = [];

      difficulties[exercise.difficulty].push(exercise.slug);
    }

    for(let num in difficulties){
      output.push([
        trackSlug,
        num,
        difficulties[num].length,
        difficulties[num]
      ]);
    }
  }

  return output;
}
