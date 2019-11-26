import React, { Component } from "react";
import CongressionalDistricts from "./CongressionalDistricts";
import LegislationHistogram from "./LegislationHistogram";
import * as d3 from "d3";
import RepresentativesBubbleChart from "./RepresentativesBubbleChart";
import styling from "./css/styling.css";

class Visualizations extends React.Component {
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 400,
    height: 300,
    scale: 20
  };

    handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1 className="text-center mt-2">Congressional District SNAP/Poverty Ratio Heat Map</h1>

              <CongressionalDistricts/>

        <h1 className="text-center mt-2">Legislation by Representative Bubble Chart</h1>
        <RepresentativesBubbleChart />
        <h1 className="text-center mt-2">Legislations by State Histogram</h1>
        <LegislationHistogram
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
          scale={this.state.scale}
        />
      </div>
    );
  }
}

export default Visualizations;
