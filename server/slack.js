
Meteor.methods({
  slackPost: function (channel, text) {

      HTTP.post(Meteor.settings.slack.url, {
      data: {
        channel: "#"+channel,
        username: "DasHR",
        text: text ,
        icon_url: "http://img.lum.dolimg.com/v1/images/character_disneyprincess_snowwhite_1fb60b25.jpeg",
        link_names: 1
      }
    },
    // comment the callback
    // function (err, result) { 
    // 	console.log(err, result); 
    // }
    );

  },
});
