import React from 'react';
import Legislation_img from '../../images/us.png';
import './css/Legislation.css';
import us_hor from '../../images/us_hor.png';
import us_sen from '../../images/us_sen.png';

function getImage(billType) {
   if(billType == 'hr'){
        return us_hor;
        }
   return us_sen;
    };

function Legislation(props) {
    return (
        <div 
            className="legislation d-flex border border-secondary 
                justify-content-center flex-column align-items-center"
        >
            <img className="legislation-image" src={getImage(props.billType)} alt="government" />
            <p className="legislation-name">{props.name}</p>
            <ul>
                <li className="legislation-desc">
                    <span>Introduced</span>: {props.year}
                </li>
                <li className="legislation-desc">
                    <span>Status</span>: {props.status}
                </li>
                <li className="legislation-desc">
                    <span>Enacted</span>: {props.enacted_Year}
                </li>
                <li className="legislation-desc">
                    <span>Party</span>: {props.houseOfRepresentative}
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