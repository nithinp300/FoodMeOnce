import * as React from "react";
import * as d3 from "d3";

class RViz extends React.Component {
  componentDidMount() {
    const url =
      "https://flask-backend-dot-potent-retina-254722.appspot.com/api/recreations";
    fetch(url)
      .then(res => res.json())
      .then(res => res.objects)
      .then(recreations => {
        const map = new Map();
        recreations.forEach(recreation => {
          const activities = recreation.activities.split(",");
          activities.forEach(activity => {
            if (activity.length > 0) {
              if (map.has(activity)) {
                map.set(activity, map.get(activity) + 1);
              } else {
                map.set(activity, 1);
              }
            }
          });
        });
        const data = { children: [] };
        map.forEach((value, key, map) => {
          data.children.push({
            activity: key,
            count: value
          });
        });
        this.drawBubbleChart(data);
      })
      .catch(err => console.error(err));
  }

  drawBubbleChart(data) {
    var diameter = 700;
    // creates the bubble map using dataset with size 600 and spacing
    // between circles is 1
    var bubble = d3
      .pack(data)
      .size([diameter, diameter])
      .padding(1.5);
    // determines where to place the bubble map
    var svg = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");
    // determines the size of the circle based on count
    var nodes = d3.hierarchy(data).sum(function(d) {
      return d.count;
    });

    var node = svg
      .selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function(d) {
        return !d.children;
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("title").text(function(d) {
      return d.data.activty + ": " + d.data.count;
    });

    node
      .append("circle")
      .attr("r", function(d) {
        return d.r;
      })
      .style("fill", function(d) {
        return "blue";
      });

    node
      .append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.activity;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    node
      .append("text")
      .attr("dy", "2.4em")
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.count;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    d3.select(this.frameElement).style("height", diameter + "px");
  }

  render() {
    return <div className="text-center" ref="canvas"></div>;
  }
}
export default RViz;
