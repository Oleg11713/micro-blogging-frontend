import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Fab, IconButton } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

import { updatePost } from "../../http/postAPI";

import "./styles.scss";

interface IEditPostForm {
  initialTitle: string;
  initialContent: string;
  initialImages: string;
  postId: number;
  handleEditFormHide(): void;
}

export const EditPostForm: React.FC<IEditPostForm> = ({
  handleEditFormHide,
  initialTitle,
  initialContent,
  initialImages,
  postId,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [uploadedImages, setUploadedImages] = useState(
    initialImages.split(","),
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const history = useHistory();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleUpdatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("id", postId.toString());
      formData.append("title", title);
      formData.append("content", content);
      uploadedImages.map(image => formData.append("images", image));
      newImages.map(image => formData.append("newImages", image));
      await updatePost(formData);
    } finally {
      handleEditFormHide();
      history.go(0);
    }
  };

  const handleUploadFile = async (
    e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<EventTarget>,
  ) => {
    e.preventDefault();
    if (e.target.files) {
      newImages.push(e.target.files[0]);
    }
    setNewImages([...newImages]);
  };

  const handleRemoveUploadedImage = (selectedImage: string) => {
    uploadedImages.splice(uploadedImages.indexOf(selectedImage), 1);
    setUploadedImages([...uploadedImages]);
  };

  const handleRemoveNewImage = (selectedImage: File) => {
    newImages.splice(newImages.indexOf(selectedImage), 1);
    setNewImages([...newImages]);
  };

  return (
    <>
      <form className="update-post-form" onSubmit={handleUpdatePost}>
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
          <div>{uploadedImages.length !== 0 && "Загруженные картинки"}</div>
          {uploadedImages.length !== 0 ? (
            uploadedImages.map(image => {
              return (
                <div key={image} className="image">
                  <div className="image-name">{image}</div>
                  <IconButton
                    className="clear-icon"
                    aria-label="clear"
                    size="small"
                    onClick={() => {
                      handleRemoveUploadedImage(image);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              );
            })
          ) : (
            <div>Нет исходных картинок</div>
          )}
          <div>{newImages.length !== 0 && "Новые картинки"}</div>
          {newImages.length !== 0 &&
            newImages.map(image => {
              return (
                <div key={image.name} className="image">
                  <div className="image-name">{image.name}</div>
                  <IconButton
                    className="clear-icon"
                    aria-label="clear"
                    size="small"
                    onClick={() => {
                      handleRemoveNewImage(image);
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
        </div>
      </form>
      <div className="overlay" />
    </>
  );
};
