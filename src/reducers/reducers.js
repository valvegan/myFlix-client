import { combineReducers } from "redux";
import {
  SET_FILTER,
  SET_MOVIES,
  GET_USERDATA,
  SET_USERDATA,
  GET_FAVS,
  ADD_FAVS,
  REMOVE_FAVS,
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
    case GET_USERDATA:
      return action.value;
    default:
      return state;
  }
}

function changeUserData(state = [], action) {
  switch (action.type) {
    case SET_USERDATA:
      return action.value;
    default:
      return state;
  }
}

//favorite movies
function favs(state = [], action) {
  switch (action.type) {
    case GET_FAVS:
      return action.value;
    default:
      return state;
  }
}

function addFavs(state = [], action) {
  switch (action.type) {
    case ADD_FAVS:
      return action.value;
    default:
      return state;
  }
}
function removeFavs(state = [], action) {
  switch (action.type) {
    case REMOVE_FAVS:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userData,
  changeUserData,
  favs,
  addFavs,
  removeFavs,
});

export default moviesApp;
