import { createSelector } from "reselect";
import { IUser } from "../../interfaces/IUser";

const currentUser = (state: { user: { currentUser: IUser } }) =>
  state.user.currentUser;
const users = (state: { user: { users: [] } }) => state.user.users;
const viewedUser = (state: { user: { viewedUser: IUser } }) =>
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
