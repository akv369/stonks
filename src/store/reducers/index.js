import { Cookies } from 'react-cookie';
const cookies = new Cookies();
const initialState = {
  currentUser: cookies.get('currentUser') || null,
  stock: {},
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case 'SET_USER':
      return {
        ...state,
        currentUser: actions.currentUser,
      };
    case 'BUY_SELL':
      return {
        ...state,
        stock: actions.stock,
      };
    default:
      return state;
  }
};

export default reducer;
