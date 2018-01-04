import React from 'react';
import { Route } from 'react-router';

import DefaultLayout from 'app/layouts/defaultLayout';
import Home from 'app/views/home';
import Games from 'app/views/games';
import Game from 'app/views/game';
import Players from 'app/views/players';
import Player from 'app/views/player';
import Tables from 'app/views/tables';
import ErrorPage from 'app/views/error';

export default (
  <Route path="/" component={DefaultLayout}>
    <Route path="home" component={Home} />
    <Route path="games" component={Games} />
    <Route path="games/:game" component={Game} />
    <Route path="players" component={Players} />
    <Route path="players/:player" component={Player} />
    <Route path="tables" component={Tables} />
    <Route path="*" component={ErrorPage} />
  </Route>
);