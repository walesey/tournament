import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import errors from './errors';
import content from './content';

export default combineReducers({
    router: routerStateReducer,
    content,
    errors,
});