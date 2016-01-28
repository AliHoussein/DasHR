// create an object with the desired methods to use as prototype
var candidates = {
  upVoters: function () {
    if (Object.prototype.toString.call(this.votes) === '[object Array]') {
      return this.votes
        .filter(function(obj) { return obj.direction == "+"; })
        .map(function(obj) { return obj.username })
        .join(", ");
    }
    return "";
  },
  downVoters: function () {
    if (Object.prototype.toString.call(this.votes) === '[object Array]') {
      return this.votes
        .filter(function(obj) { return obj.direction == "-"; })
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
  didIVoteUp: function () {

    if (this.myVote("+").length > 0)
    {
        return "checked"
    }
    return "";
  },
  didIVoteDown: function () {

    if (this.myVote("-").length > 0)
    {
        return "checked"
    }
    return "";
  },

  getResume: function () {
    var resume = Resumes.findOne({'metadata.candidateId': this._id, 'metadata.type': "resume"})

    if (resume) {
      return resume;
    }

    return false;
  },

  getHiredDate: function () {
    if (this.process && this.process.hired)
    {
      return this.process.hiredAt; 
    }
    return "";
  },
  getHiredStatus: function() {
    if (this.process && this.process.hired)
    {
      return true;
    }
    return false;
  },
  getNogoDate: function () {
    if (this.process && this.process.nogo) {
      return this.process.nogoAt;
    }
    return "";
  },
  getNogoStatus: function() {
    if (this.process && this.process.nogo)
    {
      return true;
    }
    return false;
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
