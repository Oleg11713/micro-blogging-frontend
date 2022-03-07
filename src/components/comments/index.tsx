import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { selectCurrentUser } from "../../redux/user/selectors";
import { selectComments } from "../../redux/comment/selectors";
import { setComments } from "../../redux/comment/actions";
import { fetchAllComments } from "../../http/commentAPI";
import { EditCommentForm } from "../editComment";
import { ConfirmationDelete } from "../confirmationDelete";
import { IUser } from "../../interfaces/IUser";
import { IPost } from "../../interfaces/IPost";
import { IComment } from "../../interfaces/IComment";
import { ADMIN } from "../../utils/constsRoles";

import "./styles.scss";

interface ICommentsProps {
  post?: IPost;
  user?: IUser;
}

export const Comments: React.FC<ICommentsProps> = ({ post, user }) => {
  const comments = useSelector(selectComments);
  const sortedAndFilteredComments =
    comments &&
    comments
      .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
      .filter((comment: { publicationId: number; userId: number }) => {
        return post
          ? comment.publicationId === post.id
          : user && comment.userId === user.id;
      });
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<IComment>({
    content: "",
    id: 0,
    publicationId: 0,
    userId: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllComments()
      .then(data => {
        dispatch(setComments(data));
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
    <div className="comments-container">
      {showEditForm && (
        <EditCommentForm
          handleEditFormHide={handleEditFormHide}
          commentId={selectedComment.id}
          initialContent={selectedComment.content}
        />
      )}
      {showDeleteForm && (
        <ConfirmationDelete
          handleDeleteFormHide={handleDeleteFormHide}
          commentId={selectedComment.id}
        />
      )}
      {sortedAndFilteredComments.length > 0 ? (
        sortedAndFilteredComments.map((comment: IComment) => {
          return (
            <div key={comment.id} className="comment">
              {currentUser?.id === comment?.userId && (
                <div className="tools">
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      setSelectedComment(comment);
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
                      setSelectedComment(comment);
                      handleDeleteFormShow();
                    }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
              )}
              {currentUser?.role === ADMIN &&
                currentUser?.id !== comment.userId && (
                  <div className="tools">
                    <IconButton
                      className="delete-icon"
                      aria-label="delete"
                      size="small"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                )}
              <div className="info">
                <div className="content">{comment.content}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-comments">Нет комментариев</div>
      )}
    </div>
  );
};
