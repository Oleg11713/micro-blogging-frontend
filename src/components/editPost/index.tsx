import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Fab, IconButton } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

import { updatePost } from "../../http/postAPI";

import "./styles.scss";

interface IEditPostForm {
  initialTitle: string;
  initialContent: string;
  postId: number;
  handleEditFormHide(): void;
}

export const EditPostForm: React.FC<IEditPostForm> = ({
  handleEditFormHide,
  initialTitle,
  initialContent,
  postId,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [file, setFile] = useState("");
  const history = useHistory();

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleUpdatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("id", postId.toString());
      formData.append("title", title);
      formData.append("content", content);
      formData.append("img", file);
      await updatePost(formData);
    } finally {
      handleEditFormHide();
      history.go(0);
    }
  };

  const handleUploadFile = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <>
      <form className="update-post-form" onSubmit={handleUpdatePost}>
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
        <div className="text-area">
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
        <label htmlFor="upload-photo">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={handleUploadFile}
          />
          <Fab
            color="primary"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
          >
            <AddIcon /> Прикрепить картинку
          </Fab>
        </label>
        <div className="update-post">
          <Button variant="contained" type="submit">
            Изменить пост
          </Button>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
};
