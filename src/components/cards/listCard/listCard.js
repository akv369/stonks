import {React, Component} from 'react';

import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class listCard extends Component{
    render(){
        const portfolio = this.props.portfolio;
        const renderer = () => {
            const stocks = portfolio.stocks;
            return(
                stocks.map(stock => {
                    let companyName = stock.name, quantity = stock.quantity, avg = stock.averagePrice;
                    companyName = companyName.length>20 ? companyName.slice(0,16) + "..." : companyName;
                    const investedValue = stock.value;
                    let investedPercent = (investedValue/portfolio.investedValue)*100;
                    investedPercent = investedPercent.toFixed(2);
                    const returns = stock.returns, returnsPercent = ((returns/investedValue)*100).toFixed(2);
                    const returnsColor = returns<=0 ? "danger" : "success";
                    const graphColor = "success", hrefLink = "/stock/" + stock.code;
                    return(
                        <div>
                            <ListGroup.Item>
                                <Row>
                                    <Col sm={3}>
                                        <Link to={hrefLink}>{companyName}</Link>
                                        <div style={{fontSize:"0.75rem"}}>{quantity} shares @{avg}</div>
                                    </Col>
                                    <Col sm={5}>
                                        <div className={"text-" + graphColor}>Graph Points will form a graph here</div>
                                    </Col>
                                    <Col sm={2}>
                                        ${investedValue}
                                        <div className="text-secondary" style={{fontSize:"0.75rem"}}>{investedPercent}%</div>
                                    </Col>
                                    <Col sm={2}>
                                        ${returns}
                                        <div className={"text-" + returnsColor} style={{fontSize:"0.75rem"}}>
                                            {returnsPercent}%
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </div>
                    )
                })
            )
        }
        return (
            <div>
                <Card>
                    <ListGroup variant="flush">
                        {renderer()}
                    </ListGroup>
                </Card>
            </div>
        );
    }
}

export default listCard;
