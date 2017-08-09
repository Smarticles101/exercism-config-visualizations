// This report will list all active exercises by track
module.exports = function(configfile){

  for(let trackSlug in configfile.tracks){
    let track = configfile.tracks[trackSlug];
    let exercises = [];
    for(let exercise of track.exercises){
      if (exercise['depreciated']){
        continue;
      }
      exercises.push(exercise.slug);
    }

    console.log(`${trackSlug} (${exercises.length}):`, ':', exercises.join(', '));
    console.log('');
  }

}
