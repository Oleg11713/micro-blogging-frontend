import React from "react";
import { useHistory } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";

import { useAppSelector } from "../../redux/reducer";
import { deletePost } from "../../http/postAPI";
import { deleteComment } from "../../http/commentAPI";

import "./styles.scss";
import { IComment } from "../../interfaces/IComment";

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
  const { comments } = useAppSelector(state => state.commentReducer);

  const handleDelete = async () => {
    try {
      if (commentId) await deleteComment(commentId);
      else {
        if (comments)
          comments
            .filter((comment: IComment) => comment.publicationId === postId)
            .map(async (comment: IComment) => {
              await deleteComment(comment.id);
            });
        await deletePost(postId);
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
