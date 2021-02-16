import {React, Component} from 'react';

import Navbar from '../../components/header/header';
import ListCard from '../../components/cards/stockList/listCard';
import BuySellPanel from '../../components/buySellPanel/buySellPanel';

import {Card, Container, ListGroup, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class watchList extends Component{
    componentDidMount() {
        console.log('hi');
    }
    render(){
        return (
            <div>
            <Container>
                <Navbar/>
                <Row className="mt-sm-5">
                    <Col sm={8}>
                        <Card className="shadow-sm">
                            <Container>
                                <h2 className="m-3">Your Watchlist</h2>
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

export default watchList;
