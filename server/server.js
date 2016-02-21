
Resumes.allow({ // http://stackoverflow.com/a/27581124
  insert: function () {
    // add custom authentication code here
    return true;
  },
  update: function () {
    return true;
  },
  download: function () {
    return true;
  },
  remove: function () {
  	return true;
  }
});


/* CERCLES REACTIFS GRAPH (temporary code) */

Circles.allow({ 
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  }
});

Meteor.startup(function () {
    if (Circles.find().count() === 0) {
      Circles.insert({data: [5, 8, 11, 14, 17, 20]});
    }
});

// activate for automatic OnRedered calls
// Meteor.setInterval(function () {
//     var newData = _.shuffle(Circles.findOne().data);
//     console.log(newData);
//     Circles.update({}, {data: newData});
//   }, 2000);