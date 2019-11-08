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
    sorted: "",
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
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let districts = data["data"];
        let metaData = data["metaData"];
        let sorted = data["sorted"];
        this.setState({ districts, metaData, sorted, loading: false });
      })
      .catch(console.log);
  }

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSearch = _ => {
    const search = this.state.search.toLowerCase();
    window.location = `/Districts/search?attribute=${search}`;
  };

  render() {
    const pathname = this.props.location.pathname;
    const querystring = this.props.location.search;
    let search = null;
    if (pathname === "/Districts/search" && querystring != null) {
      const parsedQuerystring = querystring.substring(1).split("&");
      for (let i = 0; i < parsedQuerystring.length; ++i) {
        if (parsedQuerystring[i].includes("attribute")) {
          const index = parsedQuerystring[i].indexOf("=");
          search = parsedQuerystring[i].substring(index + 1);
          break;
        }
      }
    }
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
              search={search}
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
              className="form-control"
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.handleSearch();
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
          {this.state.collapse && (
            <DistrictSortFilter sorted={this.state.sorted} />
          )}
        </div>
        {renderPage}
      </div>
    );
  }
}

export default Districts;
