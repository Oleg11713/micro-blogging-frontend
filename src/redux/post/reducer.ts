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
    case actionTypes.FETCH_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case actionTypes.FETCH_ONE_POST:
      return {
        ...state,
        currentPost: action.payload,
      };
    case actionTypes.CREATE_POST:
      return {
        ...state,
      };
    case actionTypes.UPDATE_POST:
      return {
        ...state,
      };
    case actionTypes.DELETE_POST:
      return {
        ...state,
      };
    default:
      return state;
  }
};
