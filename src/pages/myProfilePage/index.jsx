import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/selectors';

import './styles.scss';
import Posts from '../../components/posts';
import Comments from '../../components/comments';

function MyProfilePage() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="my-profile-page">
      <div className="personal-info">
        <div className="display-name">{currentUser.displayName}</div>
        <div className="age">{currentUser.age} лет</div>
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
