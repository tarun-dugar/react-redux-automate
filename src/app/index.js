import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './config/store';
const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <div>
        Hello React!
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
