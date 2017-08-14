// list all the lock and unlocks across tracks for a single exercise
module.exports = function(configfile, targets){

  let output = [['Track', 'Core', 'Unlocked By', 'Unlocks']],
      exerciseSlug = targets.shift(),
      // don't show a value for non core it is easier on the eyes
      formatCore = core => core ? 'yes': '';

  for(let trackSlug in configfile.tracks){

    let track = configfile.tracks[trackSlug],
        // find first (only) occurrence of exercise in track
        exercise = track.exercises.find(e => e.slug === exerciseSlug),
        unlocks = [];

    // early exit if the exercise is unimplemented in this track
    if(!exercise) continue;

    // early exit if this track has not yet implemented locking
    // (we cant find a single exercise with a value in the unlocked_by var)
    if(track.exercises.filter(e => !!e.unlocked_by).length === 0) continue;

    // go through all the exercises in the track again to see if any are unlocked
    // by this target exercise
    for(let e of track.exercises){
      if(e.unlocked_by == exercise.slug) unlocks.push(e.slug);
    }

    output.push([
      trackSlug,
      formatCore(exercise.core),
      exercise.unlocked_by,
      unlocks]);
  }

  return output;
}
