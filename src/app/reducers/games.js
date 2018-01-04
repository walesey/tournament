import {
  REQUEST_GAMES,
  REQUEST_GAMES_SUCCESS,
  REQUEST_GAMES_ERROR,
  REQUEST_NEW_ROUND,
  REQUEST_NEW_ROUND_SUCCESS,
  REQUEST_NEW_ROUND_ERROR,
} from 'app/actions/games';

export default function (state = {}, action) {
  switch (action.type) {
    case REQUEST_GAMES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REQUEST_GAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        games: action.games,
        error: null,
      };
    case REQUEST_GAMES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case REQUEST_NEW_ROUND:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REQUEST_NEW_ROUND_SUCCESS:
      return {
        ...state,
        loading: false,
        games: action.games,
        error: null,
      };
    case REQUEST_NEW_ROUND_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}