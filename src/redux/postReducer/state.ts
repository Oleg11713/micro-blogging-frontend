import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPost } from "../../interfaces/IPost";

interface PostState {
  posts: IPost[];
  currentPost: IPost;
}

const initialState: PostState = {
  posts: [],
  currentPost: { id: 0, title: "", content: "", images: "", userId: 0 },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<IPost[]>) {
      state.posts = action.payload;
    },
    setCurrentPost(state, action: PayloadAction<IPost>) {
      state.currentPost = action.payload;
    },
    fetchAllPosts() {},
  },
});

export default postSlice.reducer;
