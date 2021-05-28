import { React, Component } from 'react';
import axios from '../../axios-base';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

import BuySellPanel from '../../components/buySellPanel/buySellPanel';
import StockGraph from '../../components/stockPage/stockGraph';
import CompanyPerformance from '../../components/stockPage/companyPerformance';
import CompanyOverview from '../../components/stockPage/companyOverview';
import SimilarStocks from '../../components/stockPage/similarStocks';
import Spinner from '../../components/spinner/spinner';

import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router';

class stock extends Component {
  state = {
    close: '',
    change: '',
    pChange: '',
    tChange: 0,
    companyName: '',
    companySymbol: '',
    overviewData: [],
    performanceData: [],
    isLoading: true,
  };
  componentDidMount() {
    const stockName = this.props.match.params.stockID;
    axios.get('/stock/' + stockName).then((response) => {
      this.setState({
        close: response.data.close,
        change: response.data.change,
        pChange: response.data.pChange,
        tChange: response.data.tChange,
        companyName: response.data.companyName,
        companySymbol: response.data.companySymbol,
        overviewData: response.data.overviewData,
        performanceData: response.data.performanceData,
        isLoading: false,
      });
      this.props.buySell({
        cmp: response.data.close,
        companyName: response.data.companyName,
        companySymbol: response.data.companySymbol,
      });
    });
  }
  render() {
    const renderer = () => {
      if (!this.state.isLoading)
        return (
          <Container>
            <Row className="mt-5">
              <Col sm={8}>
                <Row>
                  <Col sm={1} className="bg-info text-white ml-3">
                    <h1 className="mt-2 ml-1">
                      {this.state.companyName.slice(0, 1)}
                    </h1>
                  </Col>
                  <Col sm={7}>
                    <h3>{this.state.companyName}</h3>
                    <h6 className="text-muted">{this.state.companySymbol}</h6>
                  </Col>
                  <Col
                    sm={{ span: 3 }}
                    className="text-right font-weight-bold ml-4"
                  >
                    <h3>${this.state.close}</h3>
                    <h6
                      className={
                        this.state.tChange === 1
                          ? 'text-success'
                          : 'text-danger'
                      }
                    >
                      {this.state.change} ({this.state.pChange}%)
                    </h6>
                  </Col>
                </Row>
                <div className="mt-4">
                  <StockGraph companyCode={this.state.companySymbol} />
                </div>
              </Col>
              <Col sm={3}>
                <BuySellPanel />
              </Col>
            </Row>
            <CompanyPerformance data={this.state.performanceData} />
            <CompanyOverview data={this.state.overviewData} />
            <SimilarStocks sector={this.state.companySymbol} />
          </Container>
        );
      else return <Spinner />;
    };
    return renderer();
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buySell: (stock) => dispatch({ type: actionTypes.BUY_SELL, stock: stock }),
  };
};

export default connect(null, mapDispatchToProps)(stock);
