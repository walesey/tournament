export const REQUEST_ROUNDS = 'REQUEST_ROUNDS';
export const REQUEST_ROUNDS_SUCCESS = 'REQUEST_ROUNDS_SUCCESS';
export const REQUEST_ROUNDS_ERROR = 'REQUEST_ROUNDS_ERROR';

export const requestRounds = {
  startFn: (url) => ({
    type: REQUEST_ROUNDS,
  }),
  successFn: (url, data) => ({
    type: REQUEST_ROUNDS_SUCCESS,
    rounds: data,
  }),
  errorFn: (url, error) => ({
    type: REQUEST_ROUNDS_ERROR,
    error,
  }),
};
