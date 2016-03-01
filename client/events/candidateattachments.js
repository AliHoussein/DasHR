  Template.candidateattachments.events({
    "submit .gdrive_attachement": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var gdrive_url = event.target.gdrive_url.value;

      //console.log(this);
      this.addGDriveAttachment(gdrive_url);

      // Clear form
      event.target.gdrive_url.value = "";
    },
   "click .deletegattachment": function (event) {
      var id = event.target.id.substring(1);
      // console.log(Session.get('candidateId'));
      
      //define the subdocument
      var conditions = {'gdriveattachments': {
        id: new Meteor.Collection.ObjectID(id)
          }
        }

        Candidates.update({_id: Session.get('candidateId')}, {
          $pull:conditions
        });    
      }
  });
  