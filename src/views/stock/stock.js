import {React, Component} from 'react';
import axios from 'axios';
import ContentLoader from '../../components/contentLoader/contentLoader';

import Navbar from '../../components/header/header';
import BuySellPanel from '../../components/buySellPanel/buySellPanel';
import StockGraph from '../../components/stockPage/stockGraph';
import CompanyPerformance from '../../components/stockPage/companyPerformance';
import CompanyOverview from '../../components/stockPage/companyOverview';
import SimilarStocks from '../../components/stockPage/similarStocks';

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
        const apiKey = '&apikey=OR7C580Y9LGTY7ZE';
        const tdApiKey = '&apikey=d609067766fb4ac9bcd8a24d328d7a13';
        const stockName = this.props.match.params.stockName;
        const path = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + stockName + apiKey;
        const tdPath = 'https://api.twelvedata.com/quote?symbol=' + stockName + tdApiKey;
        /*
        axios.get('http://localhost:1111/l')*/
        let companyOverviewData = [], companyPerformanceData = [];
        const sendData = (data) => {
            this.setState({companyName:data['Name']});
            this.setState({companySymbol:data['Symbol']});

            let labelValue = data['MarketCapitalization'];
            let marketCap = 
            Number(labelValue) >= 1.0e+12
            ? Number(labelValue) / 1.0e+12 + "T"
            :   Number(labelValue) >= 1.0e+9
                ? Number(labelValue) / 1.0e+9 + "B"
                :   Number(labelValue) >= 1.0e+6
                    ? Number(labelValue) / 1.0e+6 + "M"
                    : Number(labelValue) / 1.0e+3 + "K";
            marketCap = marketCap.slice(0,5) + marketCap[marketCap.length-1];
            companyOverviewData.push(marketCap);
            companyOverviewData.push(data['PEGRatio']);
            companyOverviewData.push(data['PERatio']);
            labelValue = data['EBITDA'];
            let ebitda = 
            Number(labelValue) >= 1.0e+12 ? Number(labelValue) / 1.0e+12 + "T"
                :Number(labelValue) >= 1.0e+9 ? Number(labelValue) / 1.0e+9 + "B"
                    :Number(labelValue) >= 1.0e+6 ? Number(labelValue) / 1.0e+6 + "M"
                        :Number(labelValue) / 1.0e+3 + "K";
            ebitda = ebitda.slice(0,5) + ebitda[ebitda.length-1];
            companyOverviewData.push(ebitda);
            let divY = Number(data['DividendYield'].slice(0,5))*100;
            companyOverviewData.push(divY);
            companyOverviewData.push(data['BookValue']);
            companyOverviewData.push(data['EPS']);
            let roe = Number(data['ReturnOnEquityTTM'].slice(0,4))*100;
            companyOverviewData.push(roe);
            companyOverviewData.push(data['Description']);
            companyOverviewData.push(data['Exchange']);
            companyOverviewData.push(data['Sector']);
            companyOverviewData.push(data['Industry']);
            companyOverviewData.push(data['AssetType']);
            this.setState({overviewData:companyOverviewData});
            
            companyPerformanceData.push(data['52WeekHigh'].slice(0,7));
            companyPerformanceData.push(data['52WeekLow'].slice(0,7));
            companyPerformanceData.push(data['SharesOutstanding']);
            companyPerformanceData.push(data['200DayMovingAverage'].slice(0,7));
        }
        const sendTdData = (data) => {
            companyPerformanceData[2]=data['volume'];
            companyPerformanceData.push(data['open'].slice(0,7));
            companyPerformanceData.push(data['high'].slice(0,7));
            companyPerformanceData.push(data['low'].slice(0,7));
            companyPerformanceData.push(data['previous_close'].slice(0,7));
            this.setState({close:data['close'].slice(0,7)});
            if(isNaN(data['change'].slice(0,1)))
                this.setState({change:data['change'].slice(0,7)});
            else 
                this.setState({change:'+'+data['change'].slice(0,7), tChange:1});
            this.setState({pChange:data['percent_change'].slice(0,7)});
            this.setState({performanceData:companyPerformanceData});
        }
        axios.get(path)
         .then(response => {
           sendData(response.data);
           axios.get(tdPath).then( response => {
               sendTdData(response.data);
               this.setState({isLoading:false})
           })
        })
    }
    render(){
        const details = () => {
            if(!this.state.isLoading) return(
                <div>
                    <CompanyPerformance data={this.state.performanceData}/>
                    <CompanyOverview data={this.state.overviewData}/>
                    <SimilarStocks/>
                </div>
            )
            else return(
                <div className="mt-5"> 
                    <ContentLoader w={714} h={1000}/> 
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
                                <Col sm={1} className="bg-primary text-white ml-3">
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
                                <StockGraph/>
                            </div>
                            {details()}
                        </Col>
                        <Col sm={3}>
                            <BuySellPanel companyName={this.state.companyName}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default stock;
