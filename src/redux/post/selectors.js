import { createSelector } from 'reselect';

const posts = state => state.post.posts;
const currentPost = state => state.post.currentPost;

export const selectPosts = createSelector([posts], posts => posts);

export const selectCurrentPost = createSelector(
  [currentPost],
  currentPost => currentPost,
);
