import {React, Component} from 'react';

import { Card, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class listCard extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        const typeColor = this.props.order['type']==="Buy" ? "success" : "danger";
        const showTime = (dated) => {
            if(dated!==undefined){
                let dd = dated.slice(8,10), MM = dated.slice(5,7), yyyy = dated.slice(0,4);
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];
                let time = dated.slice(11,22)
                const showDate = dd + ' ' + months[MM-1] + ' ' + yyyy + ' | ' + time + ' IST';
                return(showDate)
            }
        }
        return (
            <div>
                <Card className="shadow-sm">
                    <Card.Header className="font-weight-bold">
                        {this.props.order['name']} |
                        <span className={"text-"+typeColor}> {this.props.order['type']}</span>
                        <span className="float-right">{this.props.order['quantity']} shares</span>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Row>
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Order: </span>
                                    <span className="">{this.props.order['order']}</span>
                                </Col>
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Sub-Type: </span>
                                    <span className="">{this.props.order['subType']}</span>
                                </Col>
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Validity: </span>
                                    <span className="">Day</span>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Order Price: </span>
                                    <span className="">${this.props.order['orderPrice']}</span>
                                </Col>
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Market Price: </span>
                                    <span className="">${this.props.order['cmp']}</span>
                                </Col>
                                <Col sm={4}>
                                    <span className="ml-3 text-muted font-weight-bold">Exchange: </span>
                                    <span className="">{this.props.order['exchange']}</span>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted" style={{fontSize:"0.75rem"}}>
                        {showTime(this.props.order['executedTimestamp'])}
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default listCard;
