import { Dispatch } from "redux";

import { actionTypes } from "./types";
import { IUser } from "../../interfaces/IUser";
import { host } from "../../http";

export const setCurrentUser = (currentUser: void | IUser) => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: currentUser,
});

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
  const { data } = await host.get("auth/viewAllUsers");
  dispatch({ type: actionTypes.FETCH_ALL_USERS, payload: data });
};

export const setViewedUser = (viewedUser: IUser) => ({
  type: actionTypes.SET_VIEWED_USER,
  payload: viewedUser,
});
