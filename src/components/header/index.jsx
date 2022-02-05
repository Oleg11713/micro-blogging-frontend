import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/selectors';
import { setCurrentUser } from '../../redux/user/actions';
import { authLinks, publicLinks } from './links';
import { resetToken } from '../../http/userAPI';

import './styles.scss';

function Header() {
  const currentUser = useSelector(selectCurrentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="header-container">
        <div className="navigation">
          {publicLinks.map(({ path, title }) => (
            <Link className="nav-link" key={path} to={path}>
              {title}
            </Link>
          ))}
          {currentUser &&
            authLinks.map(({ path, title }) => (
              <Link className="nav-link" key={path} to={path}>
                {title}
              </Link>
            ))}
        </div>
        {currentUser ? (
          <Link
            className="login"
            to="/main"
            onClick={() => {
              history.push('/main');
              history.go(0);
              resetToken().then(data => {
                dispatch(setCurrentUser(data));
              });
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
