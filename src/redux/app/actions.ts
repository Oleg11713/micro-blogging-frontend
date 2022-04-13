import { actionTypes } from "./types";

export const showLoader = () => ({
  type: actionTypes.SHOW_LOADER,
});

export const hideLoader = () => ({
  type: actionTypes.HIDE_LOADER,
});

export const showAlert = (text: string) => ({
  type: actionTypes.SHOW_ALERT,
  payload: text,
});

export const hideAlert = () => ({
  type: actionTypes.HIDE_ALERT,
});
