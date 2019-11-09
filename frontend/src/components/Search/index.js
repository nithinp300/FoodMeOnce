import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Representative from "../Representatives/Representative";
import District from "../Districts/District";
import Legislation from "../Legislations/Legislation";
import Pages from "../Pages";
// import "../Representatives/css/Representatives.css";
// import "../Legislations/css/Representatives.css";
// import "../Districts/css/District.css";
class SearchPage extends Component {
  state = {
    collapse: {
      districts: true,
      representatives: true,
      legislations: true
    },
    districts: [],
    representatives: [],
    legislations: [],
    loading: true,
    currentPage: 1,
    numPages: 0
  };

  handleClick = e => {
    let collapse = this.state.collapse;
    collapse[e.target.name] = !collapse[e.target.name];
    this.setState({ collapse });
  };

  componentDidMount() {
    const querystring = this.props.location.search;
    const url = `https://api.foodmeonce.me/Search${querystring}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          ...data,
          loading: false
        });
      })
      .catch(console.log);
  }

  render() {
    if (this.state.loading) {
      return <h2 className="text-center">Loading...</h2>;
    }
    const querystring = this.props.location.search;
    let search = null;
    if (querystring != null) {
      const parsedQuerystring = querystring.substring(1).split("&");
      for (let i = 0; i < parsedQuerystring.length; ++i) {
        if (parsedQuerystring[i].includes("attribute")) {
          const index = parsedQuerystring[i].indexOf("=");
          search = parsedQuerystring[i].substring(index + 1);
          break;
        }
      }
    } else {
      return <Redirect to="/error" />;
    }

    const districts = this.state.districts.map((district, i) => {
      return (
        <a
          key={"Districts" + i}
          href={`/Districts/Instance/${district.id}`}
          className="button-container"
        >
          <District
            name={this.getName(district.state, district.congressional_district)}
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

    const representatives = this.state.representatives.map(
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
            key={"Representatives" + i}
            href={`/Representatives/instance/${representative.id}`}
            className="button-container"
          >
            <Representative
              image={rep_image}
              name={representative.first_name + " " + representative.last_name}
              age={this.getAge(representative.date_of_birth)}
              yearsInOffice={representative.seniority}
              party={this.getParty(representative.party)}
              state={representative.state}
              district={this.getDistrict(representative.district)}
              type_flag={this.getType(representative.type_flag)}
              search={search}
            />
          </a>
        );
      }
    );

    const legislations = this.state.legislations.map((legislation, i) => {
      return (
        <a
          key={i}
          href={`/Legislations/Instance/${legislation.id}`}
          className="button-container"
        >
          <Legislation
            name={legislation.short_title}
            year={legislation.introduced_date}
            status={this.getStatus(legislation.enacted)}
            enacted_Year={this.getEnacted(legislation.enacted)}
            houseOfRepresentative={this.getParty(legislation.sponsor_party)}
            billType={this.getBillType(legislation.bill_type)}
            sponsors={legislation.sponsor_name}
            search={search}
          />
        </a>
      );
    });

    return (
      <div className="text-center">
        <h2>Search the entire site!</h2>
        <div style={{ paddingBottom: "20px", paddingTop: "20px" }}>
          <h4>
            Districts
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "lightgray",
                paddingLeft: "5px",
                paddingRight: "5px",
                cursor: "pointer"
              }}
              name="districts"
              onClick={this.handleClick}
            >
              {this.state.collapse.districts ? "-" : "+"}
            </button>
          </h4>
          {this.state.collapse.districts && (
            <React.Fragment>
              <div className="districts-container">{districts.slice(0, 4)}</div>
              <div className="districts-container">{districts.slice(4, 8)}</div>
            </React.Fragment>
          )}
          {this.state.collapse.districts &&
            this.state.districts.length === 0 && (
              <p>There is no (more) result for districts</p>
            )}
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <h4>
            Representatives
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "lightgray",
                paddingLeft: "5px",
                paddingRight: "5px",
                cursor: "pointer"
              }}
              name="representatives"
              onClick={this.handleClick}
            >
              {this.state.collapse.representatives ? "-" : "+"}
            </button>
          </h4>
          {this.state.collapse.representatives && (
            <React.Fragment>
              <div className="representatives-container">
                {representatives.slice(0, 4)}
              </div>
              <div className="representatives-container">
                {representatives.slice(4, 8)}
              </div>
            </React.Fragment>
          )}
          {this.state.collapse.representatives &&
            this.state.representatives.length === 0 && (
              <p>There is no (more) result for Representatives</p>
            )}
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <h4>
            Legislation
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "lightgray",
                paddingLeft: "5px",
                paddingRight: "5px",
                cursor: "pointer"
              }}
              name="legislations"
              onClick={this.handleClick}
            >
              {this.state.collapse.legislations ? "-" : "+"}
            </button>
          </h4>
          {this.state.collapse.legislations &&
            this.state.legislations.length === 0 && (
              <p>There is no (more) result for Legislations</p>
            )}
          {this.state.collapse.legislations &&
            this.state.legislations.length !== 0 && <Legislation header />}
          {this.state.collapse.legislations && legislations}
        </div>
        <Pages
          url={this.props.location.pathname}
          querystring={this.props.location.search}
          current={this.state.currentPage}
          lastPage={this.state.numPages}
        />
      </div>
    );
  }

  //Methods needed for various models
  getName = (state, districtNum) => {
    if (districtNum === "00") {
      return state + " At Large Congressional District ";
    }
    return state + " Congressional District " + districtNum;
  };

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

  getLegislationParty = sponsor_party => {
    if (sponsor_party === "D") {
      return "Democratic";
    }
    return "Republican";
  };

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
    return sponsor_party;
  };

  getDistrict = district => {
    if (district) {
      return district;
    }
    return "N/A";
  };

  getType = type_flag => {
    if (type_flag) {
      return "House Rep.";
    }
    return "Senator";
  };
  getDistrictName = (state, districtNum) => {
    if (districtNum === "00") {
      return state + " At Large Congressional District ";
    }
    return state + " Congressional District " + districtNum;
  };
}

export default SearchPage;
