
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
	}
});
