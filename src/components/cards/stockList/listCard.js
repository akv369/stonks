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
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col sm={3}>
                                    Company Name<br/>
                                </Col>
                                <Col sm={5}>
                                    <div className="text-success">Graph Points will form a graph here</div>
                                </Col>
                                <Col sm={2}>
                                    $42.80
                                    <div className="text-success" style={{fontSize:"0.75rem"}}>1.10 (2.64%)</div>
                                </Col>
                                <Col sm={2}>
                                    +$204
                                    <div className="text-success" style={{fontSize:"0.75rem"}}>10.64%</div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col sm={3}>
                                    Company Name<br/>
                                </Col>
                                <Col sm={5}>
                                    <div className="text-danger">Graph Points will form a graph here</div>
                                </Col>
                                <Col sm={2}>
                                    $220
                                    <div className="text-danger" style={{fontSize:"0.75rem"}}>-0.15 (0.07%)</div>
                                </Col>
                                <Col sm={2}>
                                    -$12
                                    <div className="text-danger" style={{fontSize:"0.75rem"}}>1.30%</div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col sm={3}>
                                    Company Name<br/>
                                </Col>
                                <Col sm={5}>
                                    <div className="text-success">Graph Points will form a graph here</div>
                                </Col>
                                <Col sm={2}>
                                    $42.80
                                    <div className="text-success" style={{fontSize:"0.75rem"}}>1.10 (2.64%)</div>
                                </Col>
                                <Col sm={2}>
                                    +$204
                                    <div className="text-success" style={{fontSize:"0.75rem"}}>10.64%</div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col sm={3}>
                                    Company Name<br/>
                                </Col>
                                <Col sm={5}>
                                    <div className="text-danger">Graph Points will form a graph here</div>
                                </Col>
                                <Col sm={2}>
                                    $220
                                    <div className="text-danger" style={{fontSize:"0.75rem"}}>-0.15 (0.07%)</div>
                                </Col>
                                <Col sm={2}>
                                    -$12
                                    <div className="text-danger" style={{fontSize:"0.75rem"}}>1.30%</div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col sm={3}>
                                    Company Name<br/>
                                </Col>
                                <Col sm={5}>
                                    <div className="text-success">Graph Points will form a graph here</div>
                                </Col>
                                <Col sm={2}>
                                    $42.80
                                    <div className="text-success" style={{fontSize:"0.75rem"}}>1.10 (2.64%)</div>
                                </Col>
                                <Col sm={2}>
                                    +$204
                                    <div className="text-success" style={{fontSize:"0.75rem"}}>10.64%</div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col sm={3}>
                                    Company Name<br/>
                                </Col>
                                <Col sm={5}>
                                    <div className="text-danger">Graph Points will form a graph here</div>
                                </Col>
                                <Col sm={2}>
                                    $220
                                    <div className="text-danger" style={{fontSize:"0.75rem"}}>-0.15 (0.07%)</div>
                                </Col>
                                <Col sm={2}>
                                    -$12
                                    <div className="text-danger" style={{fontSize:"0.75rem"}}>1.30%</div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        );
    }
}

export default listCard;
