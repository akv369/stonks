import {React, Component} from 'react';

import Navbar from '../../components/header/header';
import ListCard from '../../components/cards/stockList/listCard';
import StocksFilter from '../../components/stocksFilter/stocksFilter';
import PageNumbers from '../../components/PageNumbers/PageNumbers';

import {Container, ListGroup, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class watchList extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                <Container>
                    <Navbar/>
                    <Row className="mt-sm-5">
                        <Col sm={3}>
                            <StocksFilter />
                        </Col>
                        <Col sm={8}>                         
                            <ListGroup variant="flush" className="mb-1">
                                <ListGroup.Item>
                                    <Row>
                                        <Col sm={3}>
                                            Company Name
                                        </Col>
                                        <Col sm={5}>{' '}</Col>
                                        <Col sm={2}>
                                            CMP
                                        </Col>
                                        <Col sm={2}>
                                            Returns
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                            <ListCard/>
                            <PageNumbers/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default watchList;
