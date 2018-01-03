export const REQUEST_CONFIG = 'REQUEST_CONFIG';
export const REQUEST_CONFIG_SUCCESS = 'REQUEST_CONFIG_SUCCESS';
export const REQUEST_CONFIG_ERROR = 'REQUEST_CONFIG_ERROR';

export const requestConfig = {
  startFn: (url) => ({
    type: REQUEST_CONFIG,
  }),
  successFn: (url, data) => ({
    type: REQUEST_CONFIG_SUCCESS,
    config: data,
  }),
  errorFn: (url, error) => ({
    type: REQUEST_CONFIG_ERROR,
    error,
  }),
};
