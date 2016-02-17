
function renderMonthlyGraph() {
	console.log("renderMonthlyGraph")
	// hack - https://github.com/meteor/meteor/issues/4732
	// var data = [4, 8, 15, 16, 23, 42];
	var data = Template.statistics.__helpers.get('candidatesPerDay').call();
	var d3data = d3.entries(data);
	//var maxval = Math.max.apply(Math,d3data.map(function(d){return d.value;}))

	var margin = {top: 20, right: 30, bottom: 40, left: 40},
	    width = 960 - margin.left - margin.right,
	    height = 200 - margin.top - margin.bottom;


	var x = d3.scale.ordinal()
    	.rangeRoundBands([0, width], .1)
    	.domain(d3data.map(function(d) { return d.key; }));

	var y = d3.scale.linear()
    	.range([height, 0])
    	.domain([0, d3.max(d3data, function(d) { return d.value; })]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(1, "d");
	    // .tickFormat(d3.format("d"));


	var chart = d3.select(".chart")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	

	chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)	  
	    .append("text")
	    .attr("x", x.rangeBand()*2)
	    .attr("y", 30)
	    .attr("dx", ".71em")
	    .style("text-anchor", "end")
	    .text("Day of the month");;

	chart.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Applicants");

    var barWidth = width / d3data.length;


	var bar = chart.selectAll(".bar")
	  .data(d3data)
	.enter().append("rect") //rect
	  .attr("class", "bar")
	  .attr("x", function(d) { return x(d.key); })
	  .attr("y", function(d) { return y(d.value); })
	  .attr("height", function(d) { return height - y(d.value); })
	  .attr("width", x.rangeBand());
	  

	var text = chart.selectAll(".text")
	  .data(d3data)
	.enter().append("text") // legend
	  .attr("x", function(d) { return x(d.key) + (x.rangeBand()/2) +2; })
	  .attr("y", function(d) { return y(d.value) + 5; })
	  .attr("dy", ".71em")
	  .text(function(d) { return d.value > 0 ? d.value : ""; });

	// var bar = chart.selectAll("g")
	//   	.data(d3data)
	// 	.enter().append("g")
	//   	.attr("transform", function(d, i) { return "translate(" + x(d.key) + ",0)"; });


	// bar.append("rect")
	//   .attr("y", function(d) { return y(d.value); })
	//   .attr("height", function(d) { return height - y(d.value); })
	//   .attr("width", x.rangeBand());


	// bar.append("text")
	//   .attr("x", barWidth / 2)
	//   .attr("y", function(d) { return y(d.value) + 3; })
	//   .attr("dy", ".75em")
	//   .text(function(d) { return d.value; });

	console.log("end renderMonthlyGraph")
}

Template.statistics.events({
	"click .changemonth": function (event, template) {
		console.log("click .changemonth");
		renderMonthlyGraph();
	}
})

Template.statistics.onRendered(function () {
	console.log("statistics.onRendered")

	renderMonthlyGraph();

	// data = [{year: 2006, books: 54},
	//             {year: 2007, books: 43},
	//             {year: 2008, books: 41},
	//             {year: 2009, books: 44},
	//             {year: 2010, books: 35}];

	// MARCHE OK  http://www.recursion.org/d3-for-mere-mortals/
	// var barWidth = 40;
	// var width = (barWidth + 10) * data.length;
	// var height = 200;

	// var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
	// var y = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.nb; })]).
	//   rangeRound([0, height]);

	// // add the canvas to the DOM
	// var barDemo = d3.select("#mbars").
	//   append("svg:svg").
	//   attr("width", width).
	//   attr("height", height);

	// barDemo.selectAll("rect").
	//   data(data).
	//   enter().
	//   append("svg:rect").
	//   attr("x", function(datum, index) { return x(index); }).
	//   attr("y", function(datum) { return height - y(datum.nb); }).
	//   attr("height", function(datum) { return y(datum.nb); }).
	//   attr("width", barWidth).
	//   attr("fill", "#2d578b");

	// barDemo.selectAll("text").
	//   data(data).
	//   enter().
	//   append("svg:text").
	//   attr("x", function(datum, index) { return x(index) + barWidth; }).
	//   attr("y", function(datum) { return height - y(datum.nb); }).
	//   attr("dx", -barWidth/2).
	//   attr("dy", "1.2em").
	//   attr("text-anchor", "middle").
	//   text(function(datum) { return datum.nb;}).
	//   attr("fill", "white");

	// barDemo.selectAll("text.yAxis").
	//   data(data).
	//   enter().append("svg:text").
	//   attr("x", function(datum, index) { return x(index) + barWidth; }).
	//   attr("y", height).
	//   attr("dx", -barWidth/2).
	//   attr("text-anchor", "middle").
	//   attr("style", "font-size: 12; font-family: Helvetica, sans-serif").
	//   text(function(datum) { return datum.day;}).
	//   attr("transform", "translate(0, 1)").
	//   attr("class", "yAxis");
    console.log("end statistics.onRendered")

});