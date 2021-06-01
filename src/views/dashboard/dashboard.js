import { React, Component } from 'react';
import Axios from '../../axios-base';
import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner';
import ListCard from '../../components/cards/listCard/listCard';
import BuySellPanel from '../../components/buySellPanel/buySellPanel';
import DataNull from '../../components/dataNull/dataNull';

import { Container, Card, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class dashboard extends Component {
  state = {
    loading: true,
    portfolio: {},
    dataNull: false,
  };
  componentDidMount() {
    Axios.post('/dashboard', { _id: this.props.user._id })
      .then((res) => {
        if (res.data !== 'Data Unavailable')
          this.setState({ portfolio: res.data, loading: false });
        else this.setState({ dataNull: true, loading: false });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const portfolio = this.state.portfolio;
    let investedValue, returns, returnsPercent;
    if (portfolio.investedValue !== undefined) {
      investedValue = Number(portfolio.investedValue.toFixed(2));
      returns = Number(portfolio.totalReturns.toFixed(2));
      returnsPercent = portfolio.returnsPercent;
      console.log(investedValue);
      console.log(returns);
    }
    const renderer = () => {
      if (this.state.loading === true) {
        return (
          <div style={{ height: '491px' }}>
            <Spinner />
          </div>
        );
      } else {
        return (
          <div>
            <Row>
              <Col sm={6}>
                <Card.Body>
                  <Card.Title>Portfolio Value</Card.Title>
                  <Card.Text>
                    <h2>${(investedValue + returns).toFixed(2)}</h2>
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col sm={3}>
                <Card.Body className="mt-3">
                  <Card.Text>
                    Invested Value <br />
                    Total Returns
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col sm={3}>
                <Card.Body className="mt-3">
                  <Card.Text>
                    ${investedValue} <br />
                    <span className="text-success">
                      ${returns} ({returnsPercent}%)
                    </span>{' '}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
            <Container>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col sm={3}>Company Name</Col>
                      <Col sm={5}> </Col>
                      <Col sm={2}>Invested</Col>
                      <Col sm={2}>Returns</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <ListCard portfolio={this.state.portfolio} />
            </Container>
            <Card.Body> </Card.Body>
          </div>
        );
      }
    };
    const returnData = () => {
      if (this.state.dataNull) {
        return (
          <DataNull
            reason="No Data Available!"
            tip="Buy some stocks to enable Dashboard..."
          />
        );
      }
      return (
        <Row className="mt-sm-5">
          <Col sm={8}>
            <Card className="shadow-sm">{renderer()}</Card>
          </Col>
          <Col sm={3}>
            <BuySellPanel />
          </Col>
        </Row>
      );
    };
    return (
      <div>
        <Container>{returnData()}</Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.SET_USER.currentUser,
  };
};

export default connect(mapStateToProps, null)(dashboard);
