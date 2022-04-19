import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import { useAppSelector } from "../../redux/reducer";
import { userSlice } from "../../redux/userReducer/state";
import { IUser } from "../../interfaces/IUser";
import { ADMIN, USER } from "../../utils/constsRoles";

import "./styles.scss";

function UsersPage() {
  const { fetchAllUsers } = userSlice.actions;
  const { users, currentUser } = useAppSelector(state => state.userReducer);
  const { loading, alert } = useAppSelector(state => state.appReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const displayAge = (age: number) => {
    let resultStringAge = "";
    if (age < 10 || age > 20) {
      if (
        age.toString().split("")[age.toString().split("").length - 1] === "2" ||
        age.toString().split("")[age.toString().split("").length - 1] === "3" ||
        age.toString().split("")[age.toString().split("").length - 1] === "4"
      ) {
        resultStringAge = `${age} года`;
      } else if (
        age.toString().split("")[age.toString().split("").length - 1] === "1"
      ) {
        resultStringAge = `${age} год`;
      } else {
        resultStringAge = `${age} лет`;
      }
    } else {
      resultStringAge = `${age} лет`;
    }
    return resultStringAge;
  };

  return (
    <>
      {alert && (
        <div
          className="alert alert-primary"
          role="alert"
          style={{ marginBottom: "0" }}
        >
          {alert}
        </div>
      )}
      <div className="users-page">
        <div className="heading-role">Администратор</div>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          users &&
          Object.values(users)
            .filter((user: IUser) => user.role === ADMIN)
            .map((user: IUser) => {
              return (
                <div key={user.id} className="user">
                  <div className="personal-info">
                    <div className="display-name">{user.displayName}</div>
                    <div className="age">{displayAge(user.age)}</div>
                  </div>
                  {currentUser.id !== 0 && (
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
            })
        )}
        <div className="heading-role heading-users">Пользователи</div>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          users &&
          Object.values(users)
            .filter((user: IUser) => user.role === USER)
            .map((user: IUser) => {
              return (
                <div key={user.id} className="user">
                  <div className="personal-info">
                    <div className="display-name">{user.displayName}</div>
                    <div className="age">{displayAge(user.age)}</div>
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
            })
        )}
      </div>
    </>
  );
}

export default UsersPage;
