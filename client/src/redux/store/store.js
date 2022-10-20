import { configureStore } from "@reduxjs/toolkit";
import photos from "../slices/photosSlice";
import cart from "../slices/cartSlice";
import user from "../slices/cartSlice";
import userLoged from "../slices/usersLogedSlice";
import profile from "../slices/profileSlice";
import challenge from "../slices/challengeSlice";

export default configureStore({
  reducer: {
    photos,
    cart,
    user,
    userLoged,
    profile,
    challenge,
  },
});
