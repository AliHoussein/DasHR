
  Template.candidatecomments.events({
    "submit .gonogoform": function(event) {
       // Prevent default browser form submit
      event.preventDefault();
      var text = event.target.gonogoreason.value; 
      // console.log(this);
      this.setReasonGoNogo(text);

     },
    "submit .commentform": function(event) {
       // Prevent default browser form submit
      event.preventDefault();
      // console.log(this);
      this.addComment(event.target.comment.value);
      event.target.comment.value = "";

     },
     "click .deletecom": function (event) {
      var id = event.target.id.substring(1);
      // console.log(Session.get('candidateId'));
      
      //define the subdocument
      var conditions = {'comments': {
        id: new Meteor.Collection.ObjectID(id)
          }
        }

        Candidates.update({_id: Session.get('candidateId')}, {
          $pull:conditions
        });    
      }
  });
  