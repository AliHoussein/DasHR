

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
        });      
      }
    }

  });