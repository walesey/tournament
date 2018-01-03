import {
  REQUEST_INFO,
  REQUEST_INFO_SUCCESS,
  REQUEST_INFO_ERROR,
} from 'app/actions/info';

export default function (state = {}, action) {
  switch (action.type) {
    case REQUEST_INFO:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REQUEST_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        roundIndex: action.info.roundIndex,
        timerOn: action.info.timerOn,
        timerSeconds: action.info.timerSeconds,
        error: null,
      };
    case REQUEST_INFO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}