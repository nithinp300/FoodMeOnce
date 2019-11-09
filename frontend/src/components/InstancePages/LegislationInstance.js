import React, { Component } from "react";
import "./css/LegislationInstance.css";
import us_hor from "../../images/us_hor.png";
import us_sen from "../../images/us_sen.png";
import ReactImageFallback from "react-image-fallback";
import republican from "../../images/republicanLogo.png";
import democrat from "../../images/democratLogo.png";

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
        this.setState({
          districts: data.fromDistrict[0],
          legislation: data.legislation[0],
          representative: data.sponsor[0]
        });
      })
      .catch(err => console.log(err));
  }

  getSummary = summary_short => {
    if(summary_short) {
      return summary_short;
    }
    return 'N/A';
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
    if (billType === "hr" || billType === "hres") {
      return "House of Representatives";
    }
    return "Senate";
  };

  getParty = sponsor_party => {
    if (sponsor_party === "D") {
      return "Democratic";
    }
    return sponsor_party;
  };

  getImage = billType => {
    if (billType === "hr" || billType === "hres") {
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
    let rep_data = this.state.representative;
    let sponsor_image = "";
    let state_district = "";
    let leg_dis_url = "";
    if (legislation_data.sponsor_id != null) {
      sponsor_image =
        "https://theunitedstates.io/images/congress/225x275/" +
        legislation_data.sponsor_id +
        ".jpg";
    }
    if (this.state.districts.district == null) {
      state_district = this.state.districts.state;
      leg_dis_url = "/Districts/filter?state=" + state_district;
    }
    else {
      state_district = this.state.districts.state + ' ' + this.state.districts.district;
      leg_dis_url = "/Districts/instance/" + this.state.districts.id;
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
              {rep_data.full_name}
            </a>
          </li>
          <li className="legislation-instance-desc">
            <span>Sponsor State/District</span>:{" "}
            <a href={leg_dis_url}>
              {state_district}
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
            <span>Summary</span>: {this.getSummary(legislation_data.summary_short)}
          </li>
        </ul>
        <div className="sponsor" align="left">
          <ReactImageFallback
          src={sponsor_image}
          fallbackImage={legislation_data.sponsor_party === "Democrat" ? democrat : republican}
          className="district-instance-rep-image"
          alt="Representative Photo"
        />
        </div>
      </div>
    );
  }
}

export default LegislationInstance;
