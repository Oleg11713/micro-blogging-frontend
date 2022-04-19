import { actionTypes } from "./types";

const INITIAL_STATE: Object = {
  comments: null,
};

export const commentReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: [] },
) => {
  switch (action.type) {
    case actionTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};
