var barData = [];

for (var i=0; i<50; i++) {
  barData.push(Math.round(Math.random()*30)+5);
}

// barData.sort(function compareNumbers(a, b) {
//   return a-b;
// });

var margin = {top: 30, right:30, bottom:40, left:50};

var height = 400 - margin.top - margin.bottom;
var width = 600 - margin.right - margin.left;
var barWidth = 50;
var barOffset = 5;
var padding = 0.2;

var tempColor;

var colors = d3.scale.linear()
            .domain([0, d3.max(barData)])
            .range(["#FFB832", "#C61C6F"]);

var yScale = d3.scale.linear()
            .domain([0, d3.max(barData)])
            .range([0, height]);

var xScale = d3.scale.ordinal()
            .domain(d3.range(0, barData.length))
            .rangeBands([0, width], [padding]);

var tooltip = d3.select("body").append("div")
            .style("position", "absolute")
            .style("padding", "0, 10px")
            .style("background", "white")
            .style("opacity", 0);

var myChart = d3.select("#chart").append("svg")
    .style("background", "#E7E0CB")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("+margin.left+", "+margin.top+")")
    .selectAll("rect").data(barData)
    .enter().append("rect")
      .style("fill", colors)
      .attr("width", xScale.rangeBand())
      .attr("x", function(d, i) {
        return xScale(i);
      })
      .attr("height", 0)
      .attr("y", height)


  .on("mouseover", function(d) {

    tooltip.transition()
      .style("opacity", 0.9);

    tooltip.html(d)
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 20) + "px");

    tempColor = this.style.fill;
    d3.select(this)
      .style("opacity", 0.5)
      .style("fill", "yellow");
  })

  .on("mouseout", function(d) {
    d3.select(this)
      .style("opacity", 1)
      .style("fill", tempColor);
  });


  myChart.transition()
    .attr("height", function(d) {
      return yScale(d);
    })
    .attr("y", function(d) {
      return height - yScale(d);
    })
    .delay(function(d, i) {
      return i * 10;
    })
    .duration(1000)
    .ease("elastic");



var vGuideScale = d3.scale.linear()
  .domain([0, d3.max(barData)])
  .range([height, 0]);

var vAxis = d3.svg.axis()
    .scale(vGuideScale)
    .orient("left")
    .ticks(10);

var vGuide = d3.select("svg").append("g");
    vAxis(vGuide);
    vGuide.attr("transform", "translate("+margin.left+", "+margin.top+")");
    vGuide.selectAll("path")
      .style({fill: "none", stroke: "#000"});
    vGuide.selectAll("line")
      .style({stroke: "#000"});

var hAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .tickValues(xScale.domain().filter(function(d, i) {
    return !(i % (barData.length/5));
  }));

var hGuide = d3.select("svg").append("g");
  hAxis(hGuide);
  hGuide.attr("transform", "translate("+margin.left+", "+(height + margin.top)+")");
  hGuide.selectAll("path")
    .style({fill: "none", stroke: "#000"});
  hGuide.selectAll("line")
    .style({stroke: "#000"});

