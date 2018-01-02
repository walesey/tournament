import {
  ERROR_MESSAGE,
} from 'app/actions/errors';

export default function (state = {}, action) {
  switch (action.type) {
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMsg: action.message,
      };
    default:
      return state;
  }
}