import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../interfaces/IComment";

interface CommentState {
  comments: IComment[];
}

const initialState: CommentState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<IComment[]>) {
      state.comments = action.payload;
    },
    fetchAllComments() {},
  },
});

export default commentSlice.reducer;
