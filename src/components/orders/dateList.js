import { React, Component } from 'react';

import { Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class orderList extends Component {
  render() {
    let displayCard = () => {
      let orders = this.props.orders;
      return orders.map((order, index) => {
        const dotColor =
          order.status === 'In Progress'
            ? 'warning'
            : order.status === 'Successful'
            ? 'success'
            : 'danger';
        const refLink = '/order/' + order._id;
        let time = order.verifiedTimestamp;
        const timeZ = time.slice(-3) === '530' ? 'IST' : 'GMT';
        time = `${time.slice(11, 16)} ${timeZ}`;
        return (
          <div key={index}>
            <Link to={refLink}>
              <Button
                variant="white"
                style={{
                  width: '100%',
                  padding: '0px',
                  border: 'none',
                  textAlign: 'left',
                }}
              >
                <Row>
                  <Col sm={4}>
                    {order['name']}
                    <br />
                    <div
                      className="text-secondary"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {order['subType']}
                    </div>
                  </Col>
                  <Col sm={3}>
                    {order['quantity']} Shares <br />
                    <div
                      className="text-secondary"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {order['type']}
                    </div>
                  </Col>
                  <Col sm={3}>
                    ${order['orderPrice']}
                    <div
                      className="text-secondary"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {order['order']} Price
                    </div>
                  </Col>
                  <Col sm={2}>
                    {time}
                    <span className={'float-right text-' + dotColor}>⬤</span>
                  </Col>
                </Row>
              </Button>
            </Link>
            <hr style={{ color: 'grey' }} />
          </div>
        );
      });
    };
    return <div>{displayCard()}</div>;
  }
}

export default orderList;
