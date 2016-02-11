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


// renders the statistics dashboard
Router.route('/stats', function (){
  this.render('statistics', {
    data: function () { 

      var start = new Date();
      start.setDate(1);
      start.setHours(0,0,0,0);

      var end = new Date(start.getFullYear(), start.getMonth()+1, 0);

      // console.log ("date start " + start + " date end " + end);

      var candidates = Candidates.find({createdAt: {$gte:start, $lt: end}});
      var candidates_count = candidates.count()

      return {  candidates: candidates,
                count: candidates_count,
                date_start: start,
                date_end: end };
    }
  });
}, { name: 'stats' });


Router.route('/stats/:year/:month', function (){
  this.render('statistics', {
    data: function () { 

      var start = new Date(this.params.year, this.params.month-1, 1); // month-1 to have the current month (dates start at index 0 in js)
      var end = new Date(this.params.year, this.params.month, 0);  // 0 = last day of the prev month

      // console.log ("date start " + start + " date end " + end);

      var candidates = Candidates.find({createdAt: {$gte:start, $lt: end}});
      var candidates_count = candidates.count()

      return {  candidates: candidates,
                count: candidates_count,
                date_start: start,
                date_end: end };    }
  });
}, { name: 'monthly_stats' });

// post Webhook
Router.route('/wh/candidateAttachment', { where: "server" } )
  .get( function() {
    // If a GET request is made.
  this.response.statusCode = 404;
  this.response.end('Not implemented.');
  //this.response.end( { status: "404", message: "Not implemented." } );
  })
  .post( function() {
    // If a POST request is made, create the user's profile.

    // pour le CORS upload des fichiers
	this.response.setHeader( 'access-control-allow-origin', '*' );

    var payload = this.request.query,
    	data 	= this.request.body;

  this.response.statusCode = 200;
  this.response.end("Bien reçu mon capitaine." + JSON.stringify(data) + JSON.stringify(payload));

  //call methods to add or not the candidate


  })
  .put( function() {
    // If a PUT request is made, either update or create it if it doesn't already exist.
  this.response.statusCode = 404;
  this.response.end('Not implemented.');
  })
  .delete( function() {
   // If a DELETE request is made.
  this.response.statusCode = 404;
  this.response.end('Not implemented.');
  });



// useless
// Router.route('/defaultdash', function () {
//   this.render('defaultdash');
// }, { name: 'defaultdash' });


// http://meteortips.com/second-meteor-tutorial/iron-router-part-1/
// 	http://meteortips.com/second-meteor-tutorial/iron-router-part-2/

// TODO: Reactively Set the Navbar’s “active” Class – Router.current()
// http://robertdickert.com/blog/2014/05/09/set-up-navigation-with-iron-router-and-bootstrap/



