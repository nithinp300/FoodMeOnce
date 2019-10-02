import React from 'react';
import Legislation_img from '../../images/us.png';
import './css/Legislation.css';

function Legislation(props) {
    return (
        <div 
            className="legislation d-flex border border-secondary 
                justify-content-center flex-column align-items-center"
        >
            <img className="legislation-image" src={Legislation_img} alt="us flag" />
            <p className="legislation-name">{props.name}</p>
            <ul>
                <li className="legislation-desc">
                    <span>Year</span>: {props.year}
                </li>
                <li className="legislation-desc">
                    <span>Status</span>: {props.status}
                </li>
                <li className="legislation-desc">
                    <span>Representative</span>: {props.houseOfRepresentative}
                </li>
                <li className="legislation-desc">
                    <span>Bill Type</span>: {props.billType}
                </li>
                <li className="legislation-desc">
                    <span>Sponsor/s</span>: {props.sponsors}
                </li>
            </ul>
        </div>
    );
}

export default Legislation;