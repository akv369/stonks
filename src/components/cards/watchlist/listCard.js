import {React, Component} from 'react';
import Axios from '../../../axios-base';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions';

import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Spinner from '../../spinner/spinner'

class listCard extends Component{
    state = {
        filteredStocks:[],
        activeButton:'',
        fetching: true
    }
    componentDidMount() {
        Axios.get('/watchlist')
        .then(response => {
            this.setState({filteredStocks:response.data, fetching:false});
        })
        .catch(err => {
            console.log(err);
        })
    }
    render(){
        let handleChange = (stock) => {
            this.setState({activeButton:stock['name']});
            this.props.buySell({
                cmp: stock['cmp'],
                companyName: stock['name'],
                companySymbol: stock['code']
            })
        }
        let displayCard = () => {
            let filteredStocks = this.state.filteredStocks;          
            let i=-1;
            return(
            filteredStocks.map(stock => {
                const _200dma = stock['cmp'], _52wh = stock['_52wh'], _52wl = stock['_52wl'];
                let name = stock['name'], marketCap = stock['marketCap'], roe = stock['roe'], pe =stock['peRatio'];
                const _200dmaColour = ((Number(_52wh)+Number(_52wl))/2)>Number(_200dma) ? "danger" : "success";
                const roeColour = Number(roe)<5 ? "danger" : "success";
                const refLink = '/stock/'+stock['code'];
                return(
                    <div>
                        <Button variant="white" style={{width:'100%', padding:"0px", border:'none', textAlign:'left'}}>
                    <ListGroup.Item 
                        variant="white"
                        onClick={()=>handleChange(stock)}>
                        <Row>
                            <Col sm={4} 
                                className="text-info"
                                style={{fontSize:"0.85rem"}}>
                                    <Link to={refLink}>
                                        {name}
                                    </Link>
                            </Col>
                            <Col sm={2} className={"text-" + _200dmaColour}>
                                ${_200dma}
                            </Col>
                            <Col sm={3}>
                                ${marketCap}
                            </Col>
                            <Col sm={3}>
                                <Row>
                                    <Col sm={6}
                                        className={"text-" + roeColour + " font-weight-bold"} 
                                        style={{fontSize:"0.85rem"}}>
                                            {roe}
                                    </Col>
                                    <Col sm={6} style={{fontSize:"0.85rem"}}>
                                        {pe}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </ListGroup.Item></Button>
                    </div>
                )
            }))
        }
        const renderer = () => {
            if(this.state.fetching)
                return <Spinner />
            else return(
                    <Card>
                        <ListGroup variant="flush">
                            {displayCard()}
                        </ListGroup>
                    </Card>
            )
        }
        return (
            <div>
                {renderer()}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(listCard);
