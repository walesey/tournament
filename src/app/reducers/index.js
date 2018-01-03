import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import errors from './errors';
import config from './config';
import info from './info';
import games from './games';
import rounds from './rounds';
import players from './players';

export default combineReducers({
    router: routerStateReducer,
    errors,
    config,
    info,
    games,
    rounds,
    players,
});