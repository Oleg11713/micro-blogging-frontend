import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Button } from '@material-ui/core';

import { fetchAllUsers } from '../../http/userAPI';
import { selectCurrentUser, selectUsers } from '../../redux/user/selectors';
import { setUsers } from '../../redux/user/actions';

import './styles.scss';

function UsersPage() {
  const users = useSelector(selectUsers);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers()
      .then(data => {
        dispatch(setUsers(data));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <div className="users-page">
      <div className="heading-role">Администратор</div>
      {users
        .filter(user => user.role === 'ADMIN')
        .map(user => {
          return (
            <div key={user.id} className="user">
              <div className="personal-info">
                <div className="display-name">{user.displayName}</div>
                <div className="age">{user.age} лет</div>
              </div>
              {currentUser && (
                <Button
                  variant="contained"
                  onClick={() => {
                    history.push(`/userProfile/${user.id}`);
                  }}
                >
                  Посмотреть профиль
                </Button>
              )}
            </div>
          );
        })}
      <div className="heading-role heading-users">Пользователи</div>
      {users
        .filter(user => user.role === 'USER')
        .map(user => {
          return (
            <div key={user.id} className="user">
              <div className="personal-info">
                <div className="display-name">{user.displayName}</div>
                <div className="age">{user.age} лет</div>
              </div>
              {currentUser && (
                <Button
                  variant="contained"
                  onClick={() => {
                    history.push(`/userProfile/${user.id}`);
                  }}
                >
                  Посмотреть профиль
                </Button>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default UsersPage;
