import { React, Component } from 'react';
import { Link } from 'react-router-dom';

import HomeCard from '../../components/cards/homeCard/homeCard';

import { CardDeck, Container, Badge, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class home extends Component {
  state={
    dow:{},
    snp:{},
    nasdaq:{},
    gainer:{},
    loser:{},
  }
  render() {
    const sectors = [
      'All',
      'Basic Materials',
      'Communication Services',
      'Consumer Cyclical',
      'Consumer Defensive',
      'Energy',
      'Financial Services',
      'Healthcare',
      'Industrials',
      'Other',
      'Real Estate',
      'Technology',
      'Utilities',
    ];
    return (
      <div>
        <Container>
          <h3 className="mt-sm-4 mb-sm-3">Hello Akash, Your portfolio is 2% up.</h3>
          <h3 className="mt-sm-3 mb-sm-3">Apple emerged as your biggest gainer at 23%</h3>
          <h4 className="mt-sm-4 mb-sm-3">Explore Stocks</h4>
          <Row>
            <Col className="d-inline">
              {sectors.map((eachSector) => {
                return (
                  <h5 className="d-inline mt-sm-5 mr-1" key={eachSector}>
                    <Link to={`/stocks?sector=${eachSector}`}>
                      <Badge pill variant="info">
                        {eachSector}
                      </Badge>
                    </Link>{' '}
                  </h5>
                );
              })}
            </Col>
            <Col inline>
              <h2>
                <Link to="/stocks">
                  <Badge pill variant="info">
                    All Stocks
                  </Badge>
                </Link>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="mt-sm-4 mb-sm-3">Best performer</h4>
                <HomeCard category="stock" data={this.state.gainer} />
            </Col>
            <Col>
              <h4 className="mt-sm-4 mb-sm-3">Worst performer</h4>
                <HomeCard category="stock" data={this.state.loser} />
            </Col>
          </Row>
          <h4 className="mt-sm-5 mb-sm-3"> </h4>
        </Container>
      </div>
    );
  }
}

export default home;
