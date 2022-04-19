import { all } from "redux-saga/effects";

import { postWatcher } from "./postReducer/sagas";
import { commentWatcher } from "./commentReducer/sagas";
import { userWatcher } from "./userReducer/sagas";

export function* rootWatcher() {
  yield all([postWatcher(), commentWatcher(), userWatcher()]);
}
