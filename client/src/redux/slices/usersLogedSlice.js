import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    followed: [],
    favorites: [],
    followers: [],
    liked: [],
    bought: [],
  },
  loged: false,
};

const userLoged = createSlice({
  name: "userLoged",
  initialState,
  reducers: {
    getUserLoged: (state, { payload }) => {
      state.currentUser = payload.message === "No token provided" ? initialState.currentUser : payload.userLoged;
      state.loged = payload.message === "No token provided" ? false : true;
    },
    logOut: (state, { payload }) => {
      state.loged = false;
      state.currentUser = initialState.currentUser;
    },
  },
});

export const { getUserLoged, logOut } = userLoged.actions;
export default userLoged.reducer;
