import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AliceCarousel from "react-alice-carousel";

import { selectCurrentUser } from "../../redux/user/selectors";
import { selectCurrentPost } from "../../redux/post/selectors";
import { setCurrentPost } from "../../redux/post/actions";
import { fetchOnePost } from "../../http/postAPI";
import { AddCommentForm } from "../../components/addComment";
import { EditPostForm } from "../../components/editPost";
import { ConfirmationDelete } from "../../components/confirmationDelete";
import { Comments } from "../../components/comments";

import "./styles.scss";
import "react-alice-carousel/lib/alice-carousel.css";

function PostPage() {
  const currentPost = useSelector(selectCurrentPost);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string | undefined }>();
  const [showAddComment, setShowAddComment] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOnePost(id)
      .then(data => {
        dispatch(setCurrentPost(data));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  const handleAddCommentHide = () => {
    setShowAddComment(false);
  };

  const handleAddCommentShow = () => {
    setShowAddComment(true);
  };

  const handleEditFormShow = () => {
    setShowEditForm(true);
  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  const handleDeleteFormShow = () => {
    setShowDeleteForm(true);
  };

  const handleDeleteFormHide = () => {
    setShowDeleteForm(false);
  };

  return (
    <div className="post-page">
      {showEditForm && (
        <EditPostForm
          handleEditFormHide={handleEditFormHide}
          postId={currentPost.id}
          initialTitle={currentPost.title}
          initialContent={currentPost.content}
          initialImages={currentPost.images}
        />
      )}
      {showDeleteForm && (
        <ConfirmationDelete
          handleDeleteFormHide={handleDeleteFormHide}
          postId={currentPost.id}
          postPage
        />
      )}
      <div key={currentPost.id} className="post">
        {currentUser?.id === currentPost?.userId && (
          <div className="tools">
            <IconButton
              aria-label="edit"
              size="small"
              onClick={handleEditFormShow}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              className="delete-icon"
              aria-label="delete"
              size="small"
              onClick={handleDeleteFormShow}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        )}
        {currentUser?.role === "ADMIN" &&
          currentUser?.id !== currentPost?.userId && (
            <div className="tools">
              <IconButton
                className="delete-icon"
                aria-label="delete"
                size="small"
                onClick={handleDeleteFormShow}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>
          )}
        <div className="info">
          <div className="title">{currentPost.title}</div>
          <div className="content">{currentPost.content}</div>
          {Object.values(currentPost.images).length > 1 ? (
            <AliceCarousel>
              {Object.values(currentPost.images).map((image: any) => {
                const path = process.env.REACT_APP_API_URL + image;
                return (
                  <img
                    key={image}
                    className="sliderimg"
                    style={{ width: "100%" }}
                    src={path}
                    alt="post"
                  />
                );
              })}
            </AliceCarousel>
          ) : (
            Object.values(currentPost.images).map((image: any) => {
              const path = process.env.REACT_APP_API_URL + image;
              return (
                <img
                  key={image}
                  className="sliderimg"
                  style={{ width: "100%" }}
                  src={path}
                  alt="post"
                />
              );
            })
          )}
        </div>
      </div>
      <div className="comments">
        {showAddComment && (
          <AddCommentForm
            handleAddFormHide={handleAddCommentHide}
            postId={currentPost.id}
          />
        )}
        <span className="heading">Комментарии</span>
        <Comments post={currentPost} />
        {currentUser && (
          <Button
            className="add-comment-button"
            variant="contained"
            onClick={handleAddCommentShow}
          >
            Написать комментарий
          </Button>
        )}
      </div>
    </div>
  );
}

export default PostPage;
