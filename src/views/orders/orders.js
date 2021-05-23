import { React, Component } from 'react';

import OrderFilter from '../../components/orderFilter/orderFilter';
import OrderList from '../../components/cards/orderList/orderList';

import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class orders extends Component {
  render() {
    return (
      <div>
        <Container>
          <h2 className="m-3">Your Orders</h2>
          <Row className="mt-4">
            <Col sm={3}>
              <OrderFilter />
            </Col>
            <Col sm={{ offset: 1 }}>
              <OrderList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default orders;
