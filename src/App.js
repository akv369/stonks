import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import loginScreen from './views/login/loginScreen';
import watchList from './views/watchList/watchList';
import dashboard from './views/dashboard/dashboard';
import allStocks from './views/allStocks/allStocks';
import orders from './views/orders/orders';
import stock from './views/stock/stock';
import order from './views/order/order';
import lost from './views/lost/lost';
import home from './views/home/home';
import updation from './views/updation/updation';
import Navbar from './components/header/header';

class App extends Component {
  render() {
    let renderer = this.props.isAuthenticated ? (
      <div>
        <Navbar />
        <Switch>
          <Route path="/orders" exact component={orders} />
          <Route path="/dashboard" exact component={dashboard} />
          <Route path="/stocks" exact component={allStocks} />
          <Route path="/watchlist" exact component={watchList} />
          <Route path="/stock/:stockID" exact component={stock} />
          <Route path="/order/:orderID" exact component={order} />
          <Route path="/update" component={updation} />
          <Route path="/404" component={lost} />
          <Route path="/" exact component={home} />
          <Route path="/" component={lost} />
        </Switch>
      </div>
    ) : (
      <Switch>
        <Route path="/" component={loginScreen} />
      </Switch>
    );

    return <div className="app">{renderer}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.SET_USER.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
