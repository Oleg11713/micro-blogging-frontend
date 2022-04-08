import { call, put, takeEvery } from "redux-saga/effects";

import { setComments } from "../comment/actions";
import { fetchAllCommentsFromApi } from "../../http/commentAPI";
import { IComment } from "../../interfaces/IComment";
import { FETCH_ALL_COMMENTS } from "../comment/types";

function* fetchAllCommentsWorker() {
  const data: IComment[] = yield call(fetchAllCommentsFromApi);
  yield put(setComments(data));
}

export function* commentWatcher() {
  yield takeEvery(FETCH_ALL_COMMENTS, fetchAllCommentsWorker);
}
