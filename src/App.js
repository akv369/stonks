import {React, Component} from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';
import loginScreen from './views/login/loginScreen';
import watchList from './views/watchList/watchList';
import allStocks from './views/allStocks/allStocks';
import dashboard from './views/dashboard/dashboard';
import orders from './views/orders/orders';
import home from './views/home/home';
//const axios = require('axios');

class App extends Component{/*
  componentDidMount() {
    axios.get('http://localhost:1111/l')
    //axios.get('https://api.twelvedata.com/time_series?symbol=AAPL&interval=5min&apikey=d609067766fb4ac9bcd8a24d328d7a13')
     .then(response => {
       console.log(response.data);
    })
  }*/
  render(){
    return (
      <Switch>
        <Route path="/orders" component={orders} />
        <Route path="/dashboard" component={dashboard} />
        <Route path="/stocks" component={allStocks} />
        <Route path="/watchlist" component={watchList} />
        <Route path="/login" component={loginScreen} />
        <Route path="/" component={home} />
      </Switch>
    );
  }
}

export default App;
