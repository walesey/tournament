export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const REQUEST_CONTENT_SUCCESS = 'REQUEST_CONTENT_SUCCESS';
export const REQUEST_CONTENT_ERROR = 'REQUEST_CONTENT_ERROR';

export const requestContent = {
  startFn: (url) => ({
    type: REQUEST_CONTENT,
  }),
  successFn: (url, data) => ({
    type: REQUEST_CONTENT_SUCCESS,
    content: data,
  }),
  errorFn: (url, error) => ({
    type: REQUEST_CONTENT_ERROR,
    error,
  }),
};
