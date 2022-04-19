import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { userReducer } from "./user/reducer";
import { postReducer } from "./post/reducer";
import { commentReducer } from "./comment/reducer";
import { appReducer } from "./app/reducer";
import { rootWatcher } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  post: postReducer,
  comment: commentReducer,
  user: userReducer,
  app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
