import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";

import { updateComment } from "../../http/commentAPI";

import "./styles.scss";

interface IEditCommentFormProps {
  initialContent: string;
  commentId?: number;
  handleEditFormHide(): void;
}

export const EditCommentForm: React.FC<IEditCommentFormProps> = ({
  handleEditFormHide,
  initialContent,
  commentId,
}) => {
  const [content, setContent] = useState(initialContent);
  const history = useHistory();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleUpdateComment = async () => {
    try {
      const comment = {
        id: commentId,
        content,
      };
      await updateComment(comment);
    } finally {
      handleEditFormHide();
      history.go(0);
    }
  };

  return (
    <>
      <form className="update-comment-form" onSubmit={handleUpdateComment}>
        <div className="form-wrapper">
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
              maxLength={250}
              rows={5}
              onChange={handleContentChange}
              required
            />
          </div>
          <div>
            <Button
              className="update-comment-button"
              variant="contained"
              type="submit"
            >
              Изменить комментарий
            </Button>
          </div>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
};
