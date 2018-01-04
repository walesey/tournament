import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import errors from './errors';
import config from './config';
import info from './info';
import games from './games';
import players from './players';
import auth from './auth';

export default combineReducers({
    router: routerStateReducer,
    errors,
    config,
    info,
    games,
    players,
    auth,
});