import { React, Component } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class listCard extends Component {
  render() {
    const displayCard = () => {
      let filteredStocks = this.props.filteredStocks,
        start = 0,
        end = 8;
      if (this.props.pageDetails) {
        const currentPage = this.props.pageDetails.currentPage;
        const stocksPerPage = this.props.pageDetails.stocksPerPage;
        start = (currentPage - 1) * stocksPerPage;
        end = start + stocksPerPage;
      }
      let i = -1;
      return filteredStocks.map((stock) => {
        i++;
        if (i >= start && i < end) {
          let _52wh = stock['_52wh'],
            _52wl = stock['_52wl'],
            cmp = stock['cmp'];
          let name = stock['name'],
            marketCap = stock['marketCap'],
            roe = stock['roe'],
            pe = stock['peRatio'];
          const cmpColor =
            (Number(_52wh) + Number(_52wl)) / 2 > Number(cmp)
              ? 'danger'
              : 'success';
          const roeColour = Number(roe) < 5 ? 'danger' : 'success';
          const refLink = '/stock/' + stock['code'];
          if (name.length > 25) name = name.slice(0, 19) + '...';
          return (
            <div>
              <ListGroup.Item>
                <Row>
                  <Col
                    sm={2}
                    className="text-info"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <Link to={refLink}>{name}</Link>
                  </Col>
                  <Col sm={2} className={'text-' + cmpColor}>
                    ${cmp}
                  </Col>
                  <Col sm={2}>${_52wh}</Col>
                  <Col sm={2}>${_52wl}</Col>
                  <Col sm={2}>${marketCap}</Col>
                  <Col
                    sm={1}
                    className={'text-' + roeColour + ' font-weight-bold'}
                    style={{ fontSize: '0.85rem' }}
                  >
                    {roe}
                  </Col>
                  <Col sm={1} style={{ fontSize: '0.85rem' }}>
                    {pe}
                  </Col>
                </Row>
              </ListGroup.Item>
            </div>
          );
        }
      });
    };
    return (
      <div>
        <Card>
          <ListGroup variant="flush">{displayCard()}</ListGroup>
        </Card>
      </div>
    );
  }
}

export default listCard;
