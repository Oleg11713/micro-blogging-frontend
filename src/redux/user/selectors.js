import { createSelector } from 'reselect';

const currentUser = state => state.user.currentUser;
const users = state => state.user.users;
const viewedUser = state => state.user.viewedUser;

export const selectCurrentUser = createSelector(
  [currentUser],
  currentUser => currentUser,
);

export const selectUsers = createSelector([users], users => users);

export const selectViewedUser = createSelector(
  [viewedUser],
  viewedUser => viewedUser,
);
