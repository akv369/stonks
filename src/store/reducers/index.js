const initialState = {
  currentUser: {
    _id: '6042f71d5e5b631c10fa3d6e',
    balance: 1377116.81,
    email: 'rockstarboy0103@gmail.com',
    name: 'Akayishh',
    photoURL: 'h',
    provider: 'google.com',
    uid: '113414445289128080000',
    watchlist: ['AMZN', 'TSLA', 'GE', 'FB'],
  },
  currentUsers: null,
  isAuthenticated: true,
  stock: {},
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case 'SET_USER':
      return {
        ...state,
        currentUser: actions.currentUser,
        isAuthenticated: true,
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
