const initialState = {
  currentUsers: {
    _id: '6042f71d5e5b631c10fa3d6e',
    balance: 1377116.81,
    email: 'rockstarboy0103@gmail.com',
    name: 'Akayishh',
    photoURL: 'h',
    provider: 'google.com',
    uid: 113414445289128080000,
    watchlist: ['AMZN', 'TSLA', 'GE', 'FB'],
  },
  currentUser: null,
  isAuthenticated: false,
  err: null,
  stockFilters: {
    cmpUl: 10000,
    cmpLl: 0,
    sectors: { All: true },
    mcUl: 10000,
    mcLl: 0,
  },
  pageDetails: {
    currentPage: 1,
    stocksPerPage: 8,
    lastPage: 1,
  },
  orderFilters: {
    type: 'All',
    status: 'All',
  },
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
    case 'SET_ERROR':
      return {
        ...state,
        err: actions.msg,
      };
    case 'BUY_SELL':
      return {
        ...state,
        stock: actions.stock,
      };
    case 'SET_STOCK_FILTERS':
      return {
        ...state,
        stockFilters: actions.stockFilters,
      };
    case 'SET_ORDER_FILTERS':
      return {
        ...state,
        orderFilters: actions.orderFilters,
      };
    case 'SET_PAGE_DETAILS':
      return {
        ...state,
        pageDetails: actions.pageDetails,
      };
    default:
      return state;
  }
};

export default reducer;
