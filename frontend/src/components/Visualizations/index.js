import React, { Component } from "react";
import CongressionalDistricts from "./CongressionalDistricts";
import LegislationHistogram from "./LegislationHistogram";
import * as d3 from "d3";
import RepresentativesBubbleChart from "./RepresentativesBubbleChart";
import styling from "./css/styling.css";
import DistrictSortFilter from "../Districts/DistrictSortFilter";

class Visualizations extends React.Component {
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 400,
    height: 300,
    scale: 20,
    collapse_1: true,
      collapse_2: true,
      collapse_3: true
  };

    handleCollapse_1 = () => {
    this.setState(prevState => ({
        collapse_1: !prevState.collapse_1
    }));
  };
    handleCollapse_2 = () => {
    this.setState(prevState => ({
        collapse_2: !prevState.collapse_2
    }));
  };
    handleCollapse_3 = () => {
    this.setState(prevState => ({
        collapse_3: !prevState.collapse_3
    }));
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1 className="welcome"> Welcome to the Visualizations for Food Me Once, to see the Visualizations of our Customer team Put It in Park click <a> here</a></h1>
        <h1 className="text-center mt-2">Congressional District SNAP/Poverty Ratio Heat Map</h1>
          <div className="sorting-container">
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse_1}
            >
              {this.state.collapse_1 ? "-" : "+"}
            </button>
              {this.state.collapse_1 && (
            <CongressionalDistricts/>)}
          </div>

        <h1 className="text-center mt-2">Legislation by Representative Bubble Chart</h1>
                  <div className="sorting-container">
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse_2}
            >
              {this.state.collapse_2 ? "-" : "+"}
            </button>
              {this.state.collapse_2 && (
            <RepresentativesBubbleChart/>)}
          </div>
        <h1 className="text-center mt-2">Legislations by State Histogram</h1>
                    <div className="sorting-container">
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse_3}
            >
              {this.state.collapse_3 ? "-" : "+"}
            </button>
              {this.state.collapse_3 && (
                    <LegislationHistogram
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
          scale={this.state.scale}
        />)}
          </div>
      </div>
    );
  }
}

export default Visualizations;
