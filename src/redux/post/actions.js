import { actionTypes } from './types';

export const setPosts = posts => ({
  type: actionTypes.SET_POSTS,
  payload: posts,
});

export const setCurrentPost = currentPost => ({
  type: actionTypes.SET_CURRENT_POST,
  payload: currentPost,
});
