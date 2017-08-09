// This report will list all active exercises by track
module.exports = function(configfile){

  let returner = [['Track', 'Count', 'Exercises']];
  for(let trackSlug in configfile.tracks){
    let track = configfile.tracks[trackSlug];
    let exercises = [];
    for(let exercise of track.exercises){
      if (exercise['depreciated']){
        continue;
      }
      exercises.push(exercise.slug);
    }

    returner.push([trackSlug, exercises.length, exercises.join(', ')]);
  }

  return returner;
}
