import React from 'react';
import District_img from '../../images/us.png';
import './css/District.css';

function District(props) {
    let medianIncome = props.medianIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (
        <div 
            className="district d-flex border border-secondary 
                justify-content-center flex-column align-items-center"
        >
            <img className="district-image" src={District_img} alt="us flag" />
            <p className="district-name">{props.name}</p>
            <ul>
                <li className="district-desc">
                    <span>Population</span>: {props.population}
                </li>
                <li className="district-desc">
                    <span>Median Income</span>: ${props.medianIncome}
                </li>
                <li className="district-desc">
                    <span>Average Age</span>: {props.avgAge}
                </li>
                <li className="district-desc">
                    <span>Gender Ratio</span>: {props.genderRatio}
                </li>
                <li className="district-desc">
                    <span>Representative</span>: {props.representative}
                </li>
            </ul>
        </div>
    );
}

export default District;