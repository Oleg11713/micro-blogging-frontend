import { call, put, takeEvery } from "redux-saga/effects";

import { fetchAllCommentsFromApi } from "../../http/commentAPI";
import { IComment } from "../../interfaces/IComment";
import { appSlice } from "../appReducer/state";
import { commentSlice } from "./state";

const { hideLoader, showAlert, showLoader, hideAlert } = appSlice.actions;
const { setComments } = commentSlice.actions;

function* fetchAllCommentsWorker() {
  try {
    yield put(hideAlert());
    yield put(showLoader());
    const data: IComment[] = yield call(fetchAllCommentsFromApi);
    yield put(setComments(data));
    yield put(hideLoader());
  } catch (e) {
    yield put(showAlert("Не удалось загрузить комментарии"));
  }
}

export function* commentWatcher() {
  yield takeEvery("comment/fetchAllComments", fetchAllCommentsWorker);
}
