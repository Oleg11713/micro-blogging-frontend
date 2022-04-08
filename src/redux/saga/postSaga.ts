import { call, put, takeEvery } from "redux-saga/effects";
import { setPosts } from "../post/actions";
import { IPost } from "../../interfaces/IPost";
import { FETCH_ALL_POSTS } from "../post/types";
import { fetchAllPostsFromApi } from "../../http/postAPI";

function* fetchAllPostsWorker() {
  const data: IPost[] = yield call(fetchAllPostsFromApi);
  yield put(setPosts(data));
}

export function* postWatcher() {
  yield takeEvery(FETCH_ALL_POSTS, fetchAllPostsWorker);
}
