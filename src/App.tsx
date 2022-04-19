import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

import Header from "./components/header";
import { useAppSelector } from "./redux/reducer";
import { userSlice } from "./redux/userReducer/state";
import { authCheck } from "./http/userAPI";
import { MAIN_PAGE_ROUTE } from "./utils/constsRoutes";
import { authRoutes, publicRoutes } from "./routes";

import "./App.scss";
import { IUser } from "./interfaces/IUser";

function App() {
  const { setCurrentUser } = userSlice.actions;
  const { currentUser } = useAppSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authCheck()
      .then((user: IUser) => dispatch(setCurrentUser(user)))
      .catch(() => {
        toast.warning("Пользователь не авторизован", {
          className: "toast-error",
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {currentUser &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} exact path={path} component={Component} />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} exact path={path} component={Component} />
        ))}
        <Redirect to={MAIN_PAGE_ROUTE} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
