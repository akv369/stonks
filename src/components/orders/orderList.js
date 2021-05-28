import { React, Component } from 'react';

import DateList from './dateList';
import Spinner from '../../components/spinner/spinner';

import 'bootstrap/dist/css/bootstrap.min.css';

class orderList extends Component {
  render() {
    let displayCard = () => {
      let orders = this.props.filteredOrders;
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
    return displayCard();
  }
}

export default orderList;
