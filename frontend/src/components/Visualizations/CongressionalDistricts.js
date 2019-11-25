import React, { Component } from 'react';
import * as d3 from "d3";
import districts from "./districts"
import axios from 'axios';

class CongressionalDistricts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: null
    };
    this.drawChart = this.drawChart.bind(this);
  }

  drawChart() {
    function tooltipHtml(n, d){
      var htmlTable =  "<h4>"+n+"</h4><table>";
      htmlTable +="<tr><td><b>Total</b></td><td><b>"+ 0 +"</b></td></tr></table>";
      return htmlTable;
    }

   
    var sampleData = {};

    ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",  
    "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",  
    "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",  
    "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",  
    "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"].forEach(function(d){

        var sum = 0

        sampleData[d]={total: sum, emissionsCollection: 0,
            color:d3.interpolate("#98F198 ", "#6B0000")(sum/123456789)};
      });

    districts.draw("#statesvgem", sampleData, tooltipHtml);

    d3.select(window.frameElement).style("height", "600px");
  }


  getEmissionsData(){
    let statecounts = {"AK": [0], "AL": [0], "AR": [0], "AZ": [0], "CA": [0], "CO": [0], "CT": [0], "DC": [0],  
    "DE": [0], "FL": [0], "GA": [0], "HI": [0], "IA": [0], "ID": [0], "IL": [0], "IN": [0], "KS": [0], "KY": [0], "LA": [0],  
    "MA": [0], "MD": [0], "ME": [0], "MI": [0], "MN": [0], "MO": [0], "MS": [0], "MT": [0], "NC": [0], "ND": [0], "NE": [0],  
    "NH": [0], "NJ": [0], "NM": [0], "NV": [0], "NY": [0], "OH": [0], "OK": [0], "OR": [0], "PA": [0], "RI": [0], "SC": [0],  
    "SD": [0], "TN": [0], "TX": [0], "UT": [0], "VA": [0], "VT": [0], "WA": [0], "WI": [0], "WV": [0], "WY": [0]};

    // axios.get('https://api.engageclimatechange.world/states').then(response => {
    //   let states = response.data.objects
    //   for (var statesKey in states) {
    //     let emissions = states[statesKey].emissions;
    //     for (var emissionsKey in emissions) {
    //       let yearData = emissions[emissionsKey]
    //       statecounts[yearData.state][0] += parseInt(yearData.data)
    //     }
    //   }

    this.setState({isLoaded: true, items: statecounts});
    // });
    return statecounts;
  }

  componentDidMount() {
    this.getEmissionsData();
  }

  render() {
    if(this.state.isLoaded){
      this.drawChart();
    }
    return (
          <div>
          <div width="100" height="100" id="tooltip"></div>
          <svg id="statesvgem" width="1500" height="1500" style={{marginTop: '0%'}}></svg>
      </div>
    );
  }
}

export default CongressionalDistricts;
