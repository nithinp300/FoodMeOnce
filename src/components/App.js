import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Route 
        exact path="/"
        component={Page1}
      />

      <Route 
        path="/Page2"
        component={Page2}
      />
      <Route
        path="/Page3"
        component={Page3}
      />
      <Route
        path="/Page4"
        component={Page4}
      />
      <Route
        path="/Page5"
        component={Page5}
      />
    </BrowserRouter>
  );
}

export default App;
