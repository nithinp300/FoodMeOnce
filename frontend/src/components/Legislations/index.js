import React, { Component } from "react";
import { Link } from "react-router-dom";
import LegislationSortFilter from "./LegislationSortFilter";
import Legislation from "./Legislation";

import "./css/Legislations.css";

class Legislations extends Component {
  getStatus = enacted => {
    if (enacted != null) {
      return "Enacted";
    }
    return "Pending";
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
      return "Democratic";
    }
    return "Republican";
  };

  state = {
    collapse: true,
    legislations: []
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  componentDidMount() {
    fetch("https://api.foodmeonce.me/Legislations")
      .then(response => response.json())
      .then(data => {
        let legislations = [];
        for (let i = 0; i < data.length; i++) {
          const name = data[i].sponsor_name;
          legislations.push(data[i]);
        }
        this.setState({ legislations });
      })
      .catch(console.log);
  }
  render() {
    const legislationsRendered = this.state.legislations.map(
      (legislation, i) => {
        return (
          <Link
            key={i}
            to={{
              pathname: `/Legislations/instance/${legislation.short_title}`
            }}
            className="legislation_link"
          >
            <Legislation
              name={legislation.short_title}
              year={legislation.introduced_date}
              status={this.getStatus(legislation.enacted)}
              enacted_Year={this.getEnacted(legislation.enacted)}
              houseOfRepresentative={this.getParty(legislation.sponsor_party)}
              billType={this.getBillType(legislation.bill_type)}
              sponsors={legislation.sponsor_name}
            />
          </Link>
        );
      }
    );
    return (
      <div className="legislations-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Legislations</h3>
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse}
            >
              {this.state.collapse ? "-" : "+"}
            </button>
          </div>
          {this.state.collapse && <LegislationSortFilter />}
        </div>
        <div className="legislations-container d-flex flex-column bd-highlight mb-3">
          <Legislation header />
          {legislationsRendered}
        </div>
      </div>
    );
  }
}

export default Legislations;
