import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allChalenges: [],
};

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    putAllChallenges: (state, { payload }) => {
      state.allChalenges = payload.reverse();
    },
  },
});

export const { putAllChallenges } = challengeSlice.actions;
export default challengeSlice.reducer;
