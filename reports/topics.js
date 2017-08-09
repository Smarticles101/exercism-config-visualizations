let table = require('cli-table2');

// This report will list all used topics and the # of time used
module.exports = function(configfile){

  let topics = {};
  for(let trackSlug in configfile.tracks){
//    console.log(trackSlug);
    for(let exercise of configfile.tracks[trackSlug].exercises){
  //    console.log(exercise.topics);
      if(!exercise.topics) continue;
      for(let topic of exercise.topics){
        let normalized = topic.toLowerCase(); // there is a capitalization issue with topics
        if(!topics.hasOwnProperty(normalized)) topics[normalized] = {
          topic: normalized,
          count: 0,
          tracks: {}
        }
       
        topics[normalized].count++;
        topics[normalized].tracks[trackSlug] = true;
      }
    }

  }


  topics = Object.values(topics);
  // xx -- more sort options for topics?  
  topics.sort((a, b) => (b.count - a.count));

  let t = new table({
    head: ['Topic', 'Count', 'Track']
  });

  for(let topic of topics){
    t.push([topic.topic, topic.count, Object.keys(topic.tracks).join(', ')]);
  }
  console.log(t.toString());
}
