import React from 'react';

import './css/District.css';

function District(props) {
    let avgIncome = props.avgIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (
        <div 
            className="district d-flex border border-secondary 
                justify-content-center flex-column align-items-center"
        >
            <img className="district-image" src="/images/us.png" alt="us flag" />
            <p className="district-name">{props.name}</p>
            <ul>
                <li className="district-desc">
                    <span>Average Income</span>: ${avgIncome}
                </li>
                <li className="district-desc">
                    <span>Average Education Level</span>: {props.avgEducation}
                </li>
                <li className="district-desc">
                    <span>Average Age</span>: {props.avgAge}
                </li>
                <li className="district-desc">
                    <span>Gender Ratio</span>: {props.genderRatio}
                </li>
                <li className="district-desc">
                    <span>Distance to food supply</span>: {props.distToSupply}
                </li>
            </ul>
        </div>
    );
}

export default District;