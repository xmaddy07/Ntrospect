import { createSlice } from "@reduxjs/toolkit";

  const LikeDislikeSlice = createSlice({
    name: 'likes',
    initialState: {
      Like: false,
      DisLike:false,
    },
    reducers: {
      incrementLikes: state => {
        state.Like = true;
      },
      decrementLikes: state => {
        state.DisLike = true;
      },
    },
  });

  export const { incrementLikes, decrementLikes } = LikeDislikeSlice.actions;
export default LikeDislikeSlice.reducer;