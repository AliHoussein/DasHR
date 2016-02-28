
  // set hide complete to checked on startup
  Session.setDefault("hideCompleted", true);


  Template.candidates.helpers({
    candidates: function () {
      if (Session.get("hideCompleted")) {
        // If hide no go candidates is treated, filter tasks
        return Candidates.find({"actions.nogo": {$ne: true}, "actions.hired": {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        return Candidates.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    //counts all the candidates not treated (aka no go or hired)
    incompleteCount: function () { 
      return Candidates.find({'process.nogo': {$ne: true}}).count();
    }
  });


