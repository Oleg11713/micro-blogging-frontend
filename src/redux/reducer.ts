import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { userReducer } from "./user/reducer";
import { postReducer } from "./post/reducer";
import { commentReducer } from "./comment/reducer";

const rootReducer = combineReducers({
  post: postReducer,
  comment: commentReducer,
  user: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
