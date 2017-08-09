// This report will display information about one or more exercises
// details on a per track basis
let table = require('cli-table2');

module.exports = function(configfile, targets){

  let t = new table({
    head: ['Exercise', 'Track', 'Diff', 'Topics']
  });

  for(let trackSlug in configfile.tracks){
    let track = configfile.tracks[trackSlug];
    for(let exercise of track.exercises){

      if(!targets.includes(exercise.slug)){
        continue;
      }

      t.push([exercise.slug, track.language, exercise.difficulty, exercise.topics.join(', ')]);
    }
  }

  console.log(t.toString());
}
