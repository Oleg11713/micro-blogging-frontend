import { call, put, takeEvery } from "redux-saga/effects";

import { setPosts } from "./actions";
import { IPost } from "../../interfaces/IPost";
import { FETCH_ALL_POSTS } from "./types";
import { fetchAllPostsFromApi } from "../../http/postAPI";
import { hideAlert, hideLoader, showAlert, showLoader } from "../app/actions";

function* fetchAllPostsWorker() {
  try {
    yield put(hideAlert());
    yield put(showLoader());
    const data: IPost[] = yield call(fetchAllPostsFromApi);
    yield put(setPosts(data));
    yield put(hideLoader());
  } catch (e) {
    yield put(showAlert("Не удалось загрузить посты"));
  }
}

export function* postWatcher() {
  yield takeEvery(FETCH_ALL_POSTS, fetchAllPostsWorker);
}
