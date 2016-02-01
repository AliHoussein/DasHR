// using http://iron-meteor.github.io/iron-router/
// doc https://github.com/iron-meteor/iron-router/blob/devel/Guide.md#layouts

Router.configure({
  // set the default template as ApplicationLayout 
  layoutTemplate: 'ApplicationLayout'
});


// renders the Candidates template into the "main" region
Router.route('/', function () { this.render('candidates');}, { name: 'index' });

// renders candidate id
Router.route('/candidate/:_id', function () {
  this.render('candidatedetail', {
    data: function () { return Candidates.findOne({_id: this.params._id}) }
  });
}, { name: 'candidatedetail' });

/// useless
Router.route('/defaultdash', function () {
  this.render('defaultdash');
}, { name: 'defaultdash' });


// http://meteortips.com/second-meteor-tutorial/iron-router-part-1/
// 	http://meteortips.com/second-meteor-tutorial/iron-router-part-2/

// TODO: Reactively Set the Navbar’s “active” Class – Router.current()
// http://robertdickert.com/blog/2014/05/09/set-up-navigation-with-iron-router-and-bootstrap/



