import React, { Component } from "react";

import DistrictSortFilter from "./DistrictSortFilter";
import District from "./District";
import Pages from "../Pages";

import "./css/Districts.css";

class Districts extends Component {
  state = {
    collapse: true,
    districts: [],
    metaData: {
      currentPage: 1,
      numPages: 1
    },
    loading: true
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };
  getName = (state, districtNum) => {
    if (districtNum === "00") {
      return state + " At Large Congressional District ";
    }
    return state + " Congressional District " + districtNum;
  };

  componentDidMount() {
    const querystring = this.props.location.search;
    const pathname = this.props.location.pathname;
    const url = `https://api.foodmeonce.me${pathname}${querystring}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let districts = data["data"];
        let metaData = data["metaData"];
        this.setState({ districts, metaData, loading: false });
      })
      .catch(console.log);
  }
  render() {
    let districtsRendered = [];
    if (this.state.districts.length > 0)
      districtsRendered = this.state.districts.map((district, i) => {
        return (
          <a
            key={i}
            href={`/Districts/Instance/${district.id}`}
            className="button-container"
          >
            <District
              name={this.getName(
                district.state,
                district.congressional_district
              )}
              number={district.congressional_district}
              population={district.population}
              medianIncome={district.mean_income}
              avgAge={district.median_age}
              stateAbbreviation={district.state_abbreviation}
              genderRatio={district.gender_ratio}
              representative={district.full_name}
              senators={district.senators}
              peoplePerSquareMile={district.peoplePerSquareMile}
              povertyRate={district.povertyRate}
              numHouseholds={district.numHouseholds}
              id={district.id}
              wikipedia={district.wikipedia}
            />
          </a>
        );
      });
    const renderPage = this.state.loading ? (
      <h2 className="text-center m-3">Loading...</h2>
    ) : this.state.districts.length > 0 ? (
      <React.Fragment>
        <div className="districts-container">
          {districtsRendered.slice(0, 4)}
        </div>
        <div className="districts-container">
          {districtsRendered.slice(4, 8)}
        </div>
        <Pages
          url={this.props.location.pathname}
          querystring={this.props.location.search}
          current={this.state.metaData.currentPage}
          lastPage={this.state.metaData.numPages}
        />
      </React.Fragment>
    ) : (
      <h2 className="text-center m-3">No filtered/searched data...</h2>
    );
    return (
      <div className="districts-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Districts</h3>
            <input
              class="form-control"
              type="text"
              onKeyPress={event => {
                if (event.key === "Enter") {
                  alert();
                }
              }}
              placeholder="Search"
              style={{ marginLeft: "15%" }}
              aria-label="Search"
            />
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse}
            >
              {this.state.collapse ? "-" : "+"}
            </button>
          </div>
          {this.state.collapse && <DistrictSortFilter />}
        </div>
        {renderPage}
      </div>
    );
  }
}

export default Districts;
