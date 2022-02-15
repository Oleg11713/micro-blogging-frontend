import { actionTypes } from "./types";
import { IUser } from "../../interfaces/IUser";

export const setCurrentUser = (currentUser: IUser) => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: currentUser,
});

export const setUsers = (users: []) => ({
  type: actionTypes.SET_USERS,
  payload: users,
});

export const setViewedUser = (viewedUser: IUser) => ({
  type: actionTypes.SET_VIEWED_USER,
  payload: viewedUser,
});
