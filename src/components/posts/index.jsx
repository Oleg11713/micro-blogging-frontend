import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { selectCurrentUser } from '../../redux/user/selectors';
import { selectPosts } from '../../redux/post/selectors';
import { setPosts } from '../../redux/post/actions';
import { fetchAllPosts } from '../../http/postAPI';

import './styles.scss';
import { EditPostForm } from '../editPost';
import { ConfirmationDelete } from '../confirmationDelete';

function Posts({ user }) {
  const posts = useSelector(selectPosts);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts()
      .then(data => {
        dispatch(setPosts(data));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  const handleEditFormShow = () => {
    setShowEditForm(true);
  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  const handleDeleteFormShow = () => {
    setShowDeleteForm(true);
  };

  const handleDeleteFormHide = () => {
    setShowDeleteForm(false);
  };

  return (
    <div className="posts-container">
      {showEditForm && (
        <EditPostForm
          handleEditFormHide={handleEditFormHide}
          postId={selectedPost.id}
          initialTitle={selectedPost.title}
          initialContent={selectedPost.content}
        />
      )}
      {showDeleteForm && (
        <ConfirmationDelete
          handleDeleteFormHide={handleDeleteFormHide}
          postId={selectedPost.id}
        />
      )}
      {posts
        .sort((a, b) => a.id - b.id)
        .filter(post => post.userId === user.id)
        .map(post => {
          return (
            <div key={post.id} className="post">
              {currentUser?.id === user?.id && (
                <div className="tools">
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      setSelectedPost(post);
                      handleEditFormShow();
                    }}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
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
              {currentUser?.role === 'ADMIN' && currentUser?.id !== user?.id && (
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
              <div className="comment-icon">
                <IconButton
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
    </div>
  );
}

export default Posts;
