import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../modules/App';
import Summary from '../modules/App/modules/Summary';

export default function() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Summary}></IndexRoute>
      </Route>
    </Router>
  );
}
