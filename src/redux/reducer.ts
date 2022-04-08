import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { userReducer } from "./user/reducer";
import { postReducer } from "./post/reducer";
import { commentReducer } from "./comment/reducer";
import { rootWatcher } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  post: postReducer,
  comment: commentReducer,
  user: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
