import fetch from 'isomorphic-fetch';

export function getRequest(url, { startFn, successFn, errorFn }) {
  return genericRequest(url, null, 'GET', {}, { startFn, successFn, errorFn });
};

export function postRequest(url, body, { startFn, successFn, errorFn }) {
  return genericRequest(url, body, 'POST', {}, { startFn, successFn, errorFn });
};

export function putRequest(url, body, { startFn, successFn, errorFn }) {
  return genericRequest(url, body, 'PUT', {}, { startFn, successFn, errorFn });
};

export function deleteRequest(url, body, { startFn, successFn, errorFn }) {
  return genericRequest(url, body, 'DELETE', {}, { startFn, successFn, errorFn });
};

export function genericRequest(url, body, method, headers, { startFn, successFn, errorFn }) {
  return (dispatch) => {
    dispatch(startFn(url))
    return fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status >= 400) {
          dispatch(errorFn(url, `${response.status} Error`))
        } else if (response.status == 204) {
          dispatch(successFn(url, null));
        } else {
          response.json().then(json => dispatch(successFn(url, json)));
        }
      })
      .catch(err => dispatch(errorFn(url, err)));
  }
}
