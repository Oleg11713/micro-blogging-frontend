import { actionTypes } from "./types";
import { IComment } from "../../interfaces/IComment";

export const setComments = (comments: IComment[]) => ({
  type: actionTypes.SET_COMMENTS,
  payload: comments,
});

export const fetchAllComments = () => ({
  type: actionTypes.FETCH_ALL_COMMENTS,
});
