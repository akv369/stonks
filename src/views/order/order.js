import { React, Component } from 'react';
import Axios from '../../axios-base';
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';
import { connect } from 'react-redux';

import OrderDetails from '../../components/cards/orderInfo/orderDetails';
import OrderStatus from '../../components/cards/orderInfo/orderStatus';
import Spinner from '../../components/spinner/spinner';
import DataNull from '../../components/dataNull/dataNull'

import { Col, Container, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class order extends Component {
  state = {
    orderID: '',
    orderDetails: {},
    print: false,
    fetching: true,
    dataNull: false,
  };

  componentDidMount() {
    const sendData = {_id : this.props.user._id}
    Axios.post('/order/' + this.props.match.params.orderID, sendData)
    .then((response) => {
      if (response.data === 'Data Unavailable')
        this.setState({ dataNull: true, fetching: false });
      else this.setState({ orderDetails: response.data, fetching: false });
    });
  }

  render() {
    const orderID = this.props.match.params.orderID;
    if (this.state.print) {
      this.setState({ print: false });
      const domElement = document.getElementById('your-id');
      const fileName = 'Order_' + orderID + '.pdf';
      html2canvas(domElement, {
        onclone: (document) => {
          document.getElementById('print-button').style.visibility = 'hidden';
        },
      }).then((canvas) => {
        const img = canvas.toDataURL('image/png');
        const pdf = new jsPdf('landscape');
        pdf.addImage(img, 'PNG', -20, -15, 330, 150);
        pdf.save(fileName);
      });
    }
    const order = this.state.orderDetails;
    return this.state.fetching ? (
      <Spinner />
    ) : this.state.dataNull ? (
      <DataNull
        reason="Access Denied"
        tip="Order you are trying to get does not belong to you"
      />
    ) : (
      <div id="your-id">
        <Container>
          <h2 className="m-3 mt-5">Order #{order._id}</h2>
          <Row className="mt-4">
            <Col>
              <OrderDetails order={order} />
            </Col>
          </Row>
          <Row>
            <Col sm={{ offset: 3 }} className="mt-5">
              <OrderStatus order={order} />
            </Col>
          </Row>
        </Container>
        <div style={{ width: '85%' }}>
          <Button
            id="print-button"
            className="mt-5 float-right"
            onClick={() => this.setState({ print: true })}
          >
            Print Order Receipt
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.SET_USER.currentUser,
  };
};

export default connect(mapStateToProps)(order);
