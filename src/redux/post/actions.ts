import { Dispatch } from "redux";

import { actionTypes } from "./types";
import { authHost } from "../../http";

export const fetchAllPosts = () => async (dispatch: Dispatch) => {
  const { data } = await authHost.get("publications/viewAllPublications");
  dispatch({ type: actionTypes.FETCH_ALL_POSTS, payload: data });
};

export const fetchOnePost =
  (id: string | undefined) => async (dispatch: Dispatch) => {
    const { data } = await authHost.get(`publications/viewPublication/${id}`);
    dispatch({ type: actionTypes.FETCH_ONE_POST, payload: data });
  };

export const createPost = (post: FormData) => async (dispatch: Dispatch) => {
  const { data } = await authHost.post("publications/createPublication", post);
  dispatch({ type: actionTypes.CREATE_POST, payload: data });
};

export const updatePost =
  (updatedPost: FormData) => async (dispatch: Dispatch) => {
    const { data } = await authHost.patch(
      `publications/updatePublication`,
      updatedPost,
    );
    dispatch({ type: actionTypes.UPDATE_POST, payload: data });
  };

export const deletePost = (id?: number) => async (dispatch: Dispatch) => {
  const { data } = await authHost.delete(
    `publications/deletePublication/${id}`,
  );
  dispatch({ type: actionTypes.DELETE_POST, payload: data });
};
