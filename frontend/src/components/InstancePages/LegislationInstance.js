import React, { Component } from "react";
import "./css/LegislationInstance.css";
import us_hor from "../../images/us_hor.png";
import us_sen from "../../images/us_sen.png";

class LegislationInstance extends Component {
  state = {
    legislation: {},
    districts: {},
    representative: {}
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    fetch("https://api.foodmeonce.me/Legislations/" + id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          legislation: data.legislation[0],
          district: data.fromDistrict[0],
          representative: data.sponsor[0]
        });
      })
      .catch(err => console.log(err));
  }

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

  getImage = billType => {
    if (billType === "hr") {
      return us_hor;
    }
    return us_sen;
  };

  getSponsorTitle = sponsor_title => {
    if (sponsor_title === "Sen.") {
      return "Senator";
    }
    return "Representative";
  };

  render() {
    let legislation_data = this.state.legislation;
    let sponsor_image = "";
    if (legislation_data.sponsor_id != null) {
      sponsor_image =
        "https://theunitedstates.io/images/congress/225x275/" +
        legislation_data.sponsor_id +
        ".jpg";
    }
    return (
      <div
        className="legislation-instance d-flex p-2 border border-secondary
                justify-content-center flex-column align-items-center"
      >
        <img
          className="legislation-instance-image"
          src={this.getImage(legislation_data.bill_type)}
          alt="government"
        />
        <p className="legislation-instance-name">
          <a
            href={legislation_data.congressdotgov_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {legislation_data.short_title}
          </a>
        </p>
        <ul>
          <li className="legislation-instance-desc">
            <span>Introduced</span>: {legislation_data.introduced_date}
          </li>
          <li className="legislation-instance-desc">
            <span>Status</span>: {this.getStatus(legislation_data.enacted)}
          </li>
          <li className="legislation-instance-desc">
            <span>Enacted</span>: {this.getEnacted(legislation_data.enacted)}
          </li>
          <li className="legislation-instance-desc">
            <span>Party</span>: {this.getParty(legislation_data.sponsor_party)}
          </li>
          <li className="legislation-instance-desc">
            <span>Bill Type</span>:{" "}
            {this.getBillType(legislation_data.bill_type)}
          </li>
          <li className="legislation-instance-desc">
            <span>Sponsor(s)</span>:{" "}
            {this.getSponsorTitle(legislation_data.sponsor_title)}{" "}
            <a
              href={`/Representatives/instance/${this.state.representative.id}`}
            >
              {legislation_data.sponsor_name}
            </a>
          </li>
          <li className="legislation-instance-desc">
            <span>Sponsor District</span>:{" "}
            <a
              href={`/Districts/instance/${this.state.district &&
                this.state.district.id}`}
            >
              {this.state.district && this.state.district.state}
              &nbsp;
              {this.state.district &&
                this.state.district.congressional_district}
            </a>
          </li>
          <li className="legislation-instance-desc">
            <span>Cosponsors</span>: {legislation_data.cosponsors}
          </li>
          <li className="legislation-instance-desc">
            <span>Committee(s)</span>: {legislation_data.committees}
          </li>
          <li className="legislation-instance-desc">
            <span>Latest Action Date</span>:{" "}
            {legislation_data.latest_major_action_date}
          </li>
          <li className="legislation-instance-desc">
            <span>Latest Action</span>: {legislation_data.latest_major_action}
          </li>
          <li className="legislation-instance-desc">
            <span>Summary</span>: {legislation_data.summary_short}
          </li>
        </ul>
        <div className="sponsor" align="left">
          <img
            className="legislation-instance-rep"
            src={sponsor_image}
            alt={legislation_data.sponsor_name}
          />
        </div>
      </div>
    );
  }
}

export default LegislationInstance;
