import {React, Component} from 'react';

import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class companyOverview extends Component{
    render(){
        return (
            <div className="m-2">
                <h3 className="pt-3">Company Statistics</h3>
                    <Row className="mt-1">
                        <Col>
                            <div>Market Cap</div>
                            <div style={{fontSize:"1.25rem"}}>${this.props.data[0]}</div>
                        </Col>
                        <Col>
                            <div>PEG Ratio</div>
                            <div style={{fontSize:"1.25rem"}}>{this.props.data[1]}</div>
                        </Col>
                        <Col>
                            <div>P/E Ratio</div>
                            <div style={{fontSize:"1.25rem"}}>{this.props.data[2]}</div>
                        </Col>
                        <Col>
                            <div>EBITDA</div>
                            <div style={{fontSize:"1.25rem"}}>{this.props.data[3]}</div>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <div>Div. Yield</div>
                            <div style={{fontSize:"1.25rem"}}>{this.props.data[4]}%</div>
                        </Col>
                        <Col>
                            <div>Book Value</div>
                            <div style={{fontSize:"1.25rem"}}>{this.props.data[5]}</div>
                        </Col>
                        <Col>
                            <div>EPS(TTM)</div>
                            <div style={{fontSize:"1.25rem"}}>${this.props.data[6]}</div>
                        </Col>
                        <Col>
                            <div>ROE</div>
                            <div style={{fontSize:"1.25rem"}}>{this.props.data[7]}%</div>
                        </Col>
                    </Row>
                <h3 className="pt-3">About the Company</h3>
                <p className="text-justify" style={{fontSize:"0.9rem"}}>
                    {this.props.data[8]}
                </p>
                <Row className="mt-1">
                        <Col sm={2}>
                            <div>Exchange</div>
                            <div style={{fontSize:"1.25rem"}}>{this.props.data[9]}</div>
                        </Col>
                        <Col sm={4}>
                            <div>Sector</div>
                            <div style={{fontSize:"1.25rem"}}>{this.props.data[10]}</div>
                        </Col>
                        <Col sm={6}>
                            <div>Industry</div>
                            <div style={{fontSize:"1.25rem"}}>{this.props.data[11]}</div>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default companyOverview;
