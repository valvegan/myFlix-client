// src/actions/actions.js
export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
//set userdata is for getting logged in user info
export const GET_USERDATA = "GET_USERDATA";

//set favs is for getting user favorite movies
export const GET_FAVS = "SET_FAVS";
//add favs is to add a favorite movie
export const ADD_FAVS = "ADD_FAVS";
//vice versa for remove favs
export const REMOVE_FAVS = "REMOVE_FAVS";

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function getUserData(value) {
  return { type: SET_USERDATA, value };
}



