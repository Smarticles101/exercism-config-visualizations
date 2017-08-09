// This report will list all used topics, the usage count and the tracks using it

module.exports = function(configfile){

  let returner = [['Topic', 'Count', 'Track']],
      topics = {}; // map to store topic information slug -> topic data object

  // collect all topics by iterating through each track
  for(let trackSlug in configfile.tracks){

    for(let exercise of configfile.tracks[trackSlug].exercises){

      if(!exercise.topics) continue;
      for(let topic of exercise.topics){
        let normalized = topic.toLowerCase(); // there is a capitalization issue with topics

        // first time seeing this topic, save as topic data object with own slug as key
        if(!topics.hasOwnProperty(normalized)) topics[normalized] = {
          topic: normalized,
          count: 0,
          tracks: {} // map: to track only once
        }

        topics[normalized].count++;
        topics[normalized].tracks[trackSlug] = true;
      }
    }
  }

  topics = Object.values(topics);
  // xx -- more sort options for topics?
  topics.sort((a, b) => (b.count - a.count));

  for(let topic of topics){
    let tracks = Object.keys(topic.tracks);
    tracks.sort();
    returner.push([topic.topic, topic.count, tracks.join(', ')]);
  }

  return returner;
}
