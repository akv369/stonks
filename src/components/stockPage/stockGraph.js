import {React, Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

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
                        <Col sm={10}>
                            <Pagination className="mb-1">
                                <Pagination.Item active>1D</Pagination.Item>
                                <Pagination.Item>1W</Pagination.Item>
                                <Pagination.Item>1M</Pagination.Item>
                                <Pagination.Item>1Y</Pagination.Item>
                                <Pagination.Item>5Y</Pagination.Item>
                            </Pagination>
                        </Col>
                        <Col className="float-right text-primary ml-5" style={{fontSize:"1.4rem"}}><FontAwesomeIcon icon={faEye} /></Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default stockGraph;
