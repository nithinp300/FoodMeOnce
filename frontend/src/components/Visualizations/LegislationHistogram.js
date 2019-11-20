// import react
import * as React from 'react';
// be sure to import d3 - run npm install --save d3 first!
import * as d3 from 'd3';
// also import topojson so we work with topologically clean geographic files
// this will improve performance and reduce load time
// npm install --save topojson
import * as topojson from 'topojson'
// also import lodash
import * as _ from 'lodash';
// and import a custom component called State
// we'll get to this a bit later
// import State from './State';

class LegislationHistogram extends React.Component {

//   constructor() {
//     super()
//     this.state = { us: [] }
//     this.generateStatePath = this.generateStatePath.bind(this)
//   }
  
//   componentDidMount() {
//     // send off a request for the topojson data
//     d3.json("https://d3js.org/us-10m.v1.json", (error, us) => {
//       if (error) throw error;
      
//       // store the data in state
//       this.setState({
//         us
//       })
      
//       // I prefer to use Redux for state management - if you're taking
//       // that approach this would be a good place to dispatch an action, i.e.
//       //this.props.dispatch(actions.sendAPIDataToReducer({ us }))
//     })
//   }
  
//   // let's define a method for rendering paths for each state
//   generateStatePath(geoPath, data) {
//     const generate = () => {
//       let states = _.map(data, (feature, i) => {
        
//         // generate the SVG path from the geometry
//         let path = geoPath(feature);
//         return <State path={path} key={i} />
//       })
//       return states;
//     }
    
//     let statePaths = generate()
//     return statePaths;
//   }
  
  render() {
    
    // // create a geographic path renderer
    // let geoPath = d3.geoPath()
    // let data = this.state.us // or, the reference to the data in the reducer, whichever you are using
    
    // // call the generateStatePaths method
    // let statePaths = this.generateStatePaths(geoPath, data)
    
    return (
        // <svg id='map-container'>
        //     <g id='states-container'>
        //         {statePaths}
        //     </g>
        // </svg>
        <p> Legislation Histogram </p>
    ); 
  }
}

export default LegislationHistogram;