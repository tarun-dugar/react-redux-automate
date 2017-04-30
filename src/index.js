import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import style from './styles/main.scss';
import configureStore from './config/store';
import createRoutes from './config/routes';
const store = configureStore();

render(
  <Provider store={store}>
    { createRoutes() }
  </Provider>,
  document.getElementById('app')
);
