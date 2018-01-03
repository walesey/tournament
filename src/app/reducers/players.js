import {
  REQUEST_PLAYERS,
  REQUEST_PLAYERS_SUCCESS,
  REQUEST_PLAYERS_ERROR,
} from 'app/actions/players';

export default function (state = {}, action) {
  switch (action.type) {
    case REQUEST_PLAYERS: 
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REQUEST_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        players: action.players,
        error: null,
      };
    case REQUEST_PLAYERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}