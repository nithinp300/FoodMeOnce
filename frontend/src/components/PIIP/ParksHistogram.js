import * as React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import Axes from "./Axes";
import Bars from "./Bars";

class ParksHistogram extends React.Component {
  state = {
    loaded: false,
    xScale: scaleBand(),
    yScale: scaleLinear(),
    data: []
  };
  componentDidMount() {
    fetch("https://flask-backend-dot-potent-retina-254722.appspot.com/api/nationalparks?limit=500")
      .then(res => res.json())
      .then(res => res.objects)
      .then(objects => {
        const map = new Map();
        objects.forEach(each => {
          if (map.has(each.location)) {
            map.set(each.location, map.get(each.location) + 1);
          } else {
            map.set(each.location, 1);
          }
        });
        const parsedData = [];
        map.forEach((value, key, map) => {
          parsedData.push({
            state: key,
            count: value
          });
        });
        this.setState({
          data: [...parsedData],
          loaded: true
        });
      });
  }

  render() {
    if (!this.state.loaded) {
      return <p className="text-center">Graph rendering...</p>;
    }
    const margins = { top: 50, right: 20, bottom: 100, left: 60 };

    const svgDimensions = { width: 800, height: 500 };

    const maxValue = Math.max(...this.state.data.map(d => d.count));

    // scaleBand type
    const xScale = this.state.xScale
      .padding(0.5)
      // scaleBand domain should be an array of specific values
      // in our case, we want to use movie titles
      .domain(this.state.data.map(d => d.state))
      .range([margins.left, svgDimensions.width - margins.right]);

    // scaleLinear type
    const yScale = this.state.yScale
      // scaleLinear domain required at least two values, min and max
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top]);

    return (
      <svg
        style={{ display: "block", margin: "auto" }}
        width={svgDimensions.width}
        height={svgDimensions.height}
      >
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={this.state.data}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    );
  }
}

export default ParksHistogram;
