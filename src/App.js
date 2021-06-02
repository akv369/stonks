import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginScreen from './views/login/loginScreen';
import WatchList from './views/watchList/watchList';
import Dashboard from './views/dashboard/dashboard';
import AllStocks from './views/allStocks/allStocks';
import Orders from './views/orders/orders';
import Stock from './views/stock/stock';
import Order from './views/order/order';
import Lost from './views/lost/lost';
import Home from './views/home/home';
import Updation from './views/updation/updation';
import Navbar from './components/header/header';

import './App.css';

class App extends Component {
  render() {
    let renderer =
      this.props.currentUser !== 'null' || this.props.currentUser !== null ? (
        <div>
          <Navbar />
          <Switch>
            <Route path="/orders" exact component={Orders} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/stocks" exact component={AllStocks} />
            <Route path="/watchlist" exact component={WatchList} />
            <Route path="/stock/:stockID" exact component={Stock} />
            <Route path="/order/:orderID" exact component={Order} />
            <Route path="/update" component={Updation} />
            <Route path="/" exact component={Home} />
            <Route path="/" component={Lost} />
          </Switch>
        </div>
      ) : (
        <Switch>
          <Route path="/" component={LoginScreen} />
        </Switch>
      );

    return <div className="app">{renderer}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.SET_USER.currentUser,
  };
};

export default connect(mapStateToProps)(App);
