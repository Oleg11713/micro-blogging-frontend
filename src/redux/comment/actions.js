import { actionTypes } from './types';

export const setComments = comments => ({
  type: actionTypes.SET_COMMENTS,
  payload: comments,
});
