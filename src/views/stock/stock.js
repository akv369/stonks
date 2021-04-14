import {React, Component} from 'react';
import axios from '../../axios-base';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import ContentLoader from '../../components/contentLoader/contentLoader';

import Navbar from '../../components/header/header';
import BuySellPanel from '../../components/buySellPanel/buySellPanel';
import StockGraph from '../../components/stockPage/stockGraph';
import CompanyPerformance from '../../components/stockPage/companyPerformance';
import CompanyOverview from '../../components/stockPage/companyOverview';
import SimilarStocks from '../../components/stockPage/similarStocks';
import Spinner from '../../components/spinner/spinner'

import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class stock extends Component{
    state= {
        close: '',
        change: '',
        pChange : '',
        tChange : 0,
        companyName: '',
        companySymbol: '',
        overviewData: [],
        performanceData: [],
        isLoading: true
    }
    componentDidMount() {
        const stockName = this.props.match.params.stockID;
        axios.get('/stock/'+stockName).then(response => {
            if(response.data.state==='invalid') {window.location.replace("/404");}
            else {
                this.setState({
                    close: response.data.close,
                    change: response.data.change,
                    pChange: response.data.pChange,
                    tChange: response.data.tChange,
                    companyName: response.data.companyName,
                    companySymbol: response.data.companySymbol,
                    overviewData: response.data.overviewData,
                    performanceData: response.data.performanceData,
                    isLoading: false
                });
                this.props.buySell({
                    cmp: response.data.close,
                    companyName: response.data.companyName,
                    companySymbol: response.data.companySymbol
                })
            }
        })
        
    }
    render(){
        const details = () => {
            if(!this.state.isLoading) return(
                <div>
                    <CompanyPerformance data={this.state.performanceData}/>
                    <CompanyOverview data={this.state.overviewData}/>
                    <SimilarStocks sector={this.state.overviewData[10]}/>
                </div>
            )
            else return(
                <div className="mt-5"> 
                    <Spinner/>
                    {/* <div className="mb-4"><ContentLoader w={714} h={200}/></div> */}
                </div>
            )
        }
        return (
            <div>
                <Container>
                    <Navbar/>
                    <Row className="mt-5">
                        <Col sm={8}>
                            <Row>
                                <Col sm={1} className="bg-info text-white ml-3">
                                    <h1 className="mt-2 ml-1">{this.state.companyName.slice(0,1)}</h1>
                                </Col>
                                <Col sm={7}>
                                    <h3>{this.state.companyName}</h3>
                                    <h6 className="text-muted">{this.state.companySymbol}</h6>
                                </Col>
                                <Col
                                    sm={{span:3}} 
                                    className="text-right font-weight-bold ml-4">
                                    <h3>${this.state.close.slice(0,8)}</h3>
                                    <h6 className= {this.state.tChange===1 ? "text-success" : "text-danger"}>
                                        {this.state.change.slice(0,5)} ({this.state.pChange.slice(0,4)}%)
                                    </h6>
                                </Col>
                            </Row>
                            <div className="mt-4">
                                <StockGraph companyCode={this.state.companySymbol}/>
                            </div>
                        </Col>
                        <Col sm={3}>
                            <BuySellPanel/>
                        </Col>
                    </Row>
                    {details()}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(stock);
