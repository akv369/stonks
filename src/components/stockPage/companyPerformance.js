import {React, Component} from 'react';

import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class companyPerformance extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div className="m-2">
                <h3 className="pt-5 pb-2">Company Performance</h3>
                    <Row className="mt-1">
                        <Col>
                            <div>Open Price</div>
                            <div style={{fontSize:"1.25rem"}}>$25.60</div>
                        </Col>
                        <Col>
                            <div>Previous Price</div>
                            <div style={{fontSize:"1.25rem"}}>$25.25</div>
                        </Col>
                        <Col>
                            <div>Volume</div>
                            <div style={{fontSize:"1.25rem"}}>5,63,18,695</div>
                        </Col>
                        <Col>
                            <div>Value</div>
                            <div style={{fontSize:"1.25rem"}}>$1.45 bn</div>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default companyPerformance;
