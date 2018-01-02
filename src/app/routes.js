import React from 'react';
import { Route } from 'react-router';

import DefaultLayout from 'app/layouts/defaultLayout';
import Home from 'app/views/home';
import Games from 'app/views/games';
import Game from 'app/views/game';
import Results from 'app/views/results';
import Result from 'app/views/result';
import ErrorPage from 'app/views/error';

export default (
  <Route path="/" component={DefaultLayout}>
    <Route path="home" component={Home} />
    <Route path="games" component={Games} />
    <Route path="games/:game" component={Game} />
    <Route path="results" component={Results} />
    <Route path="results/:game" component={Result} />
    <Route path="*" component={ErrorPage} />
  </Route>
);