import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import App from '../modules/App';


export default function() {
  return (
    <Router>
      <Route exact path="/" component={App}>
      </Route>
    </Router>
  );
}
