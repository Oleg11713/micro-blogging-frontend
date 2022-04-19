import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Fab, IconButton } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

import { useAppSelector } from "../../redux/reducer";
import { createPost } from "../../http/postAPI";

import "./styles.scss";

interface IAddPostFormProps {
  handleAddFormHide(): void;
}

export const AddPostForm: React.FC<IAddPostFormProps> = ({
  handleAddFormHide,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const history = useHistory();
  const { currentUser } = useAppSelector(state => state.userReducer);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCreatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      images.map(image => formData.append("images", image));
      formData.append("userId", currentUser.id.toString());
      await createPost(formData);
    } finally {
      handleAddFormHide();
      history.go(0);
    }
  };

  const handleUploadImage = (
    e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<EventTarget>,
  ) => {
    e.preventDefault();
    if (e.target.files) {
      images.push(e.target.files[0]);
    }
    setImages([...images]);
  };

  const handleRemoveImage = (selectedImage: File) => {
    images.splice(images.indexOf(selectedImage), 1);
    setImages([...images]);
  };

  return (
    <>
      <form className="add-post-form" onSubmit={handleCreatePost}>
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
          {images &&
            images.map(image => {
              return (
                <div key={image.name} className="image">
                  <div className="image-name">{image.name}</div>
                  <IconButton
                    className="clear-icon"
                    aria-label="clear"
                    size="small"
                    onClick={() => {
                      handleRemoveImage(image);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              );
            })}
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={handleUploadImage}
            />
            <Fab
              color="primary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <AddIcon />
              Прикрепить картинку
            </Fab>
          </label>
          <div className="add-post">
            <Button variant="contained" type="submit">
              Добавить пост
            </Button>
          </div>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
};
