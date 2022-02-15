import { createSelector } from "reselect";

const comments = (state: { comment: { comments: [] } }) =>
  state.comment.comments;

export const selectComments = createSelector([comments], comments => comments);
