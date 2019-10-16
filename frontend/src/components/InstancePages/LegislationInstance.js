import React, { Component } from "react";
import './css/LegislationInstance.css';
import us_hor from '../../images/us_hor.png';
import us_sen from '../../images/us_sen.png';

class LegislationInstance extends Component{
    state = {
        legislation: {},
        districts: {
            Conaway: "Texas 11th Congressional District",
            Connolly: "Virginia 11th Congressional District",
            Loebsack: "Iowa 2nd Congressional District",
        },
    }
    componentDidMount() {
        fetch(
            "https://api.propublica.org/congress/v1/bills/search.json?query=%22food+access%22",
            {
            method: "GET",
            headers: {
                "X-API-Key": "eqgLGZRNuOktoYkIpRdonPmtq4zIKokpsvT0EpN6"
            }
            }
        )
        .then(response => response.json())
        .then(data => {
            const legislations = data.results[0].bills;
            for (let i = 0; i < legislations.length; ++i) {
                let legislation = legislations[i];
                if (legislation.short_title === this.props.match.params.short_title) {
                    this.setState({ legislation });
                }
            }
        })
        .catch(console.log);
    }

    getStatus = (enacted) => {
    if(enacted != null) {
      return "Enacted";
    }
    return "Pending";
    }

    getEnacted = (enacted) => {
    if(enacted != null) {
        return enacted;
    }
    return "N/A";
    }

    getBillType = (billType) => {
    if(billType === "hr"){
        return "House of Representatives";
        }
    return "Senate";
    }

    getParty = (sponsor_party) => {
    if(sponsor_party === "D") {
        return "Democratic";
    }
    return "Republican";
   }

   getImage = (billType) => {
   if(billType === "hr"){
        return us_hor;
        }
   return us_sen;
   }

   getSponsorTitle = (sponsor_title) => {
   if(sponsor_title === 'Sen.'){
    return "Senator";
    }
    return "Representative";
   }

    render(){
    let legislation_data = this.state.legislation;
    let sponsor_image = "";
    if (legislation_data.sponsor_id != null) {
        sponsor_image = "https://theunitedstates.io/images/congress/225x275/"+ legislation_data.sponsor_id+".jpg";
    }
    const name = legislation_data.sponsor_name == null 
        ? "" : legislation_data.sponsor_name.split(" ");
    const firstName = name[0];
    const lastName = name[name.length - 1];
    return(
        <div
            className="legislation-instance d-flex p-2 border border-secondary
                justify-content-center flex-column align-items-center"
        >
            <img className="legislation-instance-image" src={this.getImage(legislation_data.bill_type)} alt="government" />
            <p className="legislation-instance-name"><a href={legislation_data.congressdotgov_url}>{legislation_data.short_title}</a></p>
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
                    <span>Bill Type</span>: {this.getBillType(legislation_data.bill_type)}
                </li>
                <li className="legislation-instance-desc">
                    <span>Sponsor(s)</span>: {this.getSponsorTitle(legislation_data.sponsor_title)} <a href={`/Representatives/instance/${firstName}/${lastName}`}>{legislation_data.sponsor_name}</a>
                </li>
                <li className="legislation-instance-desc">
                    <span>Sponsor District</span>: <a href={`/Districts/instance/${this.state.districts[lastName]}`}>{this.state.districts[lastName]}</a>
                </li>
                <li className="legislation-instance-desc">
                    <span>Cosponsors</span>: {legislation_data.cosponsors}
                </li>
                <li className="legislation-instance-desc">
                    <span>Committee(s)</span>: {legislation_data.committees}
                </li>
                <li className="legislation-instance-desc">
                    <span>Latest Action Date</span>: {legislation_data.latest_major_action_date}
                </li>
                <li className="legislation-instance-desc">
                    <span>Latest Action</span>: {legislation_data.latest_major_action}
                </li>
                <li className="legislation-instance-desc">
                    <span>Summary</span>: {legislation_data.summary_short}
                </li>
            </ul>
            <div className="sponsor" align="left">
              <img className="legislation-instance-rep" src={sponsor_image} alt={legislation_data.sponsor_name} />
            </div>
        </div>
    );
    }
}

export default LegislationInstance;
