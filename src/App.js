import {React, Component} from 'react';
import {Route, Switch} from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import Axios from './axios-base';
import * as actionTypes from './store/actions';

import loginScreen from './views/login/loginScreen';
import watchList from './views/watchList/watchList';
import dashboard from './views/dashboard/dashboard';
import allStocks from './views/allStocks/allStocks';
import orders from './views/orders/orders';
import stock from './views/stock/stock';
import order from './views/order/order';
import home from './views/home/home';

class App extends Component{
  state={
    loading:true,
    user:null
  }
  componentDidMount(){
    Axios.get('/getUser')
    .then(response=>{
      this.props.setUser(response.data);
      this.setState({user:response.data,loading:false});
    })
  }
  render(){
    let option = this.state.user!==null ?
    <Switch>
      <Route path="/orders" component={orders} />
      <Route path="/dashboard" component={dashboard} />
      <Route path="/stocks" component={allStocks} />
      <Route path="/watchlist" component={watchList} />
      <Route path="/stock/:stockID" component={stock} />
      <Route path="/order/:orderID" component={order} />
      <Route path="/" component={home} />
    </Switch>
    :
    this.state.loading===true ?
    <Switch>
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
  return {
    setUser: (user) => dispatch({type: actionTypes.SET_USER, currentUser: user})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
