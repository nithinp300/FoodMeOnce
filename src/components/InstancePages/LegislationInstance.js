import React from "react";
import Legislation_img from '../../images/us.png';
import './css/LegislationInstance.css';
import us_hor from '../../images/us_hor.png';
import us_sen from '../../images/us_sen.png';

class LegislationInstance extends React.Component{

    constructor(props){
        super(props)
    };
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
    if(billType == 'hr'){
        return "House of Representatives";
        }
    return "Senate";
    }

    getParty = (sponsor_party) => {
    if(sponsor_party == "D") {
        return "Democratic";
    }
    return "Republican";
   }

   getImage = (billType) => {
   if(billType == 'hr'){
        return us_hor;
        }
    return us_sen;
    }

    render(){
    var legislation_data = this.props.location.state
//    console.log(this.props.location.state)
//    var status = this.getStatus(legislation_data.enacted)
//    var billType = this.getBillType(legislation_data.bill_type)
    return(
        <div
            className="legislation d-flex border border-secondary
                justify-content-center flex-column align-items-center"
        >
            <img className="legislation-image" src={this.getImage(legislation_data.billType)} alt="government" />
            <p className="legislation-name">{legislation_data.short_title}</p>
            <ul>
                <li className="legislation-desc">
                    <span>Introduced</span>: {legislation_data.introduced_date}
                </li>
                <li className="legislation-desc">
                    <span>Status</span>: {this.getStatus(legislation_data.enacted)}
                </li>
                <li className="legislation-desc">
                    <span>Enacted</span>: {this.getEnacted(legislation_data.enacted)}
                </li>
                <li className="legislation-desc">
                    <span>Party</span>: {this.getParty(legislation_data.sponsor_party)}
                </li>
                <li className="legislation-desc">
                    <span>Bill Type</span>: {this.getBillType(legislation_data.bill_Type)}
                </li>
                <li className="legislation-desc">
                    <span>Sponsor/s</span>: {legislation_data.sponsor_name}
                </li>
            </ul>
        </div>
    );
    }
}

export default LegislationInstance;