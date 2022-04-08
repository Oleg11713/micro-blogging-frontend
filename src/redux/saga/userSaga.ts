import { call, put, takeEvery } from "redux-saga/effects";

import { fetchAllUsersFromApi } from "../../http/userAPI";
import { setUsers } from "../user/actions";
import { FETCH_ALL_USERS } from "../user/types";
import { IUser } from "../../interfaces/IUser";

function* fetchAllUsersWorker() {
  const data: IUser[] = yield call(fetchAllUsersFromApi);
  yield put(setUsers(data));
}

export function* userWatcher() {
  yield takeEvery(FETCH_ALL_USERS, fetchAllUsersWorker);
}
