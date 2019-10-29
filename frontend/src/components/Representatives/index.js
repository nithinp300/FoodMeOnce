import React, { Component } from "react";
import { Link } from "react-router-dom";
import RepresentativeSortFilter from "./RepresentativeSortFilter";
import Representative from "./Representative";
import Pages from "../Pages";

import "./css/Representatives.css";


class Representatives extends Component {
  getAge = birthDateString => {
    var todayDate = new Date();
    var birthDate = new Date(birthDateString);
    var age = todayDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = todayDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && todayDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  getEnacted = enacted => {
    if (enacted != null) {
      return enacted;
    }
    return "N/A";
  };

  getBillType = billType => {
    if (billType === "hr") {
      return "House of Representatives";
    }
    return "Senate";
  };

  getParty = sponsor_party => {
    if (sponsor_party === "D") {
      return "Democrat";
    }
    return "Republican";
  };
  state = {
    collapse: true,
    representatives: [],
    metaData: {
      currentPage: 1,
      lastPage: 1
    }
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  componentDidMount() {
    const querystring = this.props.location.search;
    let page = 1;
    if (querystring !== "") {
      const parsedQuerystring = querystring.substring(1);
      const queries = parsedQuerystring.split("&");
      queries.forEach(query => {
        const keyValue = query.split("=");
        if (keyValue.length > 1 && keyValue[0] === "page") {
          page = keyValue[1];
        }
      });
    }
    fetch("https://api.foodmeonce.me/Representatives?page=" + page)
      .then(response => response.json())
      .then(data => {
        let representatives = data["data"];
        let metaData = data["metaData"];
        console.log(metaData);
        this.setState({ representatives, metaData });
      })
      .catch(console.log);
  }
  render() {
    const representativesRendered = this.state.representatives.map(
      (representative, i) => {
        var rep_image = "";
        if (representative.first_name != null) {
          rep_image =
            "https://theunitedstates.io/images/congress/original/" +
            representative.id +
            ".jpg";
        }
        return (
            <a
            href={`/Representatives/instance/${representative.id}`}
            className="button-container"
            >
            <Representative
              image={rep_image}
              name={representative.first_name + " " + representative.last_name}
              age={this.getAge(representative.date_of_birth)}
              yearsInOffice={representative.seniority}
              party={this.getParty(representative.party)}
              stateDistrict={representative.state}
              district={representative.district}
            />
          </a>
        );
      }
    );
    return (
      <div className="representatives-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Representatives</h3>
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse}
            >
              {this.state.collapse ? "-" : "+"}
            </button>
          </div>
          {this.state.collapse && <RepresentativeSortFilter />}
        </div>
        <div className="representatives-container">
          {representativesRendered.slice(0,4)}
        </div>
        <div className="representatives-container">
          {representativesRendered.slice(4,8)}
        </div>
        <Pages
          url="/Representatives"
          current={this.state.metaData.currentPage}
          lastPage={this.state.metaData.numPages}
        />
      </div>
    );
  }
}

export default Representatives;
