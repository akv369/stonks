import {React, Component} from 'react';

import { Card, Badge, ListGroup, Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class stocksFilter extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                <Card className="shadow-sm">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h6 className="font-weight-bold float-left mt-2">
                                Filters
                            </h6>
                            <Badge pill variant="primary" className="float-right mt-2">
                                Apply Filters
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="mb-2">
                                SECTORS
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Automobile"
                                    type={"checkbox"} 
                                    id={"automobile"} 
                                />
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Banking"
                                    type={"checkbox"} 
                                    id={"banking"} 
                                />
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Energy"
                                    type={"checkbox"} 
                                    id={"energy"} 
                                />
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Healthcare"
                                    type={"checkbox"} 
                                    id={"healthcare"} 
                                />
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="FMCG"
                                    type={"checkbox"} 
                                    id={"FMCG"} 
                                />
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Media & Entertainment"
                                    type={"checkbox"} 
                                    id={"mediaentertainment"} 
                                />
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Technology"
                                    type={"checkbox"} 
                                    id={"technology"} 
                                />
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Transportation"
                                    type={"checkbox"} 
                                    id={"transportation"} 
                                />
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Tourism"
                                    type={"checkbox"} 
                                    id={"tourism"} 
                                />
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Telecommunication"
                                    type={"checkbox"} 
                                    id={"telecommunication"} 
                                />
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="mb-2">
                                MARKET CAP ($bn)
                            </div>
                            <Form.Row>
                                <Col md="5">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={"0"}
                                    />
                                </Form.Group>
                                </Col>
                                <span className="m-1">to</span>
                                <Col md="5">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={"10000"}
                                    />
                                </Form.Group>
                                </Col>
                            </Form.Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="mb-2">
                                CLOSING PRICE
                            </div>
                            <Form.Row>
                                <Col md="5">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={"0"}
                                    />
                                </Form.Group>
                                </Col>
                                <span className="m-1">to</span>
                                <Col md="5">
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={"10000"}
                                    />
                                </Form.Group>
                                </Col>
                            </Form.Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        );
    }
}

export default stocksFilter;
