import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Fab, IconButton } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

import { selectCurrentUser } from "../../redux/user/selectors";
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
  const [images, setImages] = useState<any[]>([]);
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
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      images.map(image => formData.append("images", image));
      formData.append("userId", currentUser.id);
      await createPost(formData);
    } finally {
      handleAddFormHide();
      history.go(0);
    }
  };

  const handleUploadImage = (e: any) => {
    e.preventDefault();
    images.push(e.target.files[0]);
    setImages([...images]);
    console.log(images);
  };

  const handleRemoveImage = (selectedImage: Object) => {
    images.splice(images.indexOf(selectedImage), 1);
    setImages([...images]);
  };

  return (
    <>
      <form className="add-post-form" onSubmit={handleCreatePost}>
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
            <AddIcon /> Прикрепить картинку
          </Fab>
        </label>
        <div className="add-post">
          <Button variant="contained" type="submit">
            Добавить пост
          </Button>
        </div>
      </form>
      <div className="overlay" />
    </>
  );
};
