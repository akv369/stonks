import { React, Component } from 'react';
import Axios from '../../../axios-base';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions';

import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Spinner from '../../spinner/spinner';
import DataNull from '../../dataNull/dataNull';

class listCard extends Component {
  state = {
    filteredStocks: [],
    fetching: true,
    dataNull: false,
  };
  componentDidMount() {
    Axios.post('/watchlist', { _id: this.props._id })
      .then((response) => {
        if (response.data === 'Data Unavailable')
          this.setState({ dataNull: true, fetching: false });
        else this.setState({ filteredStocks: response.data, fetching: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let handleChange = (stock) => {
      this.props.buySell({
        cmp: stock['cmp'],
        companyName: stock['name'],
        companySymbol: stock['code'],
      });
    };
    let displayCard = () => {
      let filteredStocks = this.state.filteredStocks;
      return filteredStocks.map((stock) => {
        let name =
          stock['name'].length > 20
            ? `${stock['name'].slice(0, 18)}...`
            : stock['name'];
        const cmpColor = stock['_200dma'] < stock['cmp'] ? 'danger' : 'success';
        return (
          <Button
            variant="white"
            style={{
              width: '100%',
              padding: '0px',
              border: 'none',
              textAlign: 'left',
            }}
          >
            <ListGroup.Item variant="white" onClick={() => handleChange(stock)}>
              <Row>
                <Col
                  sm={3}
                  className="text-info"
                  style={{ fontSize: '0.85rem' }}
                >
                  <Link to={`/stock/${stock['code']}`}>{name}</Link>
                </Col>
                <Col sm={3}>Recommendation Rating</Col>
                <Col sm={2}>${stock['_200dma']}</Col>
                <Col sm={2} className={`text-${cmpColor}`}>
                  ${stock['cmp']}
                </Col>
                <Col sm={2} style={{ fontSize: '0.85rem' }}>
                  {stock['peRatio']}
                </Col>
              </Row>
            </ListGroup.Item>
          </Button>
        );
      });
    };
    return (
      <div style={{ minHeight: '300px' }}>
        {this.state.fetching ? (
          <Spinner />
        ) : this.state.dataNull ? (
          <DataNull
            reason="No Stocks to show!"
            tip="Try adding some stocks to your watchlist"
          />
        ) : (
          <Card>
            <ListGroup variant="flush">{displayCard()}</ListGroup>
          </Card>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    _id: state.SET_USER.currentUser._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buySell: (stock) => dispatch({ type: actionTypes.BUY_SELL, stock: stock }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(listCard);
