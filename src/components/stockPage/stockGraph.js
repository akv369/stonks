import {React, Component} from 'react';

import { Card, Pagination, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class stockGraph extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                <Card className="shadow-sm" style={{height:"400px"}}>
                    <Card style={{height:"350px"}} className="m-1">
                        Graph Points
                    </Card>
                    <Row className="ml-1">
                        <Col sm={11}>
                            <Pagination className="mb-1">
                                <Pagination.Item active>1D</Pagination.Item>
                                <Pagination.Item>1W</Pagination.Item>
                                <Pagination.Item>1M</Pagination.Item>
                                <Pagination.Item>1Y</Pagination.Item>
                                <Pagination.Item>5Y</Pagination.Item>
                            </Pagination>
                        </Col>
                        <Col className="float-right">Eye</Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default stockGraph;
