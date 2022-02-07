import { actionTypes } from './types';

const INITIAL_STATE = {
  users: null,
  currentUser: null,
  viewedUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case actionTypes.SET_VIEWED_USER:
      return {
        ...state,
        viewedUser: action.payload,
      };
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
