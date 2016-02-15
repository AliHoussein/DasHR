
Template.statistics.events({
	"click .changemonth": function (event, template) {
		template.onRendered();
	}
})

Template.statistics.onRendered(function () {

	// hack - https://github.com/meteor/meteor/issues/4732
	var data = Template.statistics.__helpers.get('candidatesPerDay').call()

	// data = [{year: 2006, books: 54},
	//             {year: 2007, books: 43},
	//             {year: 2008, books: 41},
	//             {year: 2009, books: 44},
	//             {year: 2010, books: 35}];

	// http://www.recursion.org/d3-for-mere-mortals/
	var barWidth = 40;
	var width = (barWidth + 10) * data.length;
	var height = 200;

	var x = d3.scale.linear().domain([0, data.length]).range([0, width]);
	var y = d3.scale.linear().domain([0, d3.max(data, function(datum) { return datum.nb; })]).
	  rangeRound([0, height]);

	// add the canvas to the DOM
	var barDemo = d3.select("#mbars").
	  append("svg:svg").
	  attr("width", width).
	  attr("height", height);

	barDemo.selectAll("rect").
	  data(data).
	  enter().
	  append("svg:rect").
	  attr("x", function(datum, index) { return x(index); }).
	  attr("y", function(datum) { return height - y(datum.nb); }).
	  attr("height", function(datum) { return y(datum.nb); }).
	  attr("width", barWidth).
	  attr("fill", "#2d578b");

	barDemo.selectAll("text").
	  data(data).
	  enter().
	  append("svg:text").
	  attr("x", function(datum, index) { return x(index) + barWidth; }).
	  attr("y", function(datum) { return height - y(datum.nb); }).
	  attr("dx", -barWidth/2).
	  attr("dy", "1.2em").
	  attr("text-anchor", "middle").
	  text(function(datum) { return datum.nb;}).
	  attr("fill", "white");

	barDemo.selectAll("text.yAxis").
	  data(data).
	  enter().append("svg:text").
	  attr("x", function(datum, index) { return x(index) + barWidth; }).
	  attr("y", height).
	  attr("dx", -barWidth/2).
	  attr("text-anchor", "middle").
	  attr("style", "font-size: 12; font-family: Helvetica, sans-serif").
	  text(function(datum) { return datum.day;}).
	  attr("transform", "translate(0, 1)").
	  attr("class", "yAxis");

	// var margin = {top: 20, right: 20, bottom: 30, left: 40},
	//     width = 960 - margin.left - margin.right,
	//     height = 200 - margin.top - margin.bottom;

	// var x = d3.scale.ordinal()
	//     .rangeRoundBands([0, width], .5);

	// var y = d3.scale.linear()
	//     .range([height, 0]);


 //  	x.domain([1,data.length]); // http://www.recursion.org/d3-for-mere-mortals/
 //  	y.domain([0, d3.max(data, function(d) { return d.nb; })]);


	// var xAxis = d3.svg.axis()
	//     .scale(x)
	//     .orient("bottom");

	// var yAxis = d3.svg.axis()
	//     .scale(y)
	//     .orient("left")
	//     .ticks(1);

	// var svg = d3.select("#barChart")//.append("svg")
	//     .attr("width", width + margin.left + margin.right)
	//     .attr("height", height + margin.top + margin.bottom)
	//   .append("g")
	//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//   svg.append("g")
	//       .attr("class", "x axis")
	//       .attr("transform", "translate(0," + height + ")")
	//       .call(xAxis);

	//   svg.append("g")
	//       .attr("class", "y axis")
	//       .call(yAxis)
	//     .append("text")
	//       .attr("transform", "rotate(-90)")
	//       .attr("y", 6)
	//       .attr("dy", ".71em")
	//       .style("text-anchor", "end")
	//       .text("Number");

	//   svg.selectAll(".bar")
	//       .data(data)
	//     	.enter()
	//     	.append("rect")
	//       .attr("class", "bar")
	//       .attr("x", function(d) {  return x(d.day); })
	//       .attr("width", x.rangeBand())
	//       .attr("y", function(d) { return y(d.nb); })
	//       .attr("height", function(d) { return height - y(d.nb); });

});