import { actionTypes } from './types';
import { fetchAllComments } from '../../http/commentAPI';

const INITIAL_STATE = {
  comments: null,
};

fetchAllComments().then(data => {
  INITIAL_STATE.comments = data;
});

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
