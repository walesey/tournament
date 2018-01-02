import {
  REQUEST_CONTENT,
  REQUEST_CONTENT_SUCCESS,
  REQUEST_CONTENT_ERROR,
} from 'app/actions/content';

export default function (state = {}, action) {
  switch (action.type) {
    case REQUEST_CONTENT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REQUEST_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        content: action.content,
        error: null,
      };
    case REQUEST_CONTENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}