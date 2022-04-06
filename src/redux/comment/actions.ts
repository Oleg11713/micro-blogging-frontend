import { Dispatch } from "redux";

import { actionTypes } from "./types";
import { authHost } from "../../http";
import { IComment } from "../../interfaces/IComment";

export const fetchAllComments = () => async (dispatch: Dispatch) => {
  const { data } = await authHost.get("comments/viewAllComments");
  dispatch({ type: actionTypes.FETCH_ALL_COMMENTS, payload: data });
};

export const createComment =
  (comment: IComment) => async (dispatch: Dispatch) => {
    const { data } = await authHost.post("comments/createComment", comment);
    dispatch({ type: actionTypes.CREATE_COMMENT, payload: data });
  };

export const updateComment =
  (updatedComment: { id?: number; content: string }) =>
  async (dispatch: Dispatch) => {
    const { data } = await authHost.patch(
      `comments/updateComment`,
      updatedComment,
    );
    dispatch({ type: actionTypes.UPDATE_COMMENT, payload: data });
  };

export const deleteComment = (id: number) => async (dispatch: Dispatch) => {
  const { data } = await authHost.delete(`comments/deleteComment/${id}`);
  dispatch({ type: actionTypes.DELETE_COMMENT, payload: data });
};
