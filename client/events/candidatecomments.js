  Template.candidatecomments.events({
    "submit .gonogoform": function(event) {
       // Prevent default browser form submit
       console.log("action freid")
      event.preventDefault();
      var reason = event.target.gonogoreason.value; 
      this.setReasonGoNogo(reason);
     }
  });
  