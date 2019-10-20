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
        population: "782,337",
        medianIncome: "58,983",
        avgAge: "35.2",
        genderRatio: "0.98",
        representative: "K. Michael Conaway",
        senators: "John Cornyn, Ted Cruz",
        peoplePerSquareMile: "136.7",
        povertyRate: "8.7%",
        numHouseholds: "279,550",
        id: "C001062",
        wikipedia: "https://en.wikipedia.org/wiki/Texas%27s_11th_congressional_district"
      },
      {
        name: "Virginia 11th Congressional District",
        population: "798,464",
        medianIncome: "111,279",
        avgAge: "36.7",
        genderRatio: "1.00",
        representative: "Gerald E. Connolly",
        senators: "John Cornyn, Ted Cruz",
        peoplePerSquareMile: "166.9",
        povertyRate: "4.5%",
        numHouseholds: "268,471",
        id: "L000565",
        wikipedia: "https://en.wikipedia.org/wiki/Virginia%27s_11th_congressional_district"
      },
      {
        name: "Iowa 2nd Congressional District",
        population: "783,983",
        medianIncome: "55,239",
        avgAge: "38.0",
        genderRatio: "1.02",
        representative: "Dave Loebsack",
        senators: "John Cornyn, Ted Cruz",
        peoplePerSquareMile: "396.3",
        povertyRate: "8.7%",
        numHouseholds: "313,626",
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
  getName = (state, districtNum) => {
    return state + " Congressional District " + districtNum
  }
  componentDidMount() {
    fetch("https://api.foodmeonce.me/Districts")
      .then(response => response.json())
      .then(data => {
        let districts = [];
        for (let i = 0; i < data.length; i++) {
          const state = data[i].state;
          const districtNum = data[i].congressional_district;
          districts.push(data[i]);
        }
        this.setState({ districts });
      })
      .catch(console.log);
  }
  render() {
    const districtsRendered = this.state.districts.map((district, i) => {
      return (
        <Link
          key={i}
          to={{
            pathname: `/Districts/instance/${district.state}/${district.congressional_district}`,
          }}
          className="district_link"
        >
          <District
            name={this.getName(district.state, district.congressional_district)}
            population={district.population}
            medianIncome={district.mean_income}
            avgAge={district.median_age}
            genderRatio={district.gender_ratio}
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
