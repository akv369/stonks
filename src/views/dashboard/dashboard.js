import {React, Component} from 'react';

import Navbar from '../../components/header/header';
import ListCard from '../../components/cards/listCard/listCard';
import BuySellPanel from '../../components/buySellPanel/buySellPanel';

import {Container, Card, Row, Col, ListGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class dashboard extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                <Navbar/>
                <Container>
                    <Row className="mt-sm-5">
                        <Col sm={8}>
                            <Card className="shadow-sm">
                                <Row>
                                    <Col sm={6}>
                                        <Card.Body>
                                            <Card.Title>Portfolio Value</Card.Title>
                                            <Card.Text>
                                                <h2>$1234</h2>
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col sm={3}>
                                        <Card.Body>
                                            <Card.Text>
                                                Invested Value <br/>
                                                Total Returns <br/>
                                                1-Day Returns
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col>
                                        <Card.Body>
                                            <Card.Text>
                                                $1000 <br/>
                                                <span className="text-success"> $234 (23.4%)</span> <br/>
                                                <span className="text-success"> $34 (3.4%)</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Row>
                                <Container>
                                    <Card>                                    
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col sm={3}>
                                                        Company Name
                                                    </Col>
                                                    <Col sm={5}>{' '}
                                                    </Col>
                                                    <Col sm={2}>
                                                        CMP
                                                    </Col>
                                                    <Col sm={2}>
                                                        Returns
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                    <ListCard/>
                                </Container>
                                <Card.Body>{' '}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={3}>
                            <BuySellPanel/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default dashboard;
