import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers } from 'redux';

import SET_USER from './store/reducers/index';
import SET_ERR from './store/reducers/index';
import SET_ORDER_FILTERS from './store/reducers/index';
import SET_STOCK_FILTERS from './store/reducers/index';
import SET_PAGE_DETAILS from './store/reducers/index';
import BUY_SELL from './store/reducers/index';

const rootReducer = combineReducers({
  SET_USER: SET_USER,
  SET_ERR: SET_ERR,
  SET_ORDER_FILTERS: SET_ORDER_FILTERS,
  SET_STOCK_FILTERS: SET_STOCK_FILTERS,
  SET_PAGE_DETAILS: SET_PAGE_DETAILS,
  BUY_SELL: BUY_SELL,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
