
  // set hide complete to checked on startup
  Session.setDefault("candidateId", "");
  Session.setDefault("gview", null);


  Template.candidatedetail.helpers({
    getURLtoView: function () {
      return Session.get("gview") || this.gdriveattachments[0].gurl;
    }
  });

  