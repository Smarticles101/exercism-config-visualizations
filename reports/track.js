// List information about a track
module.exports = function(configfile, targets){
  
  let returner = [['Exercise', 'Difficulty', 'Core', 'Unlocked By', 'Unlocks', 'Topics']],
      trackSlug = targets.shift(),
      track = configfile.tracks[trackSlug],
      formatCore = core => (core ? 'yes' : '');

  for(let exercise of track.exercises){
    if(exercise['deprecated']) continue;
    returner.push([
      exercise.slug,
      exercise.difficulty,
      formatCore(exercise.core),
      exercise.unlocked_by || '',
      track.exercises.filter(e => e.unlocked_by === exercise.slug).map(e => e.slug),
      exercise.topics
    ]);
  }

  returner.sort((a, b) => a[1] - b[1]); // by difficulty ascending

  return returner;
}
