import { combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import postReducer from "./postReducer/state";
import commentReducer from "./commentReducer/state";
import userReducer from "./userReducer/state";
import appReducer from "./appReducer/state";

export const rootReducer = combineReducers({
  appReducer,
  postReducer,
  commentReducer,
  userReducer,
});

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
