// This report will display the average exercise difficulty and # of topics
// on a per track basis.
module.exports = function(configfile){

  let output = [['Track', 'Diff', 'Topics']];
  for(let trackSlug in configfile.tracks){
    let track = configfile.tracks[trackSlug],
        count = 0,
        difficulty = 0,
        topics = 0;
    
    for(let exercise of track.exercises){
      
      if(exercise['deprecated']){
        continue;
      }
      count++;
      topics += exercise.topics.length
      difficulty += exercise.difficulty      
    }

    let average = (val) => {
      let av = (val/count);
      return ((av%1 === 0) ? av : av.toFixed(2));
    }
    output.push([trackSlug, average(difficulty), average(topics)]);
  }

  return output;
}
