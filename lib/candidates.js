// create an object with the desired methods to use as prototype
var candidates = {
  // get all the +/- voters and concat and return their name 
  getVotersNames: function (direction) {
    if (Object.prototype.toString.call(this.votes) === '[object Array]') {
      return this.votes
        .filter(function(obj) { return obj.direction == direction; })
        .map(function(obj) { return obj.username })
        .join(", ");
    }
    return "";
  },

  myVote: function (direction) {
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

  getResume: function () {
    var resume = Resumes.findOne({'metadata.candidateId': this._id, 'metadata.type': "resume"})

    if (resume) {
      return resume;
    }

    return false;
  },
  // returns a boolean depending on the state of actioname in databse 
  getActionState: function (actioname) {
    if (this.action && this.action[actioname]) {
      return true;
    }
    return false;
  },
  // return the date of a true action else an empty string
  getActionDate: function (actioname) {
    if (this.getActionState(actioname)) {
      var actiondate = actioname +'At';

      return this.action[actiondate];
    }

    return "";
  },
  setAction: function (actioname, value, date) {

    var set = {action: this.action};
    if (!set.action) {
      set.action = {}
    }

    set.action[actioname] = value;
    set.action[actioname + 'At'] = date;

    Candidates.update(this._id, {
        $set: set
      });
  },
  toggleAction: function (actioname) {
    //check status in db - if 'actioname' was checked => 'actioname' to false
    if (this.getActionState(actioname)) {
      this.setAction(actioname, false, "");
    }
    else {
      this.setAction(actioname, true, new Date());
    }
  },
  setCandidateNationality: function (nationality) {
    Candidates.update(this._id, {
        $set: {
          nationality: nationality 
        }
      });
  },
  setCandidateReferer: function (referer) {
    Candidates.update(this._id, {
        $set: {
          referer: referer 
        }
      });
  },
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
