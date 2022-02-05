import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton } from '@material-ui/core';

import { updatePost } from '../../http/postAPI';

import './styles.scss';

export function EditPostForm({
  handleEditFormHide,
  initialTitle,
  initialContent,
  postId,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const history = useHistory();

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleUpdatePost = async () => {
    try {
      const post = {
        id: postId,
        title,
        content,
      };
      await updatePost(post);
    } catch (e) {
      toast.error(`${e.response.data.message}`, {
        className: 'toast-error',
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      handleEditFormHide();
      history.go(0);
    }
  };

  return (
    <>
      <form className="update-post-form">
        <div className="tools">
          <IconButton
            className="cancel-icon"
            aria-label="cancel"
            size="small"
            onClick={handleEditFormHide}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <h2 className="heading">Редактирование поста</h2>
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
            className="update-post-button"
            variant="contained"
            onClick={handleUpdatePost}
          >
            Изменить пост
          </Button>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
}
