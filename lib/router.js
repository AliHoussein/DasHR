
Router.configure({
  // set the default template as ApplicationLayout 
  layoutTemplate: 'ApplicationLayout'
});


// renders the Candidates template into the "main" region
Router.route('/', function () { this.render('candidates');}, { name: 'index' });

Router.route('/defaultdash', function () {
  this.render('defaultdash');
}, { name: 'defaultdash' });