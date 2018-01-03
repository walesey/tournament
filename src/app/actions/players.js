export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const REQUEST_PLAYERS_SUCCESS = 'REQUEST_PLAYERS_SUCCESS';
export const REQUEST_PLAYERS_ERROR = 'REQUEST_PLAYERS_ERROR';

export const requestPlayers = {
  startFn: (url) => ({
    type: REQUEST_PLAYERS,
  }),
  successFn: (url, data) => ({
    type: REQUEST_PLAYERS_SUCCESS,
    players: data,
  }),
  errorFn: (url, error) => ({
    type: REQUEST_PLAYERS_ERROR,
    error,
  }),
};
