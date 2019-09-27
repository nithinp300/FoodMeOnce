import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import background from './cornField.jpg'

function Page1() {
    return (
        <div>
        <img src={background} class="img-fluid" alt="Corn Field"/>
        </div>
    );
}

export default Page1;