export const REQUEST_GAMES = 'REQUEST_GAMES';
export const REQUEST_GAMES_SUCCESS = 'REQUEST_GAMES_SUCCESS';
export const REQUEST_GAMES_ERROR = 'REQUEST_GAMES_ERROR';

export const REQUEST_NEW_ROUND = 'REQUEST_NEW_ROUND';
export const REQUEST_NEW_ROUND_SUCCESS = 'REQUEST_NEW_ROUND_SUCCESS';
export const REQUEST_NEW_ROUND_ERROR = 'REQUEST_NEW_ROUND_ERROR';

export const requestGames = {
  startFn: (url) => ({
    type: REQUEST_GAMES,
  }),
  successFn: (url, data) => ({
    type: REQUEST_GAMES_SUCCESS,
    games: data,
  }),
  errorFn: (url, error) => ({
    type: REQUEST_GAMES_ERROR,
    error,
  }),
};

export const requestNewRound = {
  startFn: (url) => ({
    type: REQUEST_NEW_ROUND,
  }),
  successFn: (url, data) => ({
    type: REQUEST_NEW_ROUND_SUCCESS,
    games: data,
  }),
  errorFn: (url, error) => ({
    type: REQUEST_NEW_ROUND_ERROR,
    error,
  }),
};
