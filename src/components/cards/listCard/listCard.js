import { React, Component } from 'react';

import ListItem from './listItem';

import { Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class listCard extends Component {
  state = {
    fetching: true,
  };
  render() {
    return (
      <Card>
        <ListGroup variant="flush">
          {this.props.portfolio.stocks.map((stock) => {
            return (
              <ListItem
                stockData={stock}
                investedValue={this.props.portfolio.investedValue}
              />
            );
          })}
        </ListGroup>
      </Card>
    );
  }
}

export default listCard;
