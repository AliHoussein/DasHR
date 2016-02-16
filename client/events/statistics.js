
function renderMonthlyGraph() {
	console.log("renderMonthlyGraph")
	// hack - https://github.com/meteor/meteor/issues/4732
	var data = Template.statistics.__helpers.get('candidatesPerDay').call();
	// var data = [4, 8, 15, 16, 23, 42];
	console.log(data);

	d3.select(".chart")
	  	.selectAll("div")
		.data(data)
  		.enter().append("div")
		.style("width", function(d) { console.log(d); return d.nb * 100 + "px"; })
    	.text(function(d) { return d.day; });

	console.log("end renderMonthlyGraph")
}

Template.statistics.events({
	"click .changemonth": function (event, template) {
		console.log("click changemonth");
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