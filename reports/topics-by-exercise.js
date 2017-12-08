module.exports = function(configfile){
    
      let returner = [['Exercise', 'Topics and frequencies']],
          exercises = {};

      for(let trackSlug in configfile.tracks){
    
        for(let exercise of configfile.tracks[trackSlug].exercises){
    
          if(!exercise.topics) continue;
          for(let topic of exercise.topics){

            let normalized = topic.toLowerCase();
            if(!exercises.hasOwnProperty(exercise.slug)) exercises[exercise.slug] = {
                slug: exercise.slug,
                topics: {}
            }

            if(!exercises[exercise.slug].topics.hasOwnProperty(normalized)) exercises[exercise.slug].topics[normalized] = {
                topic: normalized,
                count: 0,
                toString: function() {return `${this.topic}: ${this.count}`}
            }
            
            exercises[exercise.slug].topics[normalized].count++;
          }
        }
      }
    
      exercisesValues = Object.values(exercises);
      exercisesValues.sort((a, b) => (Object.keys(b.topics).length - Object.keys(a.topics).length));
    
      for(let exercise of exercisesValues) {
        let topics = Object.values(exercise.topics);
        topics.sort((a, b) => (b.count - a.count));
        returner.push([exercise.slug, topics]);
      }
    
      return returner;
    }
    