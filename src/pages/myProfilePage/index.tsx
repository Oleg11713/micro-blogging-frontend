import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/selectors";

import { Comments } from "../../components/comments";
import { Posts } from "../../components/posts";

import "./styles.scss";

function MyProfilePage() {
  const currentUser = useSelector(selectCurrentUser);

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
    <div className="my-profile-page">
      <div className="personal-info">
        <div className="display-name">{currentUser.displayName}</div>
        <div className="age">{displayAge(currentUser.age)}</div>
        <div className="email">Email: {currentUser.email}</div>
        <div className="role">Роль: {currentUser.role}</div>
      </div>
      <hr className="area" />
      <div className="activity">Активность за всё время</div>
      <div className="posts-and-comments">
        <div className="posts">
          <span className="heading">Мои посты</span>
          <Posts user={currentUser} />
        </div>
        <div className="comments">
          <span className="heading">Мои комментарии</span>
          <Comments user={currentUser} />
        </div>
      </div>
    </div>
  );
}

export default MyProfilePage;
