import { combineReducers } from "redux";
import { SET_FILTER, SET_MOVIES, GET_USERDATA, SET_USERDATA } from "../actions/actions";

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
        case GET_USERDATA: 
        return action.value;
        default: 
        return state;
    }
}

//set user data(update)
function userChange(state=[], action){
  switch (action.type){
      case SET_USERDATA: 
      return action.value;
      default: 
      return state;
  }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    userData,
    userChange,

  });
  
export default moviesApp;