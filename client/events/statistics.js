
var monthlyGraph = function (data, update) {
	// console.log("renderMonthlyGraph")

	var margin = {top: 20, right: 30, bottom: 40, left: 40},
	    width = 960 - margin.left - margin.right,
	    height = 200 - margin.top - margin.bottom;

	var d3data = d3.entries(data);

	if (update) {
        d3.select('#monthlybarchart').remove();
	}

    svg = d3.select('#bars').append('svg')
	      .attr('width', width + margin.left + margin.right)
	      .attr('height', height + margin.top + margin.bottom)
	      .attr('id', "monthlybarchart")
	      .append("g")
	      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //move the svg inside boundaries of margins


	var xScale = d3.scale.ordinal()
    	.rangeRoundBands([0, width], .1)
    	.domain(d3data.map(function(d) { return d.key; }));

    	
	var yScale = d3.scale.linear()
    		.range([height, 0])
    		.domain([0, d3.max(d3data, function(d) { return d.value; })]);

	var xAxis = d3.svg.axis()
	    .scale(xScale)
	    .orient("bottom");

    var maxy = d3.max(d3data, function(d) { return d.value; });
	var yAxis = d3.svg.axis()
	    .scale(yScale)
	    .orient("left")
		.tickFormat(d3.format("d")) //to display integer ticks
		.ticks(maxy) //to display just the number 

	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)	  
	    .append("text")
	    .attr("x", xScale.rangeBand()*d3data.length)
	    .attr("y", 35)
	    .attr("dx", ".71em")
	    .style("text-anchor", "end")
	    .text("Days");;

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Applicants");
	
	var bar = svg.selectAll(".bar")
		  .data(d3data);

	bar.enter().append("rect") //bars of the chart
	  .attr("class", "bar")
	  .attr("x", function(d) { return xScale(d.key); })
	  .attr("y", function(d) { return yScale(d.value); })
	  .attr("height", function(d) { return d.value > 0 ? height - yScale(d.value) : 0; })
	  .attr("width", xScale.rangeBand());
	  
	var text = svg.selectAll(".text")
		  .data(d3data);
	
	text.enter().append("text") // legend
	  .attr("class", "barlegend")
	  .attr("x", function(d) { return xScale(d.key) + (xScale.rangeBand()/2) +2; })
	  .attr("y", function(d) { return d.value > 0 ? yScale(d.value) + 5 : 0; })
	  .attr("dy", ".71em")
	  .text(function(d) { return d.value > 0 ? d.value : ""; });
}


Template.statistics.onRendered(function () {
	// console.log("statistics.onRendered")

	//reactive re-computation when the router data changes ! 
	this.autorun(function(comp) {

		// ===== REACTIVE MONTHLY BARCHART STATS ============

		var params = Router.current().data();
		var day_start = params.date_start.getDate();

		// init empty array
		var canPerDay = {};
		for (var i=day_start; i <= params.nb_days; i++) {
			canPerDay[i] = 0;
		}
		// fill in the array day[X] = nbcandidate;
		params.candidates.forEach(function (c) {
			canPerDay[c.createdAt.getDate()] += 1;
		});

		// process the grpah
		monthlyGraph(canPerDay, !comp.firstRun);

		// ===== END REACTIVE MONTHLY BARCHART STATS ============
		// ===== REACTIVE CIRCLES ============
		// var svg;
		// var width = 500;
		// var height = 75;
		// var x;

		// if (!comp.firstRun) {
  //           d3.select('#reactivecircles').remove();
		// }

	 //    svg = d3.select('#circles').append('svg')
	 //      .attr('width', width)
	 //      .attr('height', height)
	 //      .attr('id', "reactivecircles");

	 //    var data = Circles.findOne().data;
		// var circles = svg.selectAll('circle').data(data);

  //   	 x = d3.scale.ordinal()
  //         .domain(d3.range(data.length))
  //         .rangePoints([0, width], 1);
    	
  //       circles = circles.enter().append('circle')
  //         .attr('cx', function (d, i) { return x(i); })
  //         .attr('cy', height / 2);
  
  //       circles.attr('r', function (d) { return d; });
		// ===== END REACTIVE CIRCLES ============


	});
});