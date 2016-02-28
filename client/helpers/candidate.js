

  // set hide complete to checked on startup
  Session.setDefault("candidateId", "");


  Template.candidate.helpers({
    nbVotes: function (propname) {
      if (typeof this[propname] === 'undefined')
      {
        return 0;
      }
      return this[propname];
    },
    isCandidateDone: function () {
    	if (this.action && this.action.nogo) {
    		return 'treated danger';
    	}
      else if (this.action && this.action.hired) {
        return 'treated success';
      }
    },
    didIVote: function (direction) {
      if (this.myVote(direction).length > 0)
      {
          return "checked"
      }
      return "";
    },
    isNationality: function(nationality) {
      if (this.nationality && this.nationality == nationality) {
        //return 'checked="checked"';
        return 'checked';
      }
      return "";
    }

  });

  