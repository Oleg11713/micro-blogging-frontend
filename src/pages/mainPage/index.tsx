import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button, IconButton } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import AliceCarousel from "react-alice-carousel";

import { ConfirmationDelete } from "../../components/confirmationDelete";
import { AddPostForm } from "../../components/addPost";
import { userSlice } from "../../redux/userReducer/state";
import { postSlice } from "../../redux/postReducer/state";
import { useAppSelector } from "../../redux/reducer";
import { IPost } from "../../interfaces/IPost";
import { IUser } from "../../interfaces/IUser";
import { ADMIN } from "../../utils/constsRoles";

import "./styles.scss";
import "react-alice-carousel/lib/alice-carousel.css";

function MainPage() {
  const { fetchAllPosts } = postSlice.actions;
  const { fetchAllUsers } = userSlice.actions;
  const { users, currentUser } = useAppSelector(state => state.userReducer);
  const { posts } = useAppSelector(state => state.postReducer);
  const { alert, loading } = useAppSelector(state => state.appReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost>({
    content: "",
    id: 0,
    title: "",
    userId: 0,
    images: "",
  });

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleAddFormHide = () => {
    setShowAddForm(false);
  };

  const handleAddFormShow = () => {
    setShowAddForm(true);
  };

  const handleDeleteFormShow = () => {
    setShowDeleteForm(true);
  };

  const handleDeleteFormHide = () => {
    setShowDeleteForm(false);
  };

  return (
    <>
      {alert && (
        <div
          className="alert alert-primary"
          role="alert"
          style={{ marginBottom: "0" }}
        >
          {alert}
        </div>
      )}
      <div className="main-page">
        {showAddForm && <AddPostForm handleAddFormHide={handleAddFormHide} />}
        {showDeleteForm && (
          <ConfirmationDelete
            handleDeleteFormHide={handleDeleteFormHide}
            postId={selectedPost.id}
          />
        )}
        {currentUser && (
          <Button
            className="add-post-button"
            variant="contained"
            onClick={handleAddFormShow}
          >
            Добавить новый пост
          </Button>
        )}
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : posts.length ? (
          Object.values(posts)
            .sort((a: IPost, b: IPost) => b.id - a.id)
            .map((post: IPost) => {
              const images = post.images.split(",");
              return (
                <div key={post.id} className="post-container">
                  {users &&
                    Object.values(users)
                      .filter((user: IUser) => post.userId === user.id)
                      .map((user: IUser) => {
                        return (
                          <Link
                            key={user.displayName}
                            className="user-display-name"
                            to={`/userProfile/${user.id}`}
                          >
                            {user.displayName}
                          </Link>
                        );
                      })}
                  <div className="post">
                    {(currentUser?.role === ADMIN ||
                      currentUser?.id === post.userId) && (
                      <div className="tools">
                        <IconButton
                          className="delete-icon"
                          aria-label="delete"
                          size="small"
                          onClick={() => {
                            setSelectedPost(post);
                            handleDeleteFormShow();
                          }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </div>
                    )}
                    <div className="info">
                      <div className="title">{post.title}</div>
                      <div className="content">{post.content}</div>
                      {images[0] !== "" &&
                        (images.length > 1 ? (
                          <AliceCarousel>
                            {images.map((image: string) => {
                              const path =
                                process.env.REACT_APP_API_URL + image;
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
                          images.map((image: string) => {
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
                        ))}
                    </div>
                    <IconButton
                      className="comment-icon"
                      onClick={() => {
                        history.push(`/post/${post.id}`);
                      }}
                      aria-label="edit"
                      size="small"
                    >
                      <ChatBubbleOutlineIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </div>
              );
            })
        ) : (
          <div>Нет постов</div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default MainPage;
