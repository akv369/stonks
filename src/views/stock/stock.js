import {React, Component} from 'react';
import axios from 'axios';

import Navbar from '../../components/header/header';
import BuySellPanel from '../../components/buySellPanel/buySellPanel';
import StockGraph from '../../components/stockPage/stockGraph';
import CompanyPerformance from '../../components/stockPage/companyPerformance';
import CompanyOverview from '../../components/stockPage/companyOverview';
import SimilarStocks from '../../components/stockPage/similarStocks';

import {Card, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class stock extends Component{
    componentDidMount() {/*
        axios.get('http://localhost:1111/l')
        axios.get('https://api.twelvedata.com/time_series?symbol=AAPL&interval=5min&apikey=d609067766fb4ac9bcd8a24d328d7a13')
         .then(response => {
           console.log(response.data);
        })*/
    }
    render(){
        return (
            <div>
            <Container>
                <Navbar/>
                <Row className="mt-5">
                    <Col sm={8}>
                        <Row>
                            <Col sm={1} className="bg-primary text-white ml-3">
                                <h1 className="mt-2 ml-1">A</h1>
                            </Col>
                            <Col sm={3}>
                                <h3>Apple Inc.</h3>
                                <h6 className="text-muted">AAPL</h6>
                            </Col>
                            <Col 
                                sm={{span:7}} 
                                className="text-right text-success font-weight-bold ml-4">
                                <h3>$23.45</h3>
                                <h6>+1.20 (3.45%)</h6>
                            </Col>
                        </Row>
                        <div className="mt-4">
                            <StockGraph/>
                        </div>
                        <div>
                            <CompanyPerformance/>
                        </div>
                        <div>
                            <CompanyOverview/>
                        </div>
                        <div>
                            <SimilarStocks/>
                        </div>
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

export default stock;
