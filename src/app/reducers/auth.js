import {
  SET_PASSWORD
} from 'app/actions/auth';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_PASSWORD: 
      return {
        ...state,
        password: action.password,
      };

    default:
      return state;
  }
}