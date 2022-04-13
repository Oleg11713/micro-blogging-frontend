import { actionTypes } from "./types";

const initialState: Object = {
  loading: false,
  alert: null,
};

export const appReducer = (
  state = initialState,
  action: { type: string; payload: [] },
) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case actionTypes.HIDE_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};
