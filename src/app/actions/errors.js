export const ERROR_MESSAGE = 'ERROR_MESSAGE';

export function errorMessage(message) {
  return {
    type: ERROR_MESSAGE,
    message,
  }
};