import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.user_token = action.payload;
    },
  },
});

export const { setUserToken } = userSlice.actions;

export default userSlice.reducer;
