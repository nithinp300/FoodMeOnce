import * as React from "react";
// be sure to import d3 - run npm install --save d3 first!
import * as d3 from "d3";

class RepresentativesBubbleChart extends React.Component {
  componentDidMount() {
    const url = "https://api.foodmeonce.me/Legislations?limit=500";
    let legislations;
    let dict = {};
    let rep_data = { children: [] };
    fetch(url)
      .then(response => response.json())
      .then(data => {
        legislations = data["data"];
        for (var i = 0; i < legislations.length; i++) {
          let legislation = legislations[i];
          let name = legislation["sponsor_name"];
          let party = legislation["sponsor_party"];
          let state = legislation["sponsor_state"];
          if (dict[name] == null) {
            dict[name] = { Name: name, Count: 0, Party: party, State: state };
          }
          dict[name]["Count"] += 1;
        }
        for (var sponsor in dict) {
          let value = dict[sponsor];
          rep_data["children"].push(value);
        }
        this.drawBubbleChart(rep_data);
      })
      .catch(console.log);
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
      return d.Count;
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
      return d.data.Name + " (" + d.data.State + ")" + ": " + d.data.Count;
    });

    node
      .append("circle")
      .attr("r", function(d) {
        return d.r;
      })
      .style("fill", function(d) {
        if (d.data.Party === "Democratic") {
          return "blue";
        } else if (d.data.Party === "Republican") {
          return "red";
        } else {
          return "grey";
        }
      });

    node
      .append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.Name;
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
        return d.data.Count;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d) {
        return d.r / 5;
      })
      .attr("fill", "white");

      node
        .append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
          return d.data.State;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d) {
          return d.r / 6;
        })
        .attr("fill", "white");
        
    d3.select(this.frameElement).style("height", diameter + "px");
  }

  render() {
    return <div className="text-center" ref="canvas"></div>;
  }
}
export default RepresentativesBubbleChart;
