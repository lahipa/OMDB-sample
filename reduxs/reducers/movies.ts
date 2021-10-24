import * as actionTypes from "../actions/movies/actionTypes";

const initialState = {
  movies: [],
  movie: {},
};

const moviesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: [...state.movies, ...action.payload.data],
      };
    case actionTypes.GET_MOVIE_SUCCESS:
      return {
        ...state,
        movie: action.payload.data,
      };
    case "CLEAR_MOVIES":
      return {
        ...state,
        movies: [],
        movie: {},
      }
    default:
      return state;
  }
};

export default moviesReducer;
