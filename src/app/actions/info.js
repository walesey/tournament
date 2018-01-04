export const REQUEST_INFO = 'REQUEST_INFO';
export const REQUEST_INFO_SUCCESS = 'REQUEST_INFO_SUCCESS';
export const REQUEST_INFO_ERROR = 'REQUEST_INFO_ERROR';

export const REQUEST_TOGGLE_CLOCK = 'REQUEST_TOGGLE_CLOCK';
export const REQUEST_TOGGLE_CLOCK_SUCCESS = 'REQUEST_TOGGLE_CLOCK_SUCCESS';
export const REQUEST_TOGGLE_CLOCK_ERROR = 'REQUEST_TOGGLE_CLOCK_ERROR';

export const requestInfo = {
  startFn: (url) => ({
    type: REQUEST_INFO,
  }),
  successFn: (url, data) => ({
    type: REQUEST_INFO_SUCCESS,
    info: data,
  }),
  errorFn: (url, error) => ({
    type: REQUEST_INFO_ERROR,
    error,
  }),
};

export const requestToggleClock = {
  startFn: (url) => ({
    type: REQUEST_TOGGLE_CLOCK,
  }),
  successFn: (url, data) => ({
    type: REQUEST_TOGGLE_CLOCK_SUCCESS,
    info: data,
  }),
  errorFn: (url, error) => ({
    type: REQUEST_TOGGLE_CLOCK_ERROR,
    error,
  }),
};