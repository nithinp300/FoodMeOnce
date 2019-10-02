import React from "react";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class DistrictInstance extends React.Component{

    constructor(props){
        super(props)
    };

//    render(){
//    var district_data = [{
//        name: this.props.location.state.name,
//        avgIncome: this.props.location.state.avgIncome,
//        avgEducation: this.props.location.state.avgEducation
//        }]
//
//    console.log(this.props.location.state)
//
//    const columns = [{
//    Header: 'District Name',
//    accessor: 'name' // String-based value accessors!
//  }, {
//    Header: 'Average Income',
//    accessor: 'avgIncome',
//    //Cell: props => <span className='number'>{district_data.avgIncome}</span> // Custom cell components!
//  }, {
//    Header: 'Average Education', // Required because our accessor is not a string
//    accessor: 'avgEducation',
//    //accessor: d => d.friend.name // Custom value accessors!
//  }]
//    return(
//        <ReactTable
//    data={district_data}
//    columns={columns}
//  />
//    );
//    }
    render() {
        var district_data = this.props.location.state
        //const data =[{"name":district_data.name},{"name":district_data.avgIncome}];
        return (
          <div className="districtdata">
        <h1>{district_data.name}</h1>
        <ul>
          <li>Average Income: {district_data.avgIncome}</li>
          <li>Average Education: {district_data.avgEducation}</li>
          <li>Gender Ratio: {district_data.genderRatio}</li>
          <li>Distance to food supply: {district_data.distToSupply}</li>
        </ul>
      </div>
        );
      }
    }

export default DistrictInstance;