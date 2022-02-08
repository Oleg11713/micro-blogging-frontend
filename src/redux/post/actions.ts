import { actionTypes } from "./types";
import { IPost } from "../../interfaces/IPost";

export const setPosts = (posts: IPost) => ({
  type: actionTypes.SET_POSTS,
  payload: posts,
});

export const setCurrentPost = (currentPost: IPost) => ({
  type: actionTypes.SET_CURRENT_POST,
  payload: currentPost,
});
