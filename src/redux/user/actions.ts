import { actionTypes } from "./types";
import { IUser } from "../../interfaces/IUser";

export const setCurrentUser = (currentUser: void | IUser) => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: currentUser,
});

export const setUsers = (users: IUser[]) => ({
  type: actionTypes.SET_USERS,
  payload: users,
});

export const setViewedUser = (viewedUser: IUser) => ({
  type: actionTypes.SET_VIEWED_USER,
  payload: viewedUser,
});

export const fetchAllUsers = () => ({
  type: actionTypes.FETCH_ALL_USERS,
});
