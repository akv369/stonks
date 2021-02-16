import {React, Component} from 'react';

import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class companyPerformance extends Component{
    render(){
        return (
            <div className="m-2">
                <h3 className="pt-5 pb-2">Company Performance</h3>
                    <Row className="mt-1">
                        <Col>
                            <div>Open</div>
                            <div style={{fontSize:"1.25rem"}}>${this.props.data[4]}</div>
                        </Col>
                        <Col>
                            <div>High</div>
                            <div style={{fontSize:"1.25rem"}}>${this.props.data[5]}</div>
                        </Col>
                        <Col>
                            <div>Low</div>
                            <div style={{fontSize:"1.25rem"}}>${this.props.data[6]}</div>
                        </Col>
                        <Col>
                            <div>Previous Close</div>
                            <div style={{fontSize:"1.25rem"}}>${this.props.data[7]}</div>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <div>52 Week High</div>
                            <div style={{fontSize:"1.25rem"}}>${this.props.data[0]}</div>
                        </Col>
                        <Col>
                            <div>52 Week Low</div>
                            <div style={{fontSize:"1.25rem"}}>${this.props.data[1]}</div>
                        </Col>
                        <Col>
                            <div>Volume</div>
                            <div style={{fontSize:"1.25rem"}}>{this.props.data[2]}</div>
                        </Col>
                        <Col>
                            <div>200D Moving Avg</div>
                            <div style={{fontSize:"1.25rem"}}>${this.props.data[3]}</div>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default companyPerformance;
