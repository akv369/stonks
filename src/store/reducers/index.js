import { combineReducers } from "redux";

const initialState = {
  currentUser: 0,
  err: null,
  loading: true
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case 'SET_USER':
      return {
        ...state,
        currentUser: actions.currentUser,
        err: null,
        loading: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        err: actions.msg,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;