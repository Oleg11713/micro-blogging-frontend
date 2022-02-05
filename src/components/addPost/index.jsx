import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton } from '@material-ui/core';

import { selectCurrentUser } from '../../redux/user/selectors';
import { createPost } from '../../http/postAPI';

import './styles.scss';

export function AddPostForm({ handleAddFormHide }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser);

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleCreatePost = async () => {
    try {
      const post = {
        title,
        content,
        userId: currentUser.id,
      };
      await createPost(post);
    } catch (e) {
      toast.error(`${e.response.data.message}`, {
        className: 'toast-error',
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      handleAddFormHide();
      history.go(0);
    }
  };

  return (
    <>
      <form className="add-post-form">
        <div className="tools">
          <IconButton
            className="cancel-icon"
            aria-label="cancel"
            size="small"
            onClick={handleAddFormHide}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <h2 className="heading">Создание поста</h2>
        <div>
          <input
            className="form-input"
            type="text"
            name="postTitle"
            placeholder="Заголовок"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            className="form-input"
            name="postContent"
            placeholder="Описание"
            value={content}
            rows={5}
            onChange={handleContentChange}
            required
          />
        </div>
        <div>
          <Button
            className="add-post-button"
            variant="contained"
            onClick={handleCreatePost}
          >
            Добавить пост
          </Button>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
}
