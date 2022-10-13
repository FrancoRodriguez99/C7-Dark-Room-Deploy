import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    favorites: [],
    followed: [],
    follwers: [],
    publications: [],
  },
};

const profileSLice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fillProfileData: (state, { payload }) => {
      state.userData = payload;
    },
    cleanProfileDetails: (state) => {
      state = initialState;
    },
  },
});

export const { fillProfileData, cleanProfileDetails } = profileSLice.actions;
export default profileSLice.reducer;
