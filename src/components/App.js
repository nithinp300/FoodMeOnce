import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';

function App() {
  return (
    <BrowserRouter>
      <Route 
        exact path="/"
        component={Page1}
      />

      <Route 
        path="/page2"
        component={Page2}
      />
    </BrowserRouter>
  );
}

export default App;
