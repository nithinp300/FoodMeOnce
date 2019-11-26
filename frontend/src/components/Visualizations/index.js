import React, { Component } from "react";
import CongressionalDistricts from "./CongressionalDistricts";
import LegislationHistogram from "./LegislationHistogram";
import * as d3 from "d3";
import RepresentativesBubbleChart from "./RepresentativesBubbleChart";

class Visualizations extends React.Component {
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 400,
    height: 300,
    scale: 20
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1 className="text-center mt-2">Snap to Poverty Map of Congressional Districts</h1>
        
        <CongressionalDistricts />
        <h1 className="text-center mt-2">Legislation Per Congressmen</h1>
        <RepresentativesBubbleChart />
        <h1 className="text-center mt-2">Legislations raised by state</h1>
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
