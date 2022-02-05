import { createSelector } from 'reselect';

const comments = state => state.comment.comments;

export const selectComments = createSelector([comments], comments => comments);
