export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";

//set userdata is for editing user info
export const SET_USERDATA = "SET_USERDATA";
export const SET_USERNAME = "SET_USERNAME";
export const DELETE_PROFILE = "DELETE_PROFILE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const DELETE_FAV = "DELETE_FAV";

export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAIL = "UPDATE_FAIL"

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function updateUser(value) {
  return { type: EDIT_PROFILE, value };
}

export function setUserData(value) {
  return { type: SET_USERDATA, value };
}

export function setUserName(value) {
  return { type: SET_USERNAME, value };
}

export function deleteFav(id) {
  return { type: DELETE_FAV, id };
}


