import { React, Component } from 'react';

import { Card, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class listCard extends Component {
  render() {
    const typeColor = this.props.order['type'] === 'Buy' ? 'success' : 'danger';
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
    const details = [
      {
        name: 'Order',
        data: 'order',
      },
      {
        name: 'Sub-Type',
        data: 'subType',
      },
      {
        name: 'Code',
        data: 'code',
      },
      {
        name: 'Order Price',
        data: 'orderPrice',
      },
      {
        name: 'Market Price',
        data: 'cmp',
      },
      {
        name: 'Exchange',
        data: 'exchange',
      },
    ];
    return (
      <div>
        <Card className="shadow-sm">
          <Card.Header className="font-weight-bold">
            {this.props.order['name']} |
            <span className={'text-' + typeColor}>
              {' '}
              {this.props.order['type']}
            </span>
            <span className="float-right">
              {this.props.order['quantity']} shares
            </span>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Row>
                {details.map((detail, index) => {
                  return (
                    <Col key={index} sm={4}>
                      <span className="ml-3 text-muted font-weight-bold">
                        {detail.name}:{' '}
                      </span>
                      <span className="">{this.props.order[detail.data]}</span>
                    </Col>
                  );
                })}
              </Row>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted" style={{ fontSize: '0.75rem' }}>
            {showTime(this.props.order['verifiedTimestamp'])}
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default listCard;
