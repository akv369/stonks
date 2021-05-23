import { React, Component } from 'react';
import { connect } from 'react-redux';
import Axios from '../../../axios-base';

import * as actionTypes from '../../../store/actions';
import DateList from './dateList';
import DataNull from '../../dataNull/dataNull';
import Spinner from '../../spinner/spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

class orderList extends Component {
  state = {
    filteredOrders: [],
    orderFilters: {
      type: '',
      status: '',
    },
    fetching: true,
    dataNull: false,
  };
  componentDidMount() {
    let sendData = this.props.orderFilters;
    sendData._id = this.props.userID;
    this.setState({ orderFilters: sendData });
    Axios.post('/orders', sendData)
      .then((res) => {
        if (res.data === 'Data Unavailable' || res.data.length === 0) 
          this.setState({ dataNull: true, fetching: false });
        else 
          this.setState({ filteredOrders: res.data, fetching: false });
      })
      .catch((err) => console.log(err));
  }
  componentWillUpdate() {
    if (
      this.props.orderFilters.status !== this.state.orderFilters.status ||
      this.props.orderFilters.type !== this.state.orderFilters.type
    ) {
      const sendData = this.props.orderFilters;
      this.setState({ orderFilters: sendData, fetching: true });
      Axios.post('/orders', sendData)
        .then((res) =>{
          if (res.data === 'Data Unavailable' || res.data.length === 0) 
            this.setState({ dataNull: true, fetching: false });
          else 
            this.setState({ filteredOrders: res.data, fetching: false });
          }
        )
        .catch((err) => console.log(err));
    }
  }
  render() {
    let displayCard = () => {
      let orders = this.state.filteredOrders;
      if (orders.length === 0)
        <div>
          <Spinner />
        </div>;
      else if (orders.length === 1) {
        const order = orders[0];
        let date = String(order['verifiedTimestamp']).slice(0, 10);
        const dated = String(date);
        let dd = dated.slice(8, 10),
          mm = dated.slice(5, 7),
          yyyy = dated.slice(0, 4);
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        const showDate = dd + ' ' + months[mm - 1] + ' ' + yyyy;
        return (
          <div>
            <h5 className="text-secondary my-4">{showDate}</h5>
            <DateList orders={orders} />
          </div>
        );
      } else {
        let dates = [];
        let order = orders[0],
          nextOrder,
          equal,
          s1,
          s2;
        for (let i = 0; i < orders.length - 1; i++) {
          order = orders[i];
          nextOrder = orders[i + 1];
          s1 = String(order['verifiedTimestamp']).slice(0, 10);
          s2 = nextOrder['verifiedTimestamp'].slice(0, 10);
          equal = s1.toString().localeCompare(s2.toString());
          if (equal !== 0) dates.push(s1);
        }
        dates.push(s2);
        return dates.map((date) => {
          let datewiseOrders = [];
          for (let i = 0; i < orders.length; i++) {
            order = orders[i];
            s1 = String(order['verifiedTimestamp']).slice(0, 10);
            equal = s1.toString().localeCompare(date);
            if (equal === 0) datewiseOrders.push(order);
          }
          const dated = String(date);
          let dd = dated.slice(8, 10),
            mm = dated.slice(5, 7),
            yyyy = dated.slice(0, 4);
          const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];
          const showDate = dd + ' ' + months[mm - 1] + ' ' + yyyy;
          return (
            <div>
              <h5 className="text-secondary my-4">{showDate}</h5>
              <DateList orders={datewiseOrders} />
            </div>
          );
        });
      }
    };
    return (
      <div>
        {this.state.fetching ? (
          <Spinner />
        ) : this.state.dataNull ? (
          <DataNull reason="No Orders to show!" tip=":(" />
        ) : (
          displayCard()
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.SET_USER.currentUser._id,
    orderFilters: state.SET_ORDER_FILTERS.orderFilters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPagination: (pageDetails) =>
      dispatch({
        type: actionTypes.SET_PAGE_DETAILS,
        pageDetails: pageDetails,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderList);
