import { call, put, takeEvery } from "redux-saga/effects";

import { IPost } from "../../interfaces/IPost";
import { fetchAllPostsFromApi } from "../../http/postAPI";
import { appSlice } from "../appReducer/state";
import { postSlice } from "./state";

const { hideLoader, showAlert, showLoader, hideAlert } = appSlice.actions;
const { setPosts } = postSlice.actions;

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
  yield takeEvery("post/fetchAllPosts", fetchAllPostsWorker);
}
