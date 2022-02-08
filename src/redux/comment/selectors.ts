import { createSelector } from "reselect";

const comments = (state: { comment: { comments: any } }) =>
  state.comment.comments;

export const selectComments = createSelector([comments], comments => comments);
