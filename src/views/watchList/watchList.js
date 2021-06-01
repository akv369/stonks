import { React, Component } from 'react';

import ListCard from '../../components/cards/watchlist/listCard';
import BuySellPanel from '../../components/buySellPanel/buySellPanel';

import { Card, Container, ListGroup, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class watchList extends Component {
  render() {
    return (
      <Container>
        <Row className="mt-sm-5">
          <Col sm={8}>
            <Card className="shadow-sm">
              <Container>
                <h2 className="m-3">Your Watchlist</h2>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col sm={3}>Company Name</Col>
                        <Col sm={3}>Recommendation</Col>
                        <Col sm={2}>200DMA</Col>
                        <Col sm={2}>CMP</Col>
                        <Col sm={2}>P/E Ratio</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
                <ListCard />
              </Container>
              <Card.Body> </Card.Body>
            </Card>
          </Col>
          <Col sm={3}>
            <BuySellPanel />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default watchList;
