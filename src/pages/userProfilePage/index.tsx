import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import { setViewedUser } from "../../redux/user/actions";
import {
  selectCurrentUser,
  selectViewedUser,
} from "../../redux/user/selectors";
import { Comments } from "../../components/comments";
import { Posts } from "../../components/posts";
import { fetchOneUser } from "../../http/userAPI";
import { ADMIN } from "../../utils/constsRoles";

import "./styles.scss";

function UserProfilePage() {
  const viewedUser = useSelector(selectViewedUser);
  const currentUser = useSelector(selectCurrentUser);
  const [age, setAge] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOneUser(id)
      .then(viewedUser => {
        if (viewedUser.age < 10 || viewedUser.age > 20) {
          if (
            viewedUser.age.toString().split("")[
              viewedUser.age.toString().split("").length - 1
            ] === "2" ||
            viewedUser.age.toString().split("")[
              viewedUser.age.toString().split("").length - 1
            ] === "3" ||
            viewedUser.age.toString().split("")[
              viewedUser.age.toString().split("").length - 1
            ] === "4"
          ) {
            setAge(`${viewedUser.age} года`);
          } else if (
            viewedUser.age.toString().split("")[
              viewedUser.age.toString().split("").length - 1
            ] === "1"
          ) {
            setAge(`${viewedUser.age} год`);
          } else {
            setAge(`${viewedUser.age} лет`);
          }
        } else {
          setAge(`${viewedUser.age} лет`);
        }
        dispatch(setViewedUser(viewedUser));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <div className="user-profile-page">
      <div className="personal-info">
        <div className="display-name">{viewedUser.displayName}</div>
        <div className="age">{age}</div>
        <div className="email">Email: {viewedUser.email}</div>
        {currentUser.role === ADMIN && (
          <div className="role">Роль: {viewedUser.role}</div>
        )}
      </div>
      <hr className="area" />
      <div className="activity">Активность за всё время</div>
      <div className="posts-and-comments">
        <div className="posts">
          <span className="heading">Посты</span>
          <Posts user={viewedUser} />
        </div>
        <div className="comments">
          <span className="heading">Комментарии</span>
          <Comments user={viewedUser} />
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
