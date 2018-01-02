import { createMemoryHistory } from 'history';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { reduxReactRouter, match } from 'redux-router/server';
import thunkMiddleware from 'redux-thunk'
import serialize from 'serialize-javascript';

import reducer from 'app/reducers';
import routes from 'app/routes';
import { errorMessage } from 'app/actions/errors';
import Html from 'app/components/html'

export default function render(req, res) {
  const store = compose(
    reduxReactRouter({ routes, createHistory: createMemoryHistory }),
    applyMiddleware(thunkMiddleware),
  )(createStore)(reducer);

  store.dispatch(match(req.path, (error, redirectLocation, routerState) => {
    const state = store.getState();
    let status = 200;
    if (error) {
      state.errors.errorMsg = error.message;
      status = 500;
    } else if (!routerState) {
      status = 404;
      state.errors.errorMsg = 'Not Found';
    } else if (routerState.routes.length > 1 && routerState.routes[1].path == '*') {
      status = 404;
      state.errors.errorMsg = `Not Found ${routerState.location.pathname}`;
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname);
    }

    const initialState = serialize(state);
    const content = renderToString(
      <Html title="WaleseyCms" scripts={['/client.js']} stylesheets={['/styles.css']} initialState={initialState}>
        <Provider store={store}>
          <ReduxRouter routes={routes} />
        </Provider>
      </Html>
    );
    res.status(status).send(content);
  }));
}