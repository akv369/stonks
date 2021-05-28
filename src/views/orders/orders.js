import { React, Component } from 'react';
import { connect } from 'react-redux';
import Axios from '../../axios-base';

import OrderFilter from '../../components/orders/orderFilter';
import OrderList from '../../components/orders/orderList';
import Spinner from '../../components/spinner/spinner';
import DataNull from '../../components/dataNull/dataNull';

import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class orders extends Component {
  state = {
    orderFilters: {
      type: 'All',
      status: 'All',
    },
    filteredOrders: null,
    fetching: true,
    fetchingAgain: false,
    tip: '',
  };
  componentDidMount() {
    let currentFilters = this.state.orderFilters;
    currentFilters._id = this.props.userID;
    Axios.post('/orders', currentFilters)
      .then((response) => {
        if (response.data === 'Data Unavailable')
          this.setState({
            dataNull: true,
            fetching: false,
            tip: 'Place some orders first',
          });
        else this.setState({ filteredOrders: response.data, fetching: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const handleFetch = (filters) => {
      let currentFilters = filters;
      currentFilters._id = this.props.userID;
      this.setState({ fetchingAgain: true, dataNull: false });
      Axios.post('/orders', currentFilters)
        .then((response) => {
          if (response.data === 'Data Unavailable')
            this.setState({
              dataNull: true,
              fetchingAgain: false,
              tip: 'Try changing filters...',
            });
          else
            this.setState({
              filteredOrders: response.data,
              fetchingAgain: false,
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const renderAfterFetch = () => {
      if (!this.state.fetchingAgain) {
        if (this.state.dataNull)
          return <DataNull reason="No Order Found :(" tip={this.state.tip} />;
        else return <OrderList filteredOrders={this.state.filteredOrders} />;
      } else return <Spinner />;
    };
    return this.state.fetching ? (
      <Spinner />
    ) : (
      <div>
        <Container>
          <h2 className="m-3">Your Orders</h2>
          <Row className="mt-4">
            <Col sm={3}>
              <OrderFilter
                filters={this.state.orderFilters}
                setFilters={(data) => handleFetch(data)}
              />
            </Col>
            <Col sm={{ offset: 1 }}>{renderAfterFetch()}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.SET_USER.currentUser._id,
  };
};

export default connect(mapStateToProps)(orders);
