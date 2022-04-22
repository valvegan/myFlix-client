import { combineReducers } from "redux";
import { SET_FILTER, SET_MOVIES, SET_USERDATA, SET_FAVS } from "../actions/actions";

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
function userData(state=[], action){
  switch (action.type){
      case SET_USERDATA: 
      return action.value;
      default: 
      return state;
  }
}

//favorite movies
function favs(state=[], action){
  switch (action.type){
      case SET_FAVS: 
      return action.value;
      default: 
      return state;
  }
}


const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    userData,
    favs,
  });
  
export default moviesApp;

