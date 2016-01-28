
  // set hide complete to checked on startup
  Session.setDefault("hideCompleted", true);


  Template.candidates.helpers({
    candidates: function () {
      if (Session.get("hideCompleted")) {
        // If hide no go candidates is treated, filter tasks
        return Candidates.find({"process.nogo": {$ne: true}, "process.hired": {$ne: true}}, {sort: {createdAt: -1}});
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


  Template.candidates.events({
    "submit .new-candidate": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var name = event.target.name.value;
 
      // Insert a task into the collection
      Candidates.insert({
        name: name,
        createdAt: new Date(), // current time
        owner: Meteor.userId(), // _id of logged in user
        //username: Meteor.user().profile.name // username of logged in user
        upvotes: 0,
        downvotes: 0
      });
 
      // Clear form
      event.target.name.value = "";
    },
    "change .hide-completed input" : function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

