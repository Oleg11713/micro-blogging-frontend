import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton } from '@material-ui/core';

import { updateComment } from '../../http/commentAPI';

import './styles.scss';

export function EditCommentForm({
  handleEditFormHide,
  initialContent,
  commentId,
}) {
  const [content, setContent] = useState(initialContent);
  const history = useHistory();

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleUpdateComment = async () => {
    try {
      const comment = {
        id: commentId,
        content,
      };
      await updateComment(comment);
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
      <form className="update-comment-form">
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
        <h2 className="heading">Редактирование комментария</h2>
        <div>
          <textarea
            className="form-input"
            name="commentContent"
            placeholder="Описание"
            value={content}
            rows={5}
            onChange={handleContentChange}
            required
          />
        </div>
        <div>
          <Button
            className="update-comment-button"
            variant="contained"
            onClick={handleUpdateComment}
          >
            Изменить комментарий
          </Button>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
}
