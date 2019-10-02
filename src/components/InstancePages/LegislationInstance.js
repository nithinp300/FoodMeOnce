import React from "react";
import Legislation_img from '../../images/us.png';
import './css/Legislation.css';

class LegislationInstance extends React.Component{

    constructor(props){
        super(props)
    };

    render(){
    var legislation_data = this.props.location.state
    console.log(this.props.location.state)
    return(
        <div
            className="legislation d-flex border border-secondary
                justify-content-center flex-column align-items-center"
        >
            <img className="legislation-image" src={Legislation_img} alt="us flag" />
            <p className="legislation-name">{legislation_data.short_title}</p>
            <ul>
                <li className="legislation-desc">
                    <span>Introduced</span>: {legislation_data.introduced_date}
                </li>
                <li className="legislation-desc">
                    <span>Enacted</span>: {legislation_data.enacted}
                </li>
                <li className="legislation-desc">
                    <span>Party</span>: {legislation_data.sponsor_party}
                </li>
                <li className="legislation-desc">
                    <span>Bill Type</span>: {legislation_data.bill_type}
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