import {React, Component} from 'react';

import { Card, Pagination, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import StockList from '../cards/stockList/listCard';

class similarStocks extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                <Card className="shadow-sm mt-5 mb-3">
                    <h3 className="pl-3 pt-2">Similar Stocks</h3>
                <StockList/>
                </Card>
            </div>
        );
    }
}

export default similarStocks;
