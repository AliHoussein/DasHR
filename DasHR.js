Candidates = new Mongo.Collection("candidates")

if (Meteor.isClient) {
  // counter starts at 0
  // Session.setDefault('counter', 0);

  // set hide complete to checked on startup
  Session.set("hideCompleted", "checked");

  Template.body.helpers({
    candidates: function () {
      if (Session.get("hideCompleted")) {
        // If hide no go candidates is checked, filter tasks
        return Candidates.find({ checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        return Candidates.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Candidates.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
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
        username: Meteor.user().profile.name // username of logged in user
      });
 
      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input" : function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.candidate.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Candidates.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Candidates.remove(this._id);
    }
  });


  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 10);
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
