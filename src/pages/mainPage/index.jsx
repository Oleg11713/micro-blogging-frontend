import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@material-ui/core';

import { AddPostForm } from '../../components/addPost';
import { selectCurrentUser, selectUsers } from '../../redux/user/selectors';
import { selectPosts } from '../../redux/post/selectors';
import { setUsers } from '../../redux/user/actions';
import { setPosts } from '../../redux/post/actions';
import { fetchAllPosts } from '../../http/postAPI';
import { fetchAllUsers } from '../../http/userAPI';

import './styles.scss';
import { ConfirmationDelete } from '../../components/confirmationDelete';

function MainPage() {
  const users = useSelector(selectUsers);
  const posts = useSelector(selectPosts);
  const currentUser = useSelector(selectCurrentUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts()
      .then(data => {
        setLoading(true);
        dispatch(setPosts(data));
      })
      .finally(() => {
        setLoading(false);
      });
    fetchAllUsers()
      .then(data => {
        setLoading(true);
        dispatch(setUsers(data));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  const handleAddFormHide = () => {
    setShowAddForm(false);
  };

  const handleAddFormShow = () => {
    setShowAddForm(true);
  };

  const handleDeleteFormShow = () => {
    setShowDeleteForm(true);
  };

  const handleDeleteFormHide = () => {
    setShowDeleteForm(false);
  };

  return (
    <div className="main-page">
      {showAddForm && <AddPostForm handleAddFormHide={handleAddFormHide} />}
      {showDeleteForm && (
        <ConfirmationDelete
          handleDeleteFormHide={handleDeleteFormHide}
          postId={selectedPost.id}
        />
      )}
      {currentUser && (
        <Button
          className="add-post-button"
          variant="contained"
          onClick={handleAddFormShow}
        >
          Добавить новый пост
        </Button>
      )}
      {posts &&
        posts
          .sort((a, b) => b.id - a.id)
          .map(post => {
            return (
              <div key={post.id} className="post-container">
                {users &&
                  users
                    .filter(user => post.userId === user.id)
                    .map(({ displayName, id }) => {
                      return (
                        <Link
                          key={displayName}
                          className="user-display-name"
                          to={`/userProfile/${id}`}
                        >
                          {displayName}
                        </Link>
                      );
                    })}
                <div className="post">
                  {(currentUser?.role === 'ADMIN' ||
                    currentUser?.id === post.userId) && (
                    <div className="tools">
                      <IconButton
                        className="delete-icon"
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          setSelectedPost(post);
                          handleDeleteFormShow();
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  )}
                  <div className="info">
                    <div className="title">{post.title}</div>
                    <div className="content">{post.content}</div>
                  </div>
                  <IconButton
                    className="comment-icon"
                    onClick={() => {
                      history.push(`/post/${post.id}`);
                    }}
                    aria-label="edit"
                    size="small"
                  >
                    <ChatBubbleOutlineIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </div>
            );
          })}
      <ToastContainer />
    </div>
  );
}

export default MainPage;
