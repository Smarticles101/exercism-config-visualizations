// This report will display the number of tracks that implement each exercise
module.exports = function(configfile, targets){

  let output = [[ 'Exercise', 'Count', 'Tracks']],
      exercises = {};
  
  
  for(let trackSlug in configfile.tracks){
    
    for(let exercise of configfile.tracks[trackSlug].exercises){
      let {slug} = exercise;

      if(!exercises[slug]) exercises[slug] = {
        slug,
        tracks: []
      }

      exercises[slug].tracks.push(trackSlug);
    }  
  }

  exercises = Object.values(exercises);
  exercises.sort((a, b) => b.tracks.length - a.tracks.length);

  for(let exercise of exercises){
    output.push([
      exercise.slug,
      exercise.tracks.length,
      exercise.tracks.join(', ')
    ]);
  }
  
  return output;
}
