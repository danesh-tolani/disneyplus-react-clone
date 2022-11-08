import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setmovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setmovies } = movieSlice.actions;

export const selectMovies = (state) => state.movie.movies;

export default movieSlice.reducer;
