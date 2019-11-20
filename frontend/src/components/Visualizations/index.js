import React, { Component } from "react";
import CongressionalDistricts from "./CongressionalDistricts"
import LegislationHistogram from "./LegislationHistogram";

class Visualizations extends React.Component{
  
    componentDidMount() {

  }
  
  
    render(){
  
      return (
        <div>
        <p> Visualizations</p>
        <CongressionalDistricts/>
        <LegislationHistogram/>
        </div>
      );
    }
  }
  
  export default Visualizations;