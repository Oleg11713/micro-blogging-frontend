import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton } from '@material-ui/core';

import { selectCurrentUser } from '../../redux/user/selectors';
import { createComment } from '../../http/commentAPI';

import './styles.scss';

export function AddCommentForm({ handleAddFormHide, postId }) {
  const [content, setContent] = useState('');
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser);

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleCreateComment = async () => {
    try {
      const comment = {
        content,
        userId: currentUser.id,
        postId,
      };
      await createComment(comment);
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
      <form className="add-comment-form">
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
        <h2 className="heading">Добавление комментария</h2>
        <div>
          <textarea
            className="form-input"
            name="postContent"
            placeholder="Комментарий"
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
            onClick={handleCreateComment}
          >
            Добавить комментарий
          </Button>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
}
