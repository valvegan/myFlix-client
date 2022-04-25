import { combineReducers } from "redux";
import {
  SET_FILTER,
  SET_MOVIES,
  SET_USERDATA,
  DELETE_FAV,
  SET_USERNAME,
  DELETE_PROFILE,
  EDIT_PROFILE,
} from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

//data of the logged in user
function userData(state = [], action) {
  switch (action.type) {
    case SET_USERDATA:
      return action.value;
    default:
      return state;
  }
}

//username
function userName(state = "", action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.value;
    default:
      return state;
  }
}

function deleteProfile(state = userData, action) {
  switch (action.type) {
    case DELETE_PROFILE:
      return action.value;
    default:
      return state;
  }
}
/*
const updateProfile = (state = userData, action) => {
  switch (action.type) {
    case DELETE_FAV:
      let updatedMovies = state.favoriteMovies.filter((movie) => {
        return action.id !== movie.id;
      });
      return [...state, (userData = updatedMovies)];
    default:
      return state;
  }
};
*/

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userData,
  userName,
  deleteProfile, 
 // updateProfile,
//deleteFav,
});

export default moviesApp;
