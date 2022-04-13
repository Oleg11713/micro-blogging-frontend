import { all } from "redux-saga/effects";

import { postWatcher } from "./post/sagas";
import { commentWatcher } from "./comment/sagas";
import { userWatcher } from "./user/sagas";

export function* rootWatcher() {
  yield all([postWatcher(), commentWatcher(), userWatcher()]);
}
