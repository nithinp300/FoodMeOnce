import React, { Component } from "react";
import { Link } from "react-router-dom";
import RepresentativeSortFilter from "./RepresentativeSortFilter";
import Representative from "./Representative";

import "./css/Representatives.css";

class Representatives extends Component {
  getAge = birthDateString => {
    var todayDate = new Date();
    var birthDate = new Date(birthDateString);
    var age = todayDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = todayDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff == 0 && todayDate.getDate() < birthDate.getDate())
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
    representatives: []
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  componentDidMount() {
    fetch("https://api.foodmeonce.me/Representatives")
      .then(response => response.json())
      .then(data => {
        let representatives = [];
        const data_set = data;
        for (let i = 0; i < data_set.length; i++) {
          representatives.push(data_set[i]);
        }
        this.setState({ representatives });
      })
      .catch(console.log);
  }
  render() {
    const representativesRendered = this.state.representatives.map(
      (representative, i) => {
        return (
          <Link
            key={i}
            to={{
              pathname: `/Representatives/instance/${representative.first_name}/${representative.last_name}`
            }}
            className="representative_link"
          >
            <Representative
              name={representative.first_name + " " + representative.last_name}
              age={this.getAge(representative.date_of_birth)}
              yearsInOffice={representative.seniority}
              party={this.getParty(representative.party)}
              stateDistrict={representative.state}
            />
          </Link>
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
        <div className="representatives-container d-flex flex-column bd-highlight mb-3">
          <Representative header />
          {representativesRendered}
        </div>
      </div>
    );
  }
}

export default Representatives;
