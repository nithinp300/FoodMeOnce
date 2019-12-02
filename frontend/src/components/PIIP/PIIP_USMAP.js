import React, { Component } from "react";
import * as d3 from "d3";
import states from "./States";
import axios from "axios";
import "./css/CongressionalDistricts.css";

class PIIP_USMAP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      dataReady: false,
      data: new Map(),
      items: null
    };
    this.drawChart = this.drawChart.bind(this);
  }

  drawChart() {
    function tooltipHtml(n, d) {
      console.log(d)
      var htmlTable = "<h4>" + n + "</h4><table>";
      htmlTable +=
        "<tr><td><b>Number of Different Recreations: </b></td><td><b>" +
        d +
        "</b></td></tr></table>";
      return htmlTable;
    }

    var mapData = {};
    let data = this.state.data;
    ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",  
    "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",  
    "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",  
    "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",  
    "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"].forEach(function(d) {
      let num = data.get(d)
      if(num === undefined){
        num = 0
      }
      mapData[d] = {
        num,
        color: d3.interpolate("#AF0000 ", "#28F209")(num/50)
      };
    });

    states.draw("#statesvgem", mapData, tooltipHtml);

    d3.select(window.frameElement).style("height", "600px");
  }

  getData() {
    let stateValues = {
      AK: [0],
      AL: [0],
      AR: [0],
      AZ: [0],
      CA: [0],
      CO: [0],
      CT: [0],
      DC: [0],
      DE: [0],
      FL: [0],
      GA: [0],
      HI: [0],
      IA: [0],
      ID: [0],
      IL: [0],
      IN: [0],
      KS: [0],
      KY: [0],
      LA: [0],
      MA: [0],
      MD: [0],
      ME: [0],
      MI: [0],
      MN: [0],
      MO: [0],
      MS: [0],
      MT: [0],
      NC: [0],
      ND: [0],
      NE: [0],
      NH: [0],
      NJ: [0],
      NM: [0],
      NV: [0],
      NY: [0],
      OH: [0],
      OK: [0],
      OR: [0],
      PA: [0],
      RI: [0],
      SC: [0],
      SD: [0],
      TN: [0],
      TX: [0],
      UT: [0],
      VA: [0],
      VT: [0],
      WA: [0],
      WI: [0],
      WV: [0],
      WY: [0]
    };

    this.setState({ isLoaded: true, items: stateValues });
  }

  componentDidMount() {
    this.getData();
    let stateValues = {
      AK: 0,
      AL: 0,
      AR: 0,
      AZ: 0,
      CA: 0,
      CO: 0,
      CT: 0,
      DC: 0,
      DE: 0,
      FL: 0,
      GA: 0,
      HI: 0,
      IA: 0,
      ID: 0,
      IL: 0,
      IN: 0,
      KS: 0,
      KY: 0,
      LA: 0,
      MA: 0,
      MD: 0,
      ME: 0,
      MI: 0,
      MN: 0,
      MO: 0,
      MS: 0,
      MT: 0,
      NC: 0,
      ND: 0,
      NE: 0,
      NH: 0,
      NJ: 0,
      NM: 0,
      NV: 0,
      NY: 0,
      OH: 0,
      OK: 0,
      OR: 0,
      PA: 0,
      RI: 0,
      SC: 0,
      SD: 0,
      TN: 0,
      TX: 0,
      UT: 0,
      VA: 0,
      VT: 0,
      WA: 0,
      WI: 0,
      WV: 0,
      WY: 0
    };
    let stateActivites = {
      AK: [],
      AL: [],
      AR: [],
      AZ: [],
      CA: [],
      CO: [],
      CT: [],
      DC: [],
      DE: [],
      FL: [],
      GA: [],
      HI: [],
      IA: [],
      ID: [],
      IL: [],
      IN: [],
      KS: [],
      KY: [],
      LA: [],
      MA: [],
      MD: [],
      ME: [],
      MI: [],
      MN: [],
      MO: [],
      MS: [],
      MT: [],
      NC: [],
      ND: [],
      NE: [],
      NH: [],
      NJ: [],
      NM: [],
      NV: [],
      NY: [],
      OH: [],
      OK: [],
      OR: [],
      PA: [],
      RI: [],
      SC: [],
      SD: [],
      TN: [],
      TX: [],
      UT: [],
      VA: [],
      VT: [],
      WA: [],
      WI: [],
      WV: [],
      WY: []
    };
    var stateToAbr = (state) =>  {

      switch(state) {
      case "Alaska": return"AK"
      case "Alabama": return"AL"
      case "Arkansas": return"AR"
      case "Arizona": return"AZ"
      case "California": return "CA"
      case "Colorado": return"CO"
      case "Connecticut": return"CT"
      case "Delaware": return"DE"
      case "Florida": return"FL"
      case "Georgia": return"GA"
      case "Hawaii": return"HI"
      case "Iowa": return"IA"
      case "Idaho": return"ID"
      case "Illinois": return "IL"
      case "Indiana": return "IN"
      case "Kansas": return"KS"
      case "Kentucky": return"KY"
      case "Louisiana": return"LA"
      case "Massachusetts": return"MA"
      case "Maryland": return"MD"
      case "Maine": return"ME"
      case "Michigan": return"MI"
      case "Minnesota": return"MN"
      case "Missouri": return "MO"
      case "Mississippi": return"MS"
      case "Montana": return"MT"
      case "North-Carolina": return"NC"
      case "North-Dakota": return"ND"
      case "Nebraska": return"NE"
      case "New-Hampshire": return"NH"
      case "New-Jersey": return "NJ"
      case "New-Mexico": return"NM"
      case "Nevada": return"NV"
      case "New-York": return "NY"
      case "Ohio": return"OH"
      case "Oklahoma": return"OK"
      case "Oregon": return"OR"
      case "Pennsylvania": return"PA"
      case "Rhode-Island": return"RI"
      case "South-Carolina": return"SC"
      case "South-Dakota": return"SD"
      case "Tennessee": return"TN"
      case "Utah": return"UT"
      case "Virginia": return"VA"
      case "Vermont": return"VT"
      case "Washington": return"WA"
      case "Wisconsin": return"WI"
      case "West-Virginia": return"WV"
        case "Wyoming": return "WY"
        case "Texas": return "TX"
        default: return state
      }
    }
    const data = new Map();
    fetch("https://flask-backend-dot-potent-retina-254722.appspot.com/api/recreations")
      .then(res => res.json())
      .then(res => {
        res.objects.forEach(cd => {
          cd.location.split(",").forEach( (loc => {
            console.log("Location")
            console.log(stateToAbr(loc))
            console.log(loc)
            cd.activities.split(",").forEach( (rec) => {
              if(stateActivites[stateToAbr(loc)] != undefined && !stateActivites[stateToAbr(loc)].includes(rec)) {
              stateActivites[stateToAbr(loc)] += rec
              stateValues[stateToAbr(loc)] = Number(stateValues[stateToAbr(loc)]) + 1
              }
            })
            data.set(stateToAbr(loc), stateValues[stateToAbr(loc)])
          }))
    
        })
        
        this.setState({ dataReady: true, data: data });
      });
  }

  

  render() {
    if (this.state.isLoaded && this.state.dataReady) {
      this.drawChart();
    }
    return (
      <div className="text-center">
        <div width="100" height="100" id="tooltip"></div>
        <svg
          id="statesvgem"
          width="1500"
          height="800"
          style={{ marginTop: "0%" }}
        ></svg>
      </div>
    );
  }
}

export default PIIP_USMAP;
