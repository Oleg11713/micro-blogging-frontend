import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { selectCurrentUser } from "../../redux/user/selectors";
import { selectPosts } from "../../redux/post/selectors";
import { setPosts } from "../../redux/post/actions";
import { fetchAllPosts } from "../../http/postAPI";
import { EditPostForm } from "../editPost";
import { ConfirmationDelete } from "../confirmationDelete";

import "./styles.scss";
import { IUser } from "../../interfaces/IUser";
import { IPost } from "../../interfaces/IPost";

interface IPostsProps {
  user: IUser;
}

export const Posts: React.FC<IPostsProps> = ({ user }) => {
  const posts = useSelector(selectPosts);
  const sortedAndFilteredPosts =
    posts &&
    posts
      .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
      .filter((post: IPost) => post.userId === user.id);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost>({
    content: "",
    id: 0,
    title: "",
    userId: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts()
      .then(data => {
        dispatch(setPosts(data));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

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
    <div className="posts-container">
      {showEditForm && (
        <EditPostForm
          handleEditFormHide={handleEditFormHide}
          postId={selectedPost.id}
          initialTitle={selectedPost.title}
          initialContent={selectedPost.content}
        />
      )}
      {showDeleteForm && (
        <ConfirmationDelete
          handleDeleteFormHide={handleDeleteFormHide}
          postId={selectedPost.id}
        />
      )}
      {sortedAndFilteredPosts.length > 0 ? (
        sortedAndFilteredPosts.map((post: IPost) => {
          return (
            <div key={post.id} className="post">
              {currentUser?.id === user?.id && (
                <div className="tools">
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      setSelectedPost(post);
                      handleEditFormShow();
                    }}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
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
              {currentUser?.role === "ADMIN" && currentUser?.id !== user?.id && (
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
                {post.img && (
                  <div className="image">
                    <img
                      src={process.env.REACT_APP_API_URL + post.img}
                      alt="post"
                    />
                  </div>
                )}
              </div>
              <div className="comment-icon">
                <IconButton
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
        <div className="no-posts">Нет постов</div>
      )}
    </div>
  );
};
