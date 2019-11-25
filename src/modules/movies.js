import { fetchData } from "../services";
import { dataToEntities } from "../utils";

export const LOAD_MOVIES = {
  TRIGGER: "LOAD_MOVIES.TRIGGER",
  SUCCESS: "LOAD_MOVIES.SUCCESS",
  ERROR: "LOAD_MOVIES.ERROR"
};
export const ADD_NEW_MOVIE = "ADD_NEW_MOVIE";
export const EDIT_MOVIE = "EDIT_MOVIE";

export function loadMovies() {
  return function(dispatch) {
    dispatch({ type: LOAD_MOVIES.TRIGGER });
    return fetchData().then(
      data => {
        dispatch({ type: LOAD_MOVIES.SUCCESS, payload: { data } });
      },
      error => {
        dispatch({ type: LOAD_MOVIES.ERROR, payload: { error } });
      }
    );
  };
}

export function addNewMovie(newMovieInfo) {
  return { type: ADD_NEW_MOVIE, payload: { newMovieInfo } };
}

export function editMovie(movieInfo, id) {
  return { type: EDIT_MOVIE, payload: { movieInfo, id } };
}

const initialState = {
  loading: false,
  data: {},
  error: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_MOVIES.TRIGGER:
      return { ...state, loading: true, error: "" };
    case LOAD_MOVIES.SUCCESS:
      return {
        ...state,
        data: dataToEntities(payload.data.movies, "id"),
        loading: false
      };
    case LOAD_MOVIES.ERROR:
      return { ...state, error: payload.error, loading: false };
    case ADD_NEW_MOVIE:
      const { newMovieInfo } = payload;
      const newId =
        Object.keys(state.data).reduce(
          (acc, id) => (Number(id) > acc ? Number(id) : acc),
          0
        ) + 1;
      return {
        ...state,
        data: { [newId]: { id: newId, ...newMovieInfo }, ...state.data }
      };
    case EDIT_MOVIE:
      const { movieInfo, id } = payload;
      return {
        ...state,
        data: { ...state.data, [id]: { id, ...movieInfo } }
      };
    case LOAD_MOVIES.ERROR:
      return { ...state, error: payload.error, loading: false };
    default:
      return state;
  }
};
