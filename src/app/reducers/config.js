import {
  REQUEST_CONFIG,
  REQUEST_CONFIG_SUCCESS,
  REQUEST_CONFIG_ERROR,
} from 'app/actions/config';

export default function (state = {}, action) {
  switch (action.type) {
    case REQUEST_CONFIG: 
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REQUEST_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        gameLengthSeconds: action.config.gameLengthSeconds,
        overtimeSeconds: action.config.overtimeSeconds,
        rounds: action.config.rounds,
        tables: action.config.tables,
        error: null,
      };
    case REQUEST_CONFIG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}