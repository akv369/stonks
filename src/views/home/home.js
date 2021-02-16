import {React, Component} from 'react';
import {Link} from "react-router-dom";

import Navbar from '../../components/header/header';
import HomeCard from '../../components/cards/homeCard/homeCard';

import {CardDeck, Container, Badge, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class home extends Component{
    render(){
        return (
            <div>
            <Navbar/>
                <Container>
                    <h4 className="mt-sm-4 mb-sm-3">Indices</h4>
                    <CardDeck>
                        <HomeCard category="index"/>
                        <HomeCard category="index"/>
                        <HomeCard category="index"/>
                    </CardDeck>
                    <h4 className="mt-sm-4 mb-sm-3">Explore Stocks</h4>
                        <Row>
                            <Col className="d-inline"> 
                                <h5 className="d-inline mt-sm-5 mr-1"><Badge pill variant="info">Banking</Badge>{' '}</h5>
                                <h5 className="d-inline mt-sm-5 mr-1"><Badge pill variant="info">Energy</Badge>{' '}</h5>
                                <h5 className="d-inline mt-sm-5 mr-1"><Badge pill variant="info">Technology</Badge>{' '}</h5>
                                <h5 className="d-inline mt-sm-5 mr-1"><Badge pill variant="info">Healthcare</Badge>{' '}</h5>
                                <h5 className="d-inline mt-sm-5 mr-1"><Badge pill variant="info">FMCG</Badge>{' '}</h5>
                                <h5 className="d-inline mt-sm-5 mr-1"><Badge pill variant="info">Automobile</Badge>{' '}</h5>
                                <h5 className="d-inline mt-sm-5 mr-1"><Badge pill variant="info">Transportation</Badge>{' '}</h5>
                                <h5 className="d-inline mt-sm-5 mr-1"><Badge pill variant="info">Telecommunication</Badge>{' '}</h5>
                                <h5 className="d-inline mt-sm-5 mr-1"><Badge pill variant="info">Media {'&'} Entertainment</Badge>{' '}</h5>
                            </Col>
                            <Col inline> 
                                <h2><Link to="/stocks"><Badge pill variant="info">All Stocks</Badge></Link></h2>
                            </Col>
                        </Row>
                    <Row>
                        <Col>
                            <h4 className="mt-sm-4 mb-sm-3">Top Gainer</h4>
                            <HomeCard/>
                        </Col>
                        <Col>
                            <h4 className="mt-sm-4 mb-sm-3">Top Loser</h4>
                            <HomeCard/>
                        </Col>
                    </Row>
                    <h4 className="mt-sm-5 mb-sm-3">{' '}</h4>
                </Container>
            </div>
        );
    }
}

export default home;