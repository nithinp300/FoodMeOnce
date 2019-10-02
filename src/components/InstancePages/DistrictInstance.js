import React from "react";
import District_img from '../../images/us.png';
import "./css/DistrictInstance.css";

class DistrictInstance extends React.Component{

    constructor(props){
        super(props)
    };

    render(){
    var district_data = this.props.location.state

    console.log(this.props.location.state)
    return (
    <div
            className="district-instance d-flex border border-secondary
                justify-content-center flex-column align-items-center"
        >
            <img className="district-instance-image" src={District_img} alt="us flag" />
            <p className="district-instance-name">{district_data.name}</p>
            <ul>
                <li className="district-instance-desc">
                    <span>Population</span>: {district_data.population}
                </li>
                <li className="district-instance-desc">
                    <span>Average Income</span>: ${district_data.medianIncome}
                </li>
                <li className="district-instance-desc">
                    <span>Average Age</span>: {district_data.avgAge}
                </li>
                <li className="district-instance-desc">
                    <span>Gender Ratio</span>: {district_data.genderRatio}
                </li>
                <li className="district-instance-desc">

                    <span>Representative</span>: {district_data.representative}
                </li>
            </ul>
        </div>
        );
      }
    }

export default DistrictInstance;