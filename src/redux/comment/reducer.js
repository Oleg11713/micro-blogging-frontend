import { actionTypes } from './types';

const INITIAL_STATE = {
  comments: null,
};

export const commentReducer = (state = INITIAL_STATE, action) => {
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
