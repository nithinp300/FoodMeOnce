import React, { Component } from "react";
import CongressionalDistricts from "./CongressionalDistricts"

class Visualizations extends React.Component{
  
    componentDidMount() {

  }
  
  
    render(){
  
      return (
        <div>
        <p> Visualizations</p>
        <CongressionalDistricts/>
        </div>
      );
    }
  }
  
  export default Visualizations;