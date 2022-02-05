import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton } from '@material-ui/core';

import { deletePost } from '../../http/postAPI';
import { deleteComment } from '../../http/commentAPI';
import { selectComments } from '../../redux/comment/selectors';

import './styles.scss';

export function ConfirmationDelete({
  handleDeleteFormHide,
  commentId,
  postId,
  postPage,
}) {
  const history = useHistory();
  const comments = useSelector(selectComments);

  const handleDelete = async () => {
    try {
      if (commentId) await deleteComment(commentId);
      else {
        comments
          .filter(comment => comment.postId === postId)
          .map(async comment => {
            await deleteComment(comment.id);
          });
        await deletePost(postId);
      }
    } catch (e) {
      toast.error(`${e.response.data.message}`, {
        className: 'toast-error',
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      if (postPage) history.push('/main');
      handleDeleteFormHide();
      history.go(0);
    }
  };

  return (
    <>
      <form className="delete-form">
        <div className="tools">
          <IconButton
            className="cancel-icon"
            aria-label="cancel"
            size="small"
            onClick={handleDeleteFormHide}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <div className="confirmation">Вы действительно хотите удалить?</div>
        <div className="buttons-container">
          <Button
            className="button-yes"
            variant="contained"
            onClick={handleDelete}
          >
            Да
          </Button>
          <Button
            className="button-no"
            variant="contained"
            onClick={handleDeleteFormHide}
          >
            Нет
          </Button>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
}
