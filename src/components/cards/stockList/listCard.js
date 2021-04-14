import {React, Component} from 'react';
import { connect } from 'react-redux';
import Axios from '../../../axios-base';

import * as actionTypes from '../../../store/actions';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class listCard extends Component{
    state = {
        filteredStocks:[],
        stockFilters:{
            cmpUl: 10000,
            cmpLl: 0,
            sectors: {},
            mcUl: 10000,
            mcLl: 0
        },
        stockPerPage:8
    }
    componentDidMount() {
        this.setState({stockFilters:this.props.stockFilters});
        Axios.post('/allStocks', this.props.stockFilters)
        .then(response => {
            let label = Math.round(response.data.length/8);
            if(label<response.data.length/8)label+=1;
            const pageDetails={
                currentPage: 1,
                stockPerPage:this.state.stockPerPage,
                lastPage: label
            }
            this.props.setPagination(pageDetails)
            this.setState({filteredStocks:response.data});
        })
        .catch(err => {
            console.log(err);
        })
    }
    componentWillUpdate() {
        let fetchAgain=false;
        if( this.state.stockFilters.cmpUl !== this.props.stockFilters.cmpUl ||
            this.state.stockFilters.cmpLl !== this.props.stockFilters.cmpLl ||
            this.state.stockFilters.mcUl !== this.props.stockFilters.mcUl ||
            this.state.stockFilters.mcLl !== this.props.stockFilters.mcLl ||
            this.state.stockFilters.sectors['length'] !== this.props.stockFilters.sectors['length']
        ){ fetchAgain=true;}

        if(fetchAgain){
            fetchAgain=false;
            this.setState(
                {stockFilters:this.props.stockFilters},
                ()=>{
                    Axios.post('/allStocks', this.props.stockFilters)
                    .then(response => {
                        let label = Math.round(response.data.length/8);
                        if(label<response.data.length/8)label+=1;
                        const pageDetails={
                            currentPage: 1,
                            stockPerPage:this.state.stockPerPage,
                            lastPage: label
                        }
                        this.props.setPagination(pageDetails)
                        this.setState({filteredStocks:response.data});
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            );
        }
    }
    render(){
        let displayCard = () => {
            let filteredStocks = this.state.filteredStocks;            
            const currentPage = this.props.pageDetails.currentPage;
            const stockPerPage = this.props.pageDetails.stockPerPage;
            const start = (currentPage-1) * stockPerPage;
            const end = start + stockPerPage;
            let i=-1;
            return(
            filteredStocks.map(stock => {
                i++;
                if(i>=start&&i<end){
                const _200dma = stock['_200dma'], _52wh = stock['_52wh'], _52wl = stock['_52wl'];
                let name = stock['name'], marketCap = stock['marketCap'], roe = stock['roe'], pe =stock['peRatio'];
                const _200dmaColour = ((Number(_52wh)+Number(_52wl))/2)>Number(_200dma) ? "danger" : "success";
                const roeColour = Number(roe)<5 ? "danger" : "success";
                const refLink = '/stock/'+stock['code'];
                if(name.length>25)name=name.slice(0,19)+'...';
                return(
                    <div>
                    <ListGroup.Item>
                        <Row>
                            <Col sm={2} 
                                className="text-info"
                                style={{fontSize:"0.85rem"}}>
                                    <Link to={refLink}>
                                        {name}
                                    </Link>
                            </Col>
                            <Col sm={2} className={"text-" + _200dmaColour}>
                                ${_200dma}
                            </Col>
                            <Col sm={2}>
                                ${_52wh}
                            </Col>
                            <Col sm={2}>
                                ${_52wl}
                            </Col>
                            <Col sm={2}>
                                ${marketCap}
                            </Col>
                            <Col sm={1} 
                                className={"text-" + roeColour + " font-weight-bold"} 
                                style={{fontSize:"0.85rem"}}>
                                {roe}
                            </Col>
                            <Col sm={1} style={{fontSize:"0.85rem"}}>
                                {pe}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    </div>
                )}
            }))
        }
        return (
            <div>
                <Card>
                    <ListGroup variant="flush">
                        {displayCard()}
                    </ListGroup>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        stockFilters: state.SET_STOCK_FILTERS.stockFilters,
        pageDetails: state.SET_PAGE_DETAILS.pageDetails
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        setPagination: (pageDetails) => dispatch({type: actionTypes.SET_PAGE_DETAILS, pageDetails: pageDetails})
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(listCard);
