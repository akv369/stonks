import {React, Component} from 'react';

import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class listCard extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                <Card className="shadow-sm">
                    <Card.Header className="font-weight-bold">
                        Indian Railways Finance Corporation |
                        <span className="text-danger"> Sell</span>
                        <span className="float-right">475 shares</span>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Row>
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Order: </span>
                                    <span className="">Market</span>
                                </Col>
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Type: </span>
                                    <span className="">Delivery</span>
                                </Col>
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Validity: </span>
                                    <span className="">Day</span>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Order Price: </span>
                                    <span className="">$26.15</span>
                                </Col>
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Market Price: </span>
                                    <span className="">$25.75</span>
                                </Col>
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Exchange: </span>
                                    <span className="">NASDAQ</span>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted" style={{fontSize:"0.75rem"}}>7 February 2021 | 06:05 PM IST </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default listCard;
