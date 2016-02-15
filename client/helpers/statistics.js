
 Template.statistics.helpers({
    previousMonthRouteParam: function() {
		//using moment lib because date manip is not straightfoward in JS cause of the index
		var ndate = moment(Template.instance().data.date_start).subtract(1, 'M');
		
		return {year: ndate.get('year'),
				month: ndate.get('month')+1 } //add +1 because index start at 0

	},
	nextMonthRouteParam: function() {
		var ndate = moment(Template.instance().data.date_start).add(1, 'M');

		return {year: ndate.year(),
				month: ndate.month()+1 }
	},
	candidatesPerDay: function() {
		var candidates = Template.instance().data.candidates;
		var date_start = Template.instance().data.date_start;
		var nb_days = Template.instance().data.nb_days;
		var day_start = date_start.getDate();

		// init the js object
		var canPerDay = {};
		for (var i=day_start; i <= nb_days; i++) {
			canPerDay[i] = 0;
		}
		//  fill in the array day:nbcandidate
		candidates.forEach(function (c) {
			canPerDay[c.createdAt.getDate()] += 1;
		});

		//format for d3js
		var canObj = [];
		for (var i=day_start; i <= nb_days; i++) {
			canObj.push({"day": i, "nb": canPerDay[i]});
		}

		return canObj;
	}
});