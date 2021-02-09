import {React, Component} from 'react';

import Navbar from '../../components/header/header';
import OrderDetails from '../../components/cards/orderInfo/orderDetails';
import OrderStatus from '../../components/cards/orderInfo/orderStatus';

import {Col, Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class orders extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                <Navbar/>
                <Container className="mt-5">
                    <h2 className="m-3">Order #1354861</h2>
                    <Row className="mt-4">
                        <Col>
                            <OrderDetails/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{offset:3}} className="mt-5">
                            <OrderStatus/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default orders;
