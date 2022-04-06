import { actionTypes } from "./types";

const INITIAL_STATE: Object = {
  comments: null,
};

export const commentReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: [] },
) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case actionTypes.CREATE_COMMENT:
      return {
        ...state,
      };
    case actionTypes.UPDATE_COMMENT:
      return {
        ...state,
      };
    case actionTypes.DELETE_COMMENT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
