import {React, Component} from 'react';
import Axios from '../../axios-base';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

import Spinner from '../../components/spinner/spinner'
import Navbar from '../../components/header/header';
import ListCard from '../../components/cards/listCard/listCard';
import BuySellPanel from '../../components/buySellPanel/buySellPanel';

import {Container, Card, Row, Col, ListGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class dashboard extends Component{
    state = {
        loading: true,
        portfolio: {}
    }
    componentDidMount() {
        Axios.get('/dashboard')
        .then(res=>this.setState({portfolio:res.data, loading:false}) )
        .catch(err=>console.log(err));
    }
    render(){
        const portfolio = this.state.portfolio;
        let investedValue, returns, returnsPercent;
        if(portfolio.investedValue!==undefined){
            investedValue = portfolio.investedValue;
            returns = portfolio.totalReturns;
            returnsPercent = (returns/investedValue)*100;
        }
        const renderer = () => { 
            if(this.state.loading===true){
                return ( <div style={{height:"491px"}}><Spinner mT={"240px"}/></div> ) 
            }
            else{
                return(
                    <div>   
                        <Row>
                        <Col sm={6}>
                            <Card.Body>
                                <Card.Title>Portfolio Value</Card.Title>
                                <Card.Text>
                                    <h2>${investedValue+returns}</h2>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                        <Col sm={3}>
                            <Card.Body className="mt-3">
                                <Card.Text>
                                    Invested Value <br/>
                                    Total Returns
                                </Card.Text>
                            </Card.Body>
                        </Col>
                        <Col sm={3}>
                            <Card.Body className="mt-3">
                                <Card.Text>
                                    ${investedValue} <br/>
                                    <span className="text-success"> 
                                        ${returns} ({returnsPercent}%)
                                    </span> <br/>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Container>
                        <Card>                                    
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col sm={3}>
                                            Company Name
                                        </Col>
                                        <Col sm={5}>{' '}
                                        </Col>
                                        <Col sm={2}>
                                            Invested
                                        </Col>
                                        <Col sm={2}>
                                            Returns
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <ListCard portfolio={this.state.portfolio}/>
                    </Container>
                    <Card.Body>{' '}
                    </Card.Body>
                    </div>
                )
            }
        }
        return (
            <div>
                <Container>
                    <Navbar/>
                    <Row className="mt-sm-5">
                        <Col sm={8}>
                            <Card className="shadow-sm">
                                {renderer()}
                            </Card>
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


const mapStateToProps = state => {
    return {
        userDetails: state.SET_USER.currentUser
    }
};
  
const mapDispatchToProps = dispatch => {
    return {
        buySell: (stock) => dispatch({type: actionTypes.BUY_SELL, stock: stock})
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(dashboard);
