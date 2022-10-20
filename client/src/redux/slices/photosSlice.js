import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPhotosData: [],
  filterPhotosData: [],
  photoDetails: { photographer: {} },
};

//Este es el slice que uso para tener los datos de todas las fotos que se cargan en el home.

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    insertDataAllPhotos: (state, { payload }) => {
      state.allPhotosData = payload.reverse();
      state.filterPhotosData = payload;
    },
    setFilter: (state, { payload }) => {
      var newArray = [...state.allPhotosData];
      if (payload.priceRange.pay !== null) newArray = newArray.filter((x) => x.pay === payload.priceRange.pay);

      if (payload.priceRange.min !== null) newArray = newArray.filter((x) => x.price > payload.priceRange.min && x.pay);

      if (payload.priceRange.max !== null) newArray = newArray.filter((x) => x.price < payload.priceRange.max || !x.pay);

      if (payload.title) newArray = newArray.filter((x) => x.title.toLowerCase().includes(payload.title.toLowerCase()) || x.tags.toLowerCase().includes(payload.title.toLowerCase()));

      if (payload.cal) newArray = newArray.sort((a, b) => b.likes.length - a.likes.length);

      if (payload.reto) newArray = newArray.filter((x) => x.challenge?.length > 0);

      state.filterPhotosData = [...newArray];
    },
    cleanPhotos: (state) => {
      state.photoDetails = initialState.photoDetails;
    },
    insertDetails: (state, { payload }) => {
      state.photoDetails = payload;
    },
  },
});

export const { insertDataAllPhotos, cleanPhotos, setFilter, insertDetails } = photosSlice.actions;
export default photosSlice.reducer;
