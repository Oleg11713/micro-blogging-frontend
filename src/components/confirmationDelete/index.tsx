import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";

import { deletePost } from "../../redux/post/actions";
import { deleteComment } from "../../redux/comment/actions";
import { selectComments } from "../../redux/comment/selectors";

import "./styles.scss";

interface IConfirmationDeleteProps {
  commentId?: number;
  postId?: number;
  postPage?: boolean;
  handleDeleteFormHide(): void;
}

export const ConfirmationDelete: React.FC<IConfirmationDeleteProps> = ({
  handleDeleteFormHide,
  commentId,
  postId,
  postPage,
}) => {
  const history = useHistory();
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      if (commentId) await deleteComment(commentId);
      else {
        if (comments)
          comments
            .filter(
              (comment: { postId: number | undefined }) =>
                comment.postId === postId,
            )
            .map(async (comment: { id: number }) => {
              dispatch(deleteComment(comment.id));
            });
        dispatch(deletePost(postId));
      }
    } finally {
      if (postPage) history.push("/main");
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
};
