import React from 'react';
import ReactDOM from 'react-dom';
import { compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { createHistory } from 'history';

import reducer from 'app/reducers';
import routes from 'app/routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, window.__initialState, composeEnhancers(
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(thunkMiddleware, createLogger()),
));

ReactDOM.render(
  <Provider store={store}>
    <ReduxRouter routes={routes} />
  </Provider>,
  document.getElementById('content'),
);