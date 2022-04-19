import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../redux/user/selectors";
import { authLinksTitles, publicLinksTitles } from "./linksForTitles";
import { authLinksIcons, publicLinksIcons } from "./linksForIcons";
import { resetToken } from "../../http/userAPI";

import "./styles.scss";

function Header() {
  const currentUser = useSelector(selectCurrentUser);
  const history = useHistory();

  return (
    <div className="header">
      <div className="header-container">
        <div className="navigation-for-large-width">
          {publicLinksTitles.map(({ path, title }) => (
            <Link className="nav-link" key={path} to={path}>
              {title}
            </Link>
          ))}
          {currentUser &&
            authLinksTitles.map(({ path, title }) => (
              <Link className="nav-link" key={path} to={path}>
                {title}
              </Link>
            ))}
        </div>
        <div className="navigation-for-small-width">
          {publicLinksIcons.map(({ path, Icon }) => (
            <Link className="nav-link" key={path} to={path}>
              <Icon />
            </Link>
          ))}
          {currentUser &&
            authLinksIcons.map(({ path, Icon }) => (
              <Link className="nav-link" key={path} to={path}>
                <Icon />
              </Link>
            ))}
        </div>
        {currentUser ? (
          <Link
            className="login"
            to="/main"
            onClick={() => {
              history.push("/main");
              history.go(0);
              resetToken();
            }}
          >
            Выйти
          </Link>
        ) : (
          <Link className="login" to="/auth/login">
            Войти
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
