import { actionTypes } from './types';

export const setCurrentUser = currentUser => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: currentUser,
});

export const setUsers = users => ({
  type: actionTypes.SET_USERS,
  payload: users,
});

export const setViewedUser = viewedUser => ({
  type: actionTypes.SET_VIEWED_USER,
  payload: viewedUser,
});
