import { createSelector } from "reselect";

const currentUser = (state: { user: { currentUser: any } }) =>
  state.user.currentUser;
const users = (state: { user: { users: any } }) => state.user.users;
const viewedUser = (state: { user: { viewedUser: any } }) =>
  state.user.viewedUser;

export const selectCurrentUser = createSelector(
  [currentUser],
  currentUser => currentUser,
);

export const selectUsers = createSelector([users], users => users);

export const selectViewedUser = createSelector(
  [viewedUser],
  viewedUser => viewedUser,
);
