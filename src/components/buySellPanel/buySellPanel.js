import { React, Component } from 'react';
import { connect } from 'react-redux';
import Axios from '../../axios-base';

import imgPath from '../../data/click.png';

import Spinner from '../spinner/spinner';
import { Card, Nav, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './buySellPanel.css';

class buySellPanel extends Component {
  state = {
    hash: 'Buy',
    buttonDisabled: true,
    order: 'Market',
    type: 'Delivery',
    shares: 0,
    price: 0,
    loading: false,
    status: '',
    sharesAvailable: 0,
    code: '',
  };
  componentDidMount() {
    Axios.post('/portfolio/' + this.props.buySell.companySymbol, {
      _id: this.props.userID,
    })
      .then((res) =>
        this.setState({
          sharesAvailable: res.data.quantity,
          price: res.data.cmp,
        })
      )
      .catch((err) => console.log(err));
    this.setState({ code: this.props.buySell.companySymbol });
  }
  componentDidUpdate() {
    if (this.state.code !== this.props.buySell.companySymbol) {
      Axios.post('/portfolio/' + this.props.buySell.companySymbol, {
        _id: this.props.userID,
      })
        .then((res) =>
          this.setState({
            sharesAvailable: res.data.quantity,
            price: res.data.cmp,
          })
        )
        .catch((err) => console.log(err));
      this.setState({ code: this.props.buySell.companySymbol });
    }
  }
  placeOrder = () => {
    const price = this.state.price,
      shares = this.state.shares;
    if (isNaN(price) || price <= 0 || isNaN(shares) || shares <= 0) {
      alert('Invalid Input');
    } else {
      const sendData = {
        userID: this.props.userID,
        code: this.props.buySell.companySymbol,
        orderPrice: Number(price),
        quantity: Number(shares),
        type: this.state.hash,
        order: this.state.order,
        subType: this.state.type,
      };
      Axios.post('/order', sendData)
        .then((response) => {
          this.setState({ loading: false, status: response.data });
        })
        .catch((err) => console.log(err));
      this.setState({ loading: true });
    }
  };
  render() {
    const sharesAvailable = this.state.sharesAvailable,
      hash = this.state.hash;
    const sharesOwned = () => {
      if (hash === 'Sell')
        return (
          <div style={{ fontSize: '0.75rem' }} className="text-secondary">
            You own {sharesAvailable} shares
          </div>
        );
    };
    const formPrice = () => {
      if (this.state.order === 'Market')
        return <span style={{ fontSize: '1.30rem' }}>${this.state.price}</span>;
      else
        return (
          <Form.Control
            type="number"
            step=".01"
            min="0.01"
            onChange={(e) => this.setState({ price: e.target.value })}
          />
        );
    };
    const selectAStock = () => {
      return (
        <div style={{ height: '491px' }}>
          <Card.Header>Invest in a Stock</Card.Header>
          <Card.Body>
            <Card.Title className="my-3 text-center">
              <img
                src={imgPath}
                alt="Select A Stock"
                style={{ marginTop: '100px', width: '10%' }}
              />
              <div style={{ marginTop: '100px' }}>
                Click on a stock to see investing options.
              </div>
            </Card.Title>
            <Card.Text>
              <hr className="text-muted" />
              <span
                className="float-right mb-4 text-muted"
                style={{ fontSize: '0.8rem' }}
              >
                Balance: $0
              </span>
            </Card.Text>
          </Card.Body>
        </div>
      );
    };
    const orderForm = () => {
      return (
        <div style={{ height: '491px' }}>
          <Card.Header>
            <Nav justify variant="tabs" defaultActiveKey="#buy">
              <Nav.Item>
                <Nav.Link
                  href="#buy"
                  onClick={(e) => this.setState({ hash: 'Buy' })}
                >
                  Buy
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="#sell"
                  onClick={(e) => this.setState({ hash: 'Sell' })}
                >
                  Sell
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title className="mt-3" style={{ height: '50px' }}>
              {this.props.buySell.companyName}
              {sharesOwned()}
            </Card.Title>
            <Card.Text>
              <div className="m-2">
                <Form>
                  <Form.Group as={Row} controlId="formGridState">
                    <Col sm={6}>
                      <Form.Label>Type</Form.Label>
                    </Col>
                    <Col sm={6}>
                      <Form.Control as="select">
                        <option
                          onClick={(e) => this.setState({ type: 'Delivery' })}
                        >
                          Delivery
                        </option>
                        <option
                          onClick={(e) => this.setState({ type: 'Intraday' })}
                        >
                          Intraday
                        </option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
              <div className="m-2">
                <Form>
                  <Form.Group as={Row} controlId="formGridState">
                    <Col sm={6}>
                      <Form.Label>Order</Form.Label>
                    </Col>
                    <Col sm={6}>
                      <Form.Control as="select">
                        <option
                          onClick={(e) => this.setState({ order: 'Market' })}
                        >
                          Market
                        </option>
                        <option
                          onClick={(e) => this.setState({ order: 'Limit' })}
                        >
                          Limit
                        </option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
              <div className="m-2">
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm="6">
                      Shares
                    </Form.Label>
                    <Col sm="6">
                      <Form.Control
                        type="number"
                        min="1"
                        onChange={(e) =>
                          this.setState({ shares: e.target.value })
                        }
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </div>
              <div className="m-2">
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm="6">
                      Price
                    </Form.Label>
                    <Col sm="6" className="text-center">
                      {formPrice()}
                    </Col>
                  </Form.Group>
                </Form>
              </div>
              <hr className="text-muted" />
              <div
                className="float-right mb-4 text-muted"
                style={{ fontSize: '0.8rem' }}
              >
                Balance: $
                {this.props.userBalance
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </Card.Text>
            <Button
              variant="info"
              style={{ width: '100%' }}
              onClick={() => this.placeOrder()}
            >
              {this.state.hash}
            </Button>
          </Card.Body>
        </div>
      );
    };
    const orderVerified = () => {
      return (
        <div style={{ height: '491px' }}>
          <div className="text-center p-2">
            <div className="my-5" style={{ marginLeft: '80px' }}>
              {renderTick()}
            </div>
            <h5 className="font-weight-bold mb-4">
              Order Verified Successfully
            </h5>
            <p>
              {' '}
              We have have verified your order successfully. Your order will get
              placed once markets open. You can visit Orders section to monitor
              progress.
            </p>
          </div>
        </div>
      );
    };
    const orderPlaced = () => {
      return (
        <div style={{ height: '491px' }}>
          <div className="text-center p-2">
            <div className="my-5" style={{ marginLeft: '80px' }}>
              {renderTick()}
            </div>
            <h5 className="font-weight-bold mb-4">Order Placed Successfully</h5>
            <p>
              {' '}
              You order has been placed successfully with exchange. Your order
              will get executed once CMP reaches your Limit Price. You can visit
              Orders section to monitor progress.
            </p>
          </div>
        </div>
      );
    };
    const orderExecuted = () => {
      return (
        <div style={{ height: '491px' }}>
          <div className="text-center p-2">
            <div className="my-5" style={{ marginLeft: '80px' }}>
              {renderTick()}
            </div>
            <h5 className="font-weight-bold mb-4">
              Order Executed Successfully
            </h5>
            <p>
              You order has been executed successfully. You can visit Orders
              section for details.
            </p>
          </div>
        </div>
      );
    };
    const renderTick = () => {
      return (
        <svg
          className="svg-style"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 130.2 130.2"
        >
          <circle
            className="pathCircle"
            fill="none"
            stroke="#73AF55"
            stroke-width="6"
            stroke-miterlimit="10"
            cx="65.1"
            cy="65.1"
            r="62.1"
          />
          <polyline
            className="pathCheck"
            fill="none"
            stroke="#73AF55"
            stroke-width="6"
            stroke-linecap="round"
            stroke-miterlimit="10"
            points="100.2,40.2 51.5,88.8 29.8,67.5 "
          />
        </svg>
      );
    };
    let renderer =
      this.state.status === 'Verified' ? (
        orderVerified()
      ) : this.state.status === 'Placed' ? (
        orderPlaced()
      ) : this.state.status === 'Executed' ? (
        orderExecuted()
      ) : this.state.loading === true ? (
        <div style={{ height: '491px' }}>
          <Spinner />
        </div>
      ) : this.state.price === 0 ? (
        selectAStock()
      ) : (
        orderForm()
      );
    return (
      <div style={{ width: '300px' }} className="shadow-sm">
        <Card>{renderer}</Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    buySell: state.BUY_SELL.stock,
    userBalance: state.SET_USER.currentUser.balance,
    userID: state.SET_USER.currentUser._id,
  };
};

export default connect(mapStateToProps)(buySellPanel);
