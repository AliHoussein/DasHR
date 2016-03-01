
  Template.candidates.events({
    "submit .new-candidate": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var name = event.target.name.value;
 
      // Insert a task into the collection
      var id = Candidates.insert({
        name: name,
        createdAt: new Date(), // current time
        owner: Meteor.userId(), // _id of logged in user
        //username: Meteor.user().profile.name // username of logged in user
        upvotes: 0,
        downvotes: 0
      });
      // console.log(id);

      // Clear form
      event.target.name.value = "";

      //post to Slack
      var slackLink = "<"+Router.routes.candidatedetail.url({ _id: id })+"|"+name+">";
      Meteor.call('slackPost', "general", "Time to vote, new candidate applied: "+ slackLink);


    },
    "change .hide-completed input" : function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });
  