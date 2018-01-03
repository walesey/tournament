export const REQUEST_INFO = 'REQUEST_INFO';
export const REQUEST_INFO_SUCCESS = 'REQUEST_INFO_SUCCESS';
export const REQUEST_INFO_ERROR = 'REQUEST_INFO_ERROR';

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
