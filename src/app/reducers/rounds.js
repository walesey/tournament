import {
  REQUEST_ROUNDS,
  REQUEST_ROUNDS_SUCCESS,
  REQUEST_ROUNDS_ERROR,
} from 'app/actions/rounds';

export default function (state = {}, action) {
  switch (action.type) {
    case REQUEST_ROUNDS: 
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REQUEST_ROUNDS_SUCCESS:
      return {
        ...state,
        loading: false,
        rounds: action.rounds,
        error: null,
      };
    case REQUEST_ROUNDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}