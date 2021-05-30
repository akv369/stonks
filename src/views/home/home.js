import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeCard from '../../components/cards/homeCard/homeCard';
import Spinner from '../../components/spinner/spinner';
import Axios from '../../axios-base';

import { Container, Badge, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class home extends Component {
  state = {
    gainer: {},
    percent: 0,
    loser: {},
    fetching: true,
    dataNull: false,
  };
  componentDidMount() {
    Axios.post('/home', { _id: this.props.user._id })
      .then((res) => {
        if (res.data === 'Data Unavailable')
          this.setState({ dataNull: true, fetching: false });
        else
          this.setState({
            gainer: res.data.gainer,
            loser: res.data.loser,
            percent: res.data.returnsPercent,
            fetching: false,
          });
      })
      .catch((err) => console.log(err));
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
    const renderExplore = () => {
      return (
        <div>
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
        </div>
      );
    };
    const renderNull = () => {
      return (
        <Container>
          <h1 style={{ marginTop: '15%' }}>
            Welcome to amazing world of Stocks.
            <br />
            Stonks is here to help you learn how stock market works...
          </h1>
          {renderExplore()}
        </Container>
      );
    };
    const renderHome = () => {
      return (
        <Container>
          <h3 className="mt-sm-5 mb-sm-3">
            Hello {this.props.user.name},<br />
            Your portfolio is{' '}
            <span
              className={`text-${
                this.state.percent > 0 ? 'success' : 'danger'
              }`}
            >
              {this.state.percent}% up.
            </span>
          </h3>
          <h3 className="mt-sm-5 mb-sm-3">
            {this.state.gainer.name} emerged as your biggest gainer at{' '}
            {this.state.gainer.returnsPercent}%
          </h3>
          {renderExplore()}
          <Row>
            <Col>
              <h4 className="mt-sm-5 mb-sm-3">Best performer</h4>
              <HomeCard category="stock" data={this.state.gainer} />
            </Col>
            <Col>
              <h4 className="mt-sm-5 mb-sm-3">Worst performer</h4>
              <HomeCard category="stock" data={this.state.loser} />
            </Col>
          </Row>
          <h4 className="mt-sm-5 mb-sm-3"> </h4>
        </Container>
      );
    };
    return this.state.fetching ? (
      <Spinner />
    ) : this.state.dataNull ? (
      renderNull()
    ) : (
      renderHome()
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.SET_USER.currentUser,
  };
};

export default connect(mapStateToProps)(home);
