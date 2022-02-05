import { actionTypes } from './types';
import { fetchAllPosts } from '../../http/postAPI';

const INITIAL_STATE = {
  posts: null,
  currentPost: null,
};

fetchAllPosts().then(data => {
  INITIAL_STATE.posts = data;
});

export const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case actionTypes.SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };
    default:
      return state;
  }
};
