import { actionTypes } from "./types";
import { IPost } from "../../interfaces/IPost";

const INITIAL_STATE: Object = {
  posts: null,
  currentPost: null,
};

export const postReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: [] | IPost },
) => {
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
