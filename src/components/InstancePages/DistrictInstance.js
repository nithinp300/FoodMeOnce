import React from "react";
import { Redirect } from "react-router-dom";
import District_img from '../../images/us.png';
import "./css/DistrictInstance.css";
import tx_21 from '../../images/tx_21.jpg';
import tx_10 from '../../images/tx_10.jpg';
import tx_31 from '../../images/tx_31.png';

class DistrictInstance extends React.Component{
    state = {
        districts: [
            {
              name: "Texas 11th Congressional District",
              population: "818,281",
              medianIncome: "71,486",
              avgAge: "37.9",
              genderRatio: "0.97",
              representative: "K. Michael Conaway",
              senators: "John Cornyn, Ted Cruz",
              peoplePerSquareMile: "136.7",
              povertyRate: "10.3%",
              numHouseholds: "315,100",
              id: "S000583",
              wikipedia: "https://en.wikipedia.org/wiki/Texas%27s_11th_congressional_district"
            },
            {
              name: "Virginia 11th Congressional District",
              population: "896,798",
              medianIncome: "75,517",
              avgAge: "35.9",
              genderRatio: "0.99",
              representative: "Gerald E. Connolly",
              senators: "John Cornyn, Ted Cruz",
              peoplePerSquareMile: "166.9",
              povertyRate: "7.9%",
              numHouseholds: "290,104",
              id: "M001157",
              wikipedia: "https://en.wikipedia.org/wiki/Virginia%27s_11th_congressional_district"
            },
            {
              name: "Iowa 2nd Congressional District",
              population: "883,347",
              medianIncome: "70,346",
              avgAge: "35.2",
              genderRatio: "0.97",
              representative: "Dave Loebsack",
              senators: "John Cornyn, Ted Cruz",
              peoplePerSquareMile: "396.3",
              povertyRate: "8.9%",
              numHouseholds: "288,768",
              id: "F000461",
              wikipedia: "https://en.wikipedia.org/wiki/Iowa%27s_2nd_congressional_district"
            },
          ]
    }

    getImage = (district_name) => {
        if(district_name === "Texas 11th Congressional District"){
           return tx_21;
         }
        if(district_name === "Virginia 11th Congressional District"){
          return tx_10;
        }
        if(district_name === "Iowa 2nd Congressional District"){
          return tx_31;
        }
        return District_img;
    }

    getDistrict = (district_name) => {
        for (let i = 0; i < this.state.districts.length; ++i) {
            let district = this.state.districts[i];
            if (district.name === district_name)
                return district;
        }
        return {};
    }

    render(){
    var district_data = this.getDistrict(this.props.match.params.name);
    if (district_data.name == null) {
        return <Redirect to="/error" />
    }

    var rep_image = "https://theunitedstates.io/images/congress/225x275/"+district_data.id+".jpg";
    return (
    <div
            className="district-instance d-flex border border-secondary
                justify-content-center flex-column align-items-center">
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
        </div>
        );
      }
    }

export default DistrictInstance;
