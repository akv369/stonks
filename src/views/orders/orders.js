import {React, Component} from 'react';

import Navbar from '../../components/header/header';
import OrderFilter from '../../components/orderFilter/orderFilter';
import OrderList from '../../components/cards/orderList/orderList';

import {Col, Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class orders extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                <Container>
                    <Navbar/>
                    <h2 className="m-3">Your Orders</h2>
                    <Row className="mt-4">
                        <Col sm={3}>
                            <OrderFilter/>
                        </Col>
                        <Col sm={{offset:1}}>
                            <OrderList/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default orders;
