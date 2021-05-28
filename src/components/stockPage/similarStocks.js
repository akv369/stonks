import { React, Component } from 'react';
import Axios from '../../axios-base';

import StockList from '../cards/stockList/listCard';
import DataNull from '../dataNull/dataNull';

import { Card, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class similarStocks extends Component {
  state = {
    filteredStocks: [],
    dataNull: false,
  };
  componentDidMount() {
    let companyCode = this.props.companyCode;
    if (companyCode === undefined)
      companyCode = window.location.pathname.split('/')[2].toUpperCase();
    Axios.get(`/similarstock/${companyCode}`)
      .then((res) => {
        if (res.data === 'Data Unavailable') this.setState({ dataNull: true });
        else this.setState({ filteredStocks: res.data });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return this.state.dataNull ? (
      <h3 className="pl-3 pt-2 text-centre">No matching peers found</h3>
    ) : (
      <Card className="shadow-sm mt-5 mb-3">
        <h3 className="pl-3 pt-2">Similar Stocks</h3>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col sm={2}>Name</Col>
              <Col sm={2}>Price</Col>
              <Col sm={2}>52W High</Col>
              <Col sm={2}>52W Low</Col>
              <Col sm={2}>Market Cap</Col>
              <Col sm={1}>ROE%</Col>
              <Col sm={1}>P/E</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        <StockList filteredStocks={this.state.filteredStocks} />
      </Card>
    );
  }
}

export default similarStocks;
