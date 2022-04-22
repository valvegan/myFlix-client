export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
//set userdata is for getting user info
export const SET_USERDATA = 'SET_USERDATA';
//set users is for getting all users 
//set d

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function getUserData(value){
    return{type: SET_USERDATA, value}
}