// src/actions/actions.js
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
//set userdata is for getting logged in user info
export const SET_USERDATA = 'SET_USERDATA';
//set favs is for getting user favorite movies
export const SET_FAVS = 'SET_FAVS';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function getUserData(value){
    return{type: SET_USERDATA, value}
}

export function getFavs(value){
  return{type: SET_FAVS, value}
}