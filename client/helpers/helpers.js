
UI.registerHelper('isEqual', function (lhs, rhs) {
    return lhs === rhs;
});

UI.registerHelper('formatDate', function(date) {
	//using moment lib because date manip is not straightfoward in JS cause of the index
	return moment(date).format('DD-MM-YYYY');
});


