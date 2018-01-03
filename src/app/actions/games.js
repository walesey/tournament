export const REQUEST_GAMES = 'REQUEST_GAMES';
export const REQUEST_GAMES_SUCCESS = 'REQUEST_GAMES_SUCCESS';
export const REQUEST_GAMES_ERROR = 'REQUEST_GAMES_ERROR';

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
