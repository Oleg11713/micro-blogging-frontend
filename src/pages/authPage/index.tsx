import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "../../components/login";
import Registration from "../../components/registration";

import "./styles.scss";

function AuthPage() {
  return (
    <div className="sign-in-and-sign-up">
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/registration" component={Registration} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default AuthPage;
