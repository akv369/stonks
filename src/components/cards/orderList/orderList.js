import {React, Component} from 'react';

import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class orderList extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                
                        <h5 className="text-secondary my-4" >2 February 2021</h5>
                            <Row className="my-3">
                                <Col sm={4}>
                                    Company Name<br/>
                                    <div className="text-secondary" style={{fontSize:"0.75rem"}}>Buy . Regular</div>
                                </Col>
                                <Col sm={3}>
                                    100 Shares
                                </Col>
                                <Col sm={3}>
                                    $42.80
                                    <div className="text-secondary" style={{fontSize:"0.75rem"}}>Limit Price</div>
                                </Col>
                                <Col sm={2}>
                                    12:59 AM 
                                    <span className="float-right text-warning">⬤</span>
                                </Col>
                            </Row>
                            <hr style={{color:"grey"}}/>
                            <Row className="mb-3">
                                <Col sm={4}>
                                    Company Name<br/>
                                    <div className="text-secondary" style={{fontSize:"0.75rem"}}>Sell . Regular</div>
                                </Col>
                                <Col sm={3}>
                                    50 Shares
                                </Col>
                                <Col sm={3}>
                                    $42.80
                                    <div className="text-secondary" style={{fontSize:"0.75rem"}}>Average Price</div>
                                </Col>
                                <Col sm={2}>
                                    12:59 AM 
                                    <span className="float-right text-success">⬤</span>
                                </Col>
                            </Row>
                            
                        <h5 className="text-secondary my-4" >31 January 2021</h5>
                            <Row className="my-3">
                                <Col sm={4}>
                                    Company Name<br/>
                                    <div className="text-secondary" style={{fontSize:"0.75rem"}}>Buy . Regular</div>
                                </Col>
                                <Col sm={3}>
                                    100 Shares
                                </Col>
                                <Col sm={3}>
                                    $42.80
                                    <div className="text-secondary" style={{fontSize:"0.75rem"}}>Limit Price</div>
                                </Col>
                                <Col sm={2}>
                                    12:59 AM 
                                    <span className="float-right text-danger">⬤</span>
                                </Col>
                            </Row>
                            <hr style={{color:"grey"}}/>
                            <Row className="mb-3">
                                <Col sm={4}>
                                    Company Name<br/>
                                    <div className="text-secondary" style={{fontSize:"0.75rem"}}>Sell . Regular</div>
                                </Col>
                                <Col sm={3}>
                                    50 Shares
                                </Col>
                                <Col sm={3}>
                                    $42.80
                                    <div className="text-secondary" style={{fontSize:"0.75rem"}}>Average Price</div>
                                </Col>
                                <Col sm={2}>
                                    12:59 AM 
                                    <span className="float-right text-success">⬤</span>
                                </Col>
                            </Row>
            </div>
        );
    }
}

export default orderList;
