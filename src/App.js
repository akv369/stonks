import {React, Component} from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';
import loginScreen from './views/login/loginScreen';
import watchList from './views/watchList/watchList';
import dashboard from './views/dashboard/dashboard';
import allStocks from './views/allStocks/allStocks';
import orders from './views/orders/orders';
import stock from './views/stock/stock';
import order from './views/order/order';
import home from './views/home/home';
import { connect } from 'react-redux';
//const axios = require('axios');

class App extends Component{
  componentDidMount() {/*
    axios.get('http://localhost:1111/l')
    //axios.get('https://api.twelvedata.com/time_series?symbol=AAPL&interval=5min&apikey=d609067766fb4ac9bcd8a24d328d7a13')
     .then(response => {
       console.log(response.data);
    })*/
  }
  render(){
    let option = this.props.currentUser!==null ?
    <Switch>
      <Route path="/orders" component={orders} />
      <Route path="/dashboard" component={dashboard} />
      <Route path="/stocks" component={allStocks} />
      <Route path="/watchlist" component={watchList} />
      <Route path="/stock/:stockName" component={stock} />
      <Route path="/order/:orderID" component={order} />
      <Route path="/login" component={loginScreen} />
      <Route path="/" component={home} />
    </Switch>
    :
    <Switch>
      <Route path="/" component={loginScreen} />
    </Switch>;
    return (
      <div>{option}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
      currentUser: state.SET_USER.currentUser
  }
};

const mapDispatchToProps = dispatch => {
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
