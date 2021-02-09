import {React, Component} from 'react';

import { Card, Nav, Button, Badge, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class beySellPanel extends Component{
    componentDidMount() {
       console.log('Buy Sell Panel');
    }
    render(){
        return (
            <div style={{width:"300px"}} className="shadow-sm">
                <Card>
                    <Card.Header>
                        <Nav justify variant="tabs" defaultActiveKey="#buy">
                            <Nav.Item>
                                <Nav.Link href="#buy">Buy</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#sell">Sell</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="mb-4">Company Name</Card.Title>
                        <Card.Text>
                            <div className="m-2">
                                <Form>
                                    <Form.Group as={Row} controlId="formGridState">
                                        <Col sm={6}>
                                            <Form.Label>Type</Form.Label>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Control as="select" defaultValue="Choose...">
                                                <option>Delivery</option>
                                                <option>IntraDay</option>
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
                                            <Form.Control as="select" defaultValue="Choose...">
                                                <option>Market</option>
                                                <option>Limit</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="m-2">
                                <Form>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="6">
                                            Shares
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control type="number"/>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="m-2">
                                <Form>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="6">
                                            Price
                                        </Form.Label>
                                        <Col sm="6">
                                            <Form.Control type="number"/>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                            <hr className="text-muted"/>
                            <div className="float-right mb-4 text-muted" style={{fontSize:"0.8rem"}}> Balance: $49,000 </div>
                        </Card.Text>
                        <Button variant="primary" style={{width:"100%"}}>Buy</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default beySellPanel;
