import React from "react";
import District_img from '../../images/us.png';
import "./css/DistrictInstance.css";
import tx_21 from '../../images/tx_21.jpg';
import tx_10 from '../../images/tx_10.jpg';
import tx_31 from '../../images/tx_31.png';

class DistrictInstance extends React.Component{

    constructor(props){
        super(props)
    };

    getImage = (district_name) => {
      if(district_name === "Texas 21st Congressional District"){
           return tx_21;
         }
      if(district_name === "Texas 10th Congressional District"){
          return tx_10;
        }
      if(district_name === "Texas 31st Congressional District"){
          return tx_31;
        }
    return District_img;
    }

    render(){
    var district_data = this.props.location.state
    var rep_image = "https://theunitedstates.io/images/congress/225x275/"+district_data.id+".jpg";
    console.log(district_data.id);
    console.log(this.props.location.state)
    return (
    <div
            className="district-instance d-flex border border-secondary
                justify-content-center flex-column align-items-center"
        >
            <img className="district-instance-image" src={this.getImage(district_data.name)} alt="us flag" />
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

                    <span>Senators</span>: {district_data.senators}
                </li>
                <li className="district-instance-desc">

                    <span>Poverty Rate</span>: {district_data.povertyRate}
                </li>
                <li className="district-instance-desc">

                    <span>Number of Households</span>: {district_data.numHouseholds}
                </li>
                <li className="district-instance-desc">

                    <span>People per square mile</span>: {district_data.peoplePerSquareMile}
                </li>
                <li className="district-instance-desc">
                    <a href={district_data.wikipedia}>Wikipedia</a>: {district_data.representative}
                </li>
                <li className="district-instance-desc">
                    <span>Representative</span>: {district_data.representative}
                </li>
            </ul>
            <img className="rep-image" src={rep_image} alt="us flag"/>
            {console.log(rep_image)}
        </div>
        );
      }
    }

export default DistrictInstance;
