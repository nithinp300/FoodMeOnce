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
        id: "C001062",
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
        id: "L000565",
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
        id: "C001078",
        wikipedia: "https://en.wikipedia.org/wiki/Iowa%27s_2nd_congressional_district"
      },
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
        <Link
          key={i}
          to={{
            pathname: `/Districts/instance/${district.name}`,
          }}
          className="district_link"
        >
          <District
            name={district.name}
            population={district.population}
            medianIncome={district.medianIncome}
            avgAge={district.avgAge}
            genderRatio={district.genderRatio}
            representative={district.representative}
            senators={district.senators}
            peoplePerSquareMile={district.peoplePerSquareMile}
            povertyRate={district.povertyRate}
            numHouseholds={district.numHouseholds}
            id={district.id}
            wikipedia={district.wikipedia}
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
        <div className="districts-container d-flex justify-content-center flex-column bd-highlight mb-3">
          <District header />
          {districtsRendered}
        </div>
      </div>
    );
  }
}

export default Districts;
