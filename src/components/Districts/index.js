import React, { Component } from "react";
import { Link } from "react-router-dom";

import DistrictSortFilter from "./DistrictSortFilter";
import District from "./District";

import "./css/Districts.css";

class Districts extends Component {
  state = {
    collapse: true,
    districts: [
      {
        name: "Texas District1",
        avgIncome: "10000",
        avgEducation: "Bachelor's",
        avgAge: "35",
        genderRatio: "1.5 : 1",
        distToSupply: "3 miles"
      },
      {
        name: "Texas District2",
        avgIncome: "20000",
        avgEducation: "Bachelor's",
        avgAge: "35",
        genderRatio: "1.5 : 1",
        distToSupply: "3 miles"
      },
      {
        name: "Texas District3",
        avgIncome: "30000",
        avgEducation: "Bachelor's",
        avgAge: "35",
        genderRatio: "1.5 : 1",
        distToSupply: "3 miles"
      },
      {
        name: "Texas District4",
        avgIncome: "40000",
        avgEducation: "Bachelor's",
        avgAge: "35",
        genderRatio: "1.5 : 1",
        distToSupply: "3 miles"
      },
      {
        name: "Texas District5",
        avgIncome: "50000",
        avgEducation: "Bachelor's",
        avgAge: "35",
        genderRatio: "1.5 : 1",
        distToSupply: "3 miles"
      },
      {
        name: "Texas District6",
        avgIncome: "60000",
        avgEducation: "Bachelor's",
        avgAge: "35",
        genderRatio: "1.5 : 1",
        distToSupply: "3 miles"
      },
      {
        name: "Texas District7",
        avgIncome: "70000",
        avgEducation: "Bachelor's",
        avgAge: "35",
        genderRatio: "1.5 : 1",
        distToSupply: "3 miles"
      },
      {
        name: "Texas District8",
        avgIncome: "80000",
        avgEducation: "Bachelor's",
        avgAge: "35",
        genderRatio: "1.5 : 1",
        distToSupply: "3 miles"
      }
    ]
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  render() {
    const districtsRendered = this.state.districts.map((district, i) => {
      return (
        <Link to={{ pathname:`/Districts/instance/${district.name}`, state: district }}>
          <District
            key={i}
            name={district.name}
            avgIncome={district.avgIncome}
            avgEducation={district.avgEducation}
            avgAge={district.avgAge}
            genderRatio={district.genderRatio}
            distToSupply={district.distToSupply}
          />
        </Link>
      );
    });
    return (
      <div className="districts-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Districts</h3>
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse}
            >
              {this.state.collapse ? "-" : "+"}
            </button>
          </div>
          {this.state.collapse && <DistrictSortFilter />}
        </div>
        <div className="districts-container d-flex justify-content-center flex-wrap bd-highlight mb-3">
          {districtsRendered}
        </div>
      </div>
    );
  }
}

export default Districts;
