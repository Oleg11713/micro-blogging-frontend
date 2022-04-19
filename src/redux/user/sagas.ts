import { call, put, takeEvery } from "redux-saga/effects";

import { fetchAllUsersFromApi } from "../../http/userAPI";
import { setUsers } from "./actions";
import { FETCH_ALL_USERS } from "./types";
import { IUser } from "../../interfaces/IUser";
import { hideAlert, hideLoader, showAlert, showLoader } from "../app/actions";

function* fetchAllUsersWorker() {
  try {
    yield put(hideAlert());
    yield put(showLoader());
    const data: IUser[] = yield call(fetchAllUsersFromApi);
    yield put(setUsers(data));
    yield put(hideLoader());
  } catch (e) {
    yield put(showAlert("Не удалось загрузить пользователей"));
  }
}

export function* userWatcher() {
  yield takeEvery(FETCH_ALL_USERS, fetchAllUsersWorker);
}
