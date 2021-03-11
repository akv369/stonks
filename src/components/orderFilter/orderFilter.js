import {React, Component} from 'react';

import { Card, Badge, ListGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class orderFilter extends Component{
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
                            <Badge pill variant="info" className="float-right mt-2">
                                Apply Filters
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1" style={{marginBottom:'0px'}}>
                                    <Form.Control type="text" placeholder="Stock Name" />
                                </Form.Group>
                            </Form>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="mr-3">
                                Type:
                            </span>
                            <Form.Check 
                                inline 
                                label="Buy"
                                type={"checkbox"} 
                                id={"buy"} 
                            />
                            <Form.Check 
                                inline 
                                label="Sell"
                                type={"checkbox"} 
                                id={"sell"} 
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Successful"
                                    type={"checkbox"} 
                                    id={"successful"} 
                                />
                                <span className="float-right text-success">⬤</span>
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="In Progress"
                                    type={"checkbox"} 
                                    id={"inProgress"} 
                                />
                                <span className="float-right text-warning">⬤</span>
                            </div>
                            <div>
                                <Form.Check 
                                    inline 
                                    label="Unsuccessful"
                                    type={"checkbox"} 
                                    id={"unsuccessful"} 
                                />
                                <span className="float-right text-danger">⬤</span>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        );
    }
}

export default orderFilter;
