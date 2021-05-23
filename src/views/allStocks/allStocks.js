import { React, Component } from 'react';

import ListCard from '../../components/cards/stockList/listCard';
import StocksFilter from '../../components/stocksFilter/stocksFilter';
import PageNumbers from '../../components/PageNumbers/PageNumbers';

import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class allStocks extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row className="mt-sm-5">
            <Col sm={3}>
              <StocksFilter />
            </Col>
            <Col sm={9}>
              <ListGroup variant="flush" className="mb-1">
                <ListGroup.Item>
                  <Row>
                    <Col sm={2}>Name</Col>
                    <Col sm={2}>200 Days Moving Avg.</Col>
                    <Col sm={2}>52 Weeks High</Col>
                    <Col sm={2}>52 Weeks Low</Col>
                    <Col sm={2}>Market Capitalization</Col>
                    <Col sm={1}>ROE%</Col>
                    <Col sm={1}>P/E</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListCard />
              <div
                className="position-fixed fixed-bottom"
                style={{ marginLeft: '820px' }}
              >
                <PageNumbers />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default allStocks;
