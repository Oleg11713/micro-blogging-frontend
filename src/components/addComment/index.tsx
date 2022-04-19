import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";

import { useAppSelector } from "../../redux/reducer";
import { createComment } from "../../http/commentAPI";
import { IComment } from "../../interfaces/IComment";

import "./styles.scss";

interface IAddCommentFormProps {
  publicationId: number;
  handleAddFormHide(): void;
}

export const AddCommentForm: React.FC<IAddCommentFormProps> = ({
  handleAddFormHide,
  publicationId,
}) => {
  const { comments } = useAppSelector(state => state.commentReducer);
  const [content, setContent] = useState("");
  const history = useHistory();
  const { currentUser } = useAppSelector(state => state.userReducer);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCreateComment = async () => {
    try {
      const comment: IComment = {
        id: comments.length + 1,
        content,
        userId: currentUser.id,
        publicationId,
      };
      await createComment(comment);
    } finally {
      handleAddFormHide();
      history.go(0);
    }
  };

  return (
    <>
      <form className="add-comment-form" onSubmit={handleCreateComment}>
        <div className="form-wrapper">
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
              maxLength={250}
              rows={5}
              onChange={handleContentChange}
              required
            />
          </div>
          <div>
            <Button
              className="add-post-button"
              variant="contained"
              type="submit"
            >
              Добавить комментарий
            </Button>
          </div>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
};
