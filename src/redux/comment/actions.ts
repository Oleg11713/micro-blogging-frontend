import { actionTypes } from "./types";
import { IUser } from "../../interfaces/IUser";

export const setComments = (comments: IUser) => ({
  type: actionTypes.SET_COMMENTS,
  payload: comments,
});
