export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
//set userdata is for getting user info
export const GET_USERDATA = 'GET_USERDATA';



export function setMovies(value) {
  return { type: SET_MOVIES, value };
}
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function getUserData(value){
    return{type: GET_USERDATA, value}
}


