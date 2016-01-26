

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
    isCandidateTreatedClass: function () {
    	if (this.treated) {
    		return 'treated info';
    	}
    }
  });

  Template.candidate.events({
  	//when the treated button has been clicked
    "click .toggle-treated": function () {
      // Set the treated property to the opposite of its current value
      Candidates.update(this._id, {
        $set: {treated: ! this.treated}
      });
    },
    //when delete button has been clicked
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

      //update front - fetch the updated object 
      // and update the jquery data-original-title and title attr 
      // because method of the collection does not seem to be updated automatically in candidates.html
	  var reCan = Candidates.findOne({_id: this._id})
	  $('label[for="tup'+this._id+'"]').tooltip('hide')
	  									.attr('data-original-title', reCan.upVoters())
	  									.attr('title', reCan.upVoters())
	  									.tooltip('fixTitle')
	  									.tooltip('show');

    },

    //when the checkbox thumb DOWN has been clicked
    //TODO: OPTIMISATION POSSIBLE WITH the above checkbox-up function
    "click .checkbox-down": function () {

      var data = {'votes': {
              direction: "-",
              ownerID: Meteor.userId(),
              username: Meteor.user().profile.name,
            }
      }

      //-1
      if (event.target.checked) {
        Candidates.update({_id: this._id}, {
          $inc: {downvotes: 1},
          $push:data
        });
      }
      else {
        Candidates.update({_id: this._id}, {
          $inc: {downvotes: -1},
          $pull:data
        });  

      }

      //update front
      var reCan = Candidates.findOne({_id: this._id})
	  $('label[for="tdown'+this._id+'"]').tooltip('hide')
	  									.attr('data-original-title', reCan.downVoters())
	  									.attr('title', reCan.downVoters())
	  									.tooltip('fixTitle')
	  									.tooltip('show');
    },
    'change .resumeInput': function(event, template) {  
        var resumeFile = event.target.files[0];
        resumeFile = new FS.File(resumeFile);

        resumeFile.metadata = { 
	      	candidateId: this._id,
	      	type: "resume" 
	      };

        // this method does not allow me to insert metadata I want

	    // FS.Utility.eachFile(event, function(file) {
	    //   var resumeFile = new FS.File(file);
	    //   resumeFile.metadata = { 
	    //   	candidateId: this._id,
	    //   	type: "resume" 
	    //   };

	    //   console.log(this._id);

	      Resumes.insert(resumeFile, function (err, fileObj) {
	        //If !err, we have inserted new doc with ID fileObj._id, and
	        //kicked off the data upload using HTTP
	      });
    },
    'click .deleteResume': function() {
    	// this == the file and not the candidate because we are in the #with getResume block
    	var deleteResume = this.remove();

    // 	Resumes.remove(resume, function(err, file) {
	   //  	if (err) {
	   //    		console.log('error', err);
	   //  	};
  		// });
    }
  });


Template.candidate.rendered = function () {
	//initialize all tooltips in this template
	$('label[data-toggle="tooltip"]').tooltip({
      'animation' : false // http://stackoverflow.com/questions/13894674/can-i-change-title-of-bootstrap-tooltip-without-hiding-it
	});
};