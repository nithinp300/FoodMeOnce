import * as React from 'react';
// be sure to import d3 - run npm install --save d3 first!
import * as d3 from 'd3';

class RepresentativesBubbleChart extends React.Component {
  componentDidMount() {
    var data = {
            "children": [{"Name":"Olives","Count":4319, "Party":"D"},
                {"Name":"Tea","Count":4159, "Party":"D"},
                {"Name":"Mashed Potatoes","Count":2583, "Party":"D"},
                {"Name":"Boiled Potatoes","Count":2074, "Party":"D"},
                {"Name":"Milk","Count":1894, "Party":"D"},
                {"Name":"Chicken Salad","Count":1809, "Party":"D"},
                {"Name":"Vanilla Ice Cream","Count":1713, "Party":"D"},
                {"Name":"Cocoa","Count":1636, "Party":"D"},
                {"Name":"Lettuce Salad","Count":1566, "Party":"D"},
                {"Name":"Lobster Salad","Count":1511, "Party":"D"},
                {"Name":"Chocolate","Count":1489, "Party":"D"},
                {"Name":"Apple Pie","Count":1487, "Party":"D"},
                {"Name":"Orange Juice","Count":1423, "Party":"D"},
                {"Name":"American Cheese","Count":1372, "Party":"D"},
                {"Name":"Green Peas","Count":1341, "Party":"D"},
                {"Name":"Assorted Cakes","Count":1331, "Party":"D"},
                {"Name":"French Fried Potatoes","Count":1328, "Party":"D"},
                {"Name":"Potato Salad","Count":1306, "Party":"R"},
                {"Name":"Baked Potatoes","Count":1293, "Party":"R"},
                {"Name":"Roquefort","Count":1273, "Party":"R"},
                {"Name":"Stewed Prunes","Count":1268, "Party":"R"}]
        };
        this.drawBubbleChart(data);
  }

  drawBubbleChart(data) {
    var diameter = 600;
    // creates the bubble map using dataset with size 600 and spacing
    // between circles is 1
    var bubble = d3.pack(data)
        .size([diameter, diameter])
        .padding(1.5);
    // determines where to place the bubble map
    var svg = d3.select(this.refs.canvas)
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");
    // determines the size of the circle based on count
    var nodes = d3.hierarchy(data)
        .sum(function(d) { return d.Count; });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.Name + ": " + d.Count;
        });

    node.append("circle")
        .attr("r", function(d) {
          return d.r;
        })
        .style("fill", function(d) {
          if(d.data.Party === "D"){
            return 'blue';
          }
          else{
            return 'red';
          }
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/4;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Count;
        })
        .attr("font-family",  "sans-serif")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    d3.select(this.frameElement)
    .style("height", diameter + "px");
  }

  render(){
    return (
      <div ref="canvas">
      </div>
    )
  }
}
export default RepresentativesBubbleChart;
