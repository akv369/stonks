import {React, Component} from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

import { Card, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import StockList from '../cards/stockList/listCard';

class similarStocks extends Component{
    componentDidMount() {
        const stockFilters={
            cmpUl: 10000,
            cmpLl: 0,
            sectors: {
                "All": false,
                "Basic Materials": false,
                "Communication Services": false,
                "Consumer Cyclical": false,
                "Consumer Defensive": false,
                "Energy": false,
                "Financial Services": false,
                "Healthcare": false,
                "Industrials": false,
                "Other": false,
                "Real Estate": false,
                "Technology": false,
                "Utilities": false,
                "length": 1
            },
            mcUl: 10000,
            mcLl: 0
        }
        stockFilters.sectors[this.props.sector]=true;
        this.props.setFilters(stockFilters);
    }
    render(){
        return (
            <div>
                <Card className="shadow-sm mt-5 mb-3">
                    <h3 className="pl-3 pt-2">Similar Stocks</h3>
                    
                    <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col sm={2}>
                                            Name
                                        </Col>
                                        <Col sm={2}>
                                            200 Days Avg.
                                        </Col>
                                        <Col sm={2}>
                                            52 Weeks High
                                        </Col>
                                        <Col sm={2}>
                                            52 Weeks Low
                                        </Col>
                                        <Col sm={2}>
                                            Market Capitalization
                                        </Col>
                                        <Col sm={1}>
                                            ROE%
                                        </Col>
                                        <Col sm={1}>
                                            P/E
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                    <StockList/>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return null;
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        setFilters: (stockFilters) => dispatch({type: actionTypes.SET_STOCK_FILTERS, stockFilters: stockFilters})
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(similarStocks);
