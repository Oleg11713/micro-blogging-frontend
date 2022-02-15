import { createSelector } from "reselect";
import { IPost } from "../../interfaces/IPost";

const posts = (state: { post: { posts: [] } }) => state.post.posts;
const currentPost = (state: { post: { currentPost: IPost } }) =>
  state.post.currentPost;

export const selectPosts = createSelector([posts], posts => posts);

export const selectCurrentPost = createSelector(
  [currentPost],
  currentPost => currentPost,
);
