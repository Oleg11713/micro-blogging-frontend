import { call, put, takeEvery } from "redux-saga/effects";

import { fetchAllUsersFromApi } from "../../http/userAPI";
import { IUser } from "../../interfaces/IUser";
import { appSlice } from "../appReducer/state";
import { userSlice } from "./state";

const { showLoader, hideLoader, showAlert, hideAlert } = appSlice.actions;
const { setUsers } = userSlice.actions;

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
  yield takeEvery("user/fetchAllUsers", fetchAllUsersWorker);
}
