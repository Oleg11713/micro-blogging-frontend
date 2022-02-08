import { createSelector } from "reselect";

const posts = (state: { post: { posts: any } }) => state.post.posts;
const currentPost = (state: { post: { currentPost: any } }) =>
  state.post.currentPost;

export const selectPosts = createSelector([posts], posts => posts);

export const selectCurrentPost = createSelector(
  [currentPost],
  currentPost => currentPost,
);
