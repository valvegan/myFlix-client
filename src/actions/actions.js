export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
//get userdata is for getting user info
export const SET_USERDATA = 'SET_USERDATA';


export function setMovies(value) {
  return { type: SET_MOVIES, value };
}
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUserData(value){
    return{type: SET_USERDATA, value}
}


