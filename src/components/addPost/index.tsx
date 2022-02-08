import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, IconButton } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";

import { selectCurrentUser } from "../../redux/user/selectors";
import { createPost } from "../../http/postAPI";
import { IPost } from "../../interfaces/IPost";

import "./styles.scss";

interface IAddPostFormProps {
  handleAddFormHide(): void;
}

export const AddPostForm: React.FC<IAddPostFormProps> = ({
  handleAddFormHide,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleCreatePost = async () => {
    try {
      const post: IPost = {
        title,
        content,
        userId: currentUser.id,
      };
      await createPost(post);
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
            onClick={handleCreatePost}
          >
            Добавить пост
          </Button>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
};
