import { React, Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions';
import ListItem from './listItem';

import { Card, ListGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class listCard extends Component {
  state = {
    fetching: true,
  };
  render() {
    let handleChange = (stock) => {
      this.props.buySell({
        companyName: stock['name'],
        companySymbol: stock['code'],
      });
    };
    return (
      <Card>
        <ListGroup variant="flush">
          {this.props.portfolio.stocks.map((stock) => {
            return (
              <Button
                key={stock.code}
                variant="white"
                style={{
                  width: '100%',
                  padding: '0px',
                  border: 'none',
                  textAlign: 'left',
                }}
                onClick={() => handleChange(stock)}
              >
                <ListItem
                  stockData={stock}
                  investedValue={this.props.portfolio.investedValue}
                />
              </Button>
            );
          })}
        </ListGroup>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buySell: (stock) => dispatch({ type: actionTypes.BUY_SELL, stock: stock }),
  };
};

export default connect(null, mapDispatchToProps)(listCard);
