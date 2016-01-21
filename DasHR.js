// create an object with the desired methods to use as prototype
var candidates = {
  upVoters: function() {
    if (Object.prototype.toString.call(this.votes) === '[object Array]') {
      return this.votes
        .filter(function(obj) { return obj.direction == "+"; })
        .map(function(obj) { return obj.username })
        .join(", ");
    }
    return "";
  },
  downVoters: function() {
    if (Object.prototype.toString.call(this.votes) === '[object Array]') {
      return this.votes
        .filter(function(obj) { return obj.direction == "-"; })
        .map(function(obj) { return obj.username })
        .join(", ");
    }
    return "";
  },
  myVote: function(direction) {
    if ((Object.prototype.toString.call(this.votes) === '[object Array]') &&
      (Meteor.user())) 
    {
      // if direction is not defined, get all the votes for a given user 
      if (typeof direction === "undefined") {
        return this.votes.filter(function(obj) { return obj.ownerID == Meteor.userId(); });
      }
      // else get only the up vote or the down votes given the direction argument 
      else
      {
        return this.votes.filter(function(obj) { return ((obj.ownerID == Meteor.userId()) && (obj.direction == direction)); });
      }
    }
    return [];

  },
  didIVoteUp: function() {

    if (this.myVote("+").length > 0)
    {
        return "checked"
    }
    return "";
  },
  didIVoteDown: function() {

    if (this.myVote("-").length > 0)
    {
        return "checked"
    }
    return "";
  }
};

Candidates = new Mongo.Collection("candidates", {
  transform: function(doc) {
    // create a new empty object with candidates as it's prototype
    var newInstance = Object.create(candidates);

    //copy the data from the parameter doc to newInstance and return the newInstance
    //(doc is our object that was retrieved from the Collection).
    return _.extend(newInstance, doc)
  }
});

if (Meteor.isClient) {
  // counter starts at 0
  // Session.setDefault('counter', 0);

  // set hide complete to checked on startup
  Session.set("hideCompleted", "true");

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
    //counts all the candidates not treated (aka no go or hired)
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

  Template.candidate.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Candidates.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Candidates.remove(this._id);
    },

    //when the checkbox thumb UP has been clicked
    "click .checkbox-up": function () {

      // update the sub documents votes 
      var conditions = {'votes': {
              direction: "+",
              ownerID: Meteor.userId(),
              username: Meteor.user().profile.name,
            }
      }
      
      //+1
      if (event.target.checked) {
        //TODO: TO IMPROVE TO SECURELY AND CONSISTENTLY ALLOW ONLY ONE VOTE: 
        // http://fr.discovermeteor.com/chapters/voting/ cf. titre Algorithme de vote plus intelligent
        Candidates.update({_id: this._id}, {
          $inc: {upvotes: 1},
          $push:conditions
        });
      }
      else { 
        Candidates.update({_id: this._id}, {
          $inc: {upvotes: -1},
          $pull:conditions
        });
      }
    },

    //when the checkbox thumb DOWN has been clicked
    //TODO: OPTIMISATION POSSIBLE WITH the above checkbox-up function
    "click .checkbox-down": function () {

      var conditions = {'votes': {
              direction: "-",
              ownerID: Meteor.userId(),
              username: Meteor.user().profile.name,
            }
      }

      //-1
      if (event.target.checked) {
        Candidates.update({_id: this._id}, {
          $inc: {downvotes: 1},
          $push:conditions
        });
      }
      else {
        Candidates.update({_id: this._id}, {
          $inc: {downvotes: -1},
          $pull:conditions
        });      }
    }

  });

  Template.candidate.helpers({
    nbUpVotes: function () {
      if (typeof this.upvotes === 'undefined')
      {
        return 0;
      }
      return this.upvotes;
    },
    nbDownVotes: function () {
      if (typeof this.downvotes === 'undefined')
      {
        return 0;
      }
      return this.downvotes;
    },
  });

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
