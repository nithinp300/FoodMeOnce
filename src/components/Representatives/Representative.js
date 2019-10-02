import React from 'react';
import Representative_img from '../../images/us.png';
import './css/Representative.css';

function Representative(props) {
    return (
        <div
            className="representative d-flex border border-secondary
                justify-content-center flex-column align-items-center"
        >
            <img className="representative-image" src={Representative_img} alt="us flag" />
            <p className="representative-name">{props.name}</p>
            <ul>
                <li className="representative-desc">
                    <span>Age</span>: {props.age}
                </li>
                <li className="representative-desc">
                    <span>Years In Office</span>: {props.yearsInOffice}
                </li>
                <li className="representative-desc">
                    <span>Party</span>: {props.party}
                </li>
                <li className="representative-desc">
                    <span>State/District</span>: {props.stateDistrict}
                </li>
            </ul>
        </div>
    );
}

export default Representative;
