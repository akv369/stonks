import { React, Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

class orderStatus extends Component {
  render() {
    const order = this.props.order;
    const statusColor =
      order['status'] === 'Successful'
        ? 'success'
        : order['status'] === 'Unsuccessful'
        ? 'danger'
        : 'warning';
    const showTime = (dated) => {
      if (dated !== undefined) {
        let MM = dated.slice(5, 7);
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
        const time = dated.slice(11, 19);
        const year = dated.slice(0, 4);
        const month = months[MM - 1];
        const date = dated.slice(8, 10);
        const timeZ = dated.slice(-3) === '000' ? 'GMT' : 'IST';
        return `${date} ${month} ${year} | ${time} ${timeZ}`;
      }
    };
    function onPlace() {
      if (order['progress'] !== 'Verified') {
        return (
          <div>
            <div className="m-1">
              <span className={'text-success'}>⬤ </span>
              <span className="m-1">
                {' '}
                Order Placed with {order['exchange']}
              </span>
            </div>
            <div className="ml-4 text-muted" style={{ fontSize: '0.8rem' }}>
              <span className="m-1">{showTime(order['placedTimestamp'])}</span>
              <span className="m-1 float-right">Order ID: {order._id}</span>
            </div>
          </div>
        );
      }
    }
    function onExec() {
      if (order['progress'] === 'Executed') {
        return (
          <div>
            <div className="m-1">
              <span className={'text-' + statusColor}>⬤ </span>
              <span className="m-1"> Order {order['progress']}</span>
            </div>
            <div className="ml-4 text-muted" style={{ fontSize: '0.8rem' }}>
              <span className="m-1">
                {showTime(order['executedTimestamp'])}
              </span>
              <span className="m-1 float-right">
                Total Amount: ${order['totalAmount']}
              </span>
            </div>
          </div>
        );
      }
    }
    return (
      <div style={{ width: '36rem' }}>
        <span
          className="font-weight-bold text-muted"
          style={{ fontSize: '1.2rem' }}
        >
          Order Status
        </span>
        <span className={'float-right text-' + statusColor}>
          {order['status']} ⬤
        </span>
        <div className="ml-4">
          <div className="mt-2">
            <div className="m-1">
              <span className="text-success">⬤ </span>
              <span className="m-1"> User Request Verified</span>
            </div>
            <div className="ml-4 text-muted" style={{ fontSize: '0.8rem' }}>
              <span className="m-1">
                {showTime(order['verifiedTimestamp'])}
              </span>
              <span className="m-1 float-right">
                User ID: {order['userID']}
              </span>
            </div>
            {onPlace()}
            {onExec()}
          </div>
        </div>
      </div>
    );
  }
}

export default orderStatus;
