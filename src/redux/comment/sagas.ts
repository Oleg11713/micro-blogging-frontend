import { call, put, takeEvery } from "redux-saga/effects";

import { setComments } from "./actions";
import { fetchAllCommentsFromApi } from "../../http/commentAPI";
import { IComment } from "../../interfaces/IComment";
import { FETCH_ALL_COMMENTS } from "./types";
import { hideLoader, showAlert, showLoader } from "../app/actions";

function* fetchAllCommentsWorker() {
  try {
    yield put(showLoader());
    const data: IComment[] = yield call(fetchAllCommentsFromApi);
    yield put(setComments(data));
    yield put(hideLoader());
  } catch (e) {
    yield put(showAlert("Не удалось загрузить комментарии"));
  }
}

export function* commentWatcher() {
  yield takeEvery(FETCH_ALL_COMMENTS, fetchAllCommentsWorker);
}
