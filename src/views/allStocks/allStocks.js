import { React, Component } from 'react';
import queryString from 'query-string';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import Axios from '../../axios-base';

import ListCard from '../../components/cards/stockList/listCard';
import StocksFilter from '../../components/stocksFilter/stocksFilter';
import PageNumbers from '../../components/PageNumbers/PageNumbers';
import Spinner from '../../components/spinner/spinner';
import DataNull from '../../components/dataNull/dataNull';

import 'bootstrap/dist/css/bootstrap.min.css';

class allStocks extends Component {
  state = {
    stockFilters: {
      cmpUl: 10000,
      cmpLl: 0,
      sectors: {
        All: false,
      },
      mcUl: 10000,
      mcLl: 0,
    },
    pageDetails: {
      currentPage: 1,
      stocksPerPage: 8,
      lastPage: 1,
    },
    defaultTrue: '',
    fetching: true,
    fetchingAgain: false,
  };
  componentDidMount() {
    let currentFilters = this.state.stockFilters;
    const paramSect = queryString.parse(this.props.location.search);
    const defaultTrue = paramSect.sector ? paramSect.sector : 'All';
    currentFilters.sectors[defaultTrue] = true;
    this.setState({ stockFilters: currentFilters, defaultTrue: defaultTrue });
    Axios.post('/allStocks', currentFilters)
      .then((response) => {
        if (response.data === 'Data Unavailable')
          this.setState({ dataNull: true, fetching: false });
        else {
          let label = Math.round(response.data.length / 8);
          if (label < response.data.length / 8) label += 1;
          this.setState({
            filteredStocks: response.data,
            pageDetails: {
              ...this.state.pageDetails,
              lastPage: label,
            },
            fetching: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const handleFetch = (stockFilters) => {
      this.setState({
        stockFilters: stockFilters,
        fetchingAgain: true,
        dataNull: false,
      });
      Axios.post('/allStocks', stockFilters)
        .then((response) => {
          if (response.data === 'Data Unavailable')
            this.setState({ dataNull: true, fetchingAgain: false });
          else {
            let label = Math.round(response.data.length / 8);
            if (label < response.data.length / 8) label += 1;
            this.setState({
              filteredStocks: response.data,
              pageDetails: {
                ...this.state.pageDetails,
                lastPage: label,
              },
              fetchingAgain: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const renderAfterFetch = () => {
      if (!this.state.fetchingAgain) {
        if (this.state.dataNull)
          return (
            <DataNull
              reason="No Stock Found :("
              tip="Try changing filters..."
            />
          );
        else
          return (
            <div>
              <ListGroup variant="flush" className="mb-1">
                <ListGroup.Item>
                  <Row>
                    <Col sm={2}>Company</Col>
                    <Col sm={2}>Price</Col>
                    <Col sm={2}>52W High</Col>
                    <Col sm={2}>52W Low</Col>
                    <Col sm={2}>Market Cap</Col>
                    <Col sm={1}>ROE%</Col>
                    <Col sm={1}>P/E</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListCard
                filteredStocks={this.state.filteredStocks}
                pageDetails={this.state.pageDetails}
              />
              <div
                className="position-fixed fixed-bottom"
                style={{ marginLeft: '820px' }}
              >
                <PageNumbers
                  pageDetails={this.state.pageDetails}
                  pageChange={(data) => this.setState({ pageDetails: data })}
                />
              </div>
            </div>
          );
      } else return <Spinner />;
    };
    return this.state.fetching ? (
      <Spinner />
    ) : (
      <div>
        <Container>
          <Row className="mt-sm-5">
            <Col sm={3}>
              <StocksFilter
                defaultTrue={this.state.defaultTrue}
                handleApply={(data) => handleFetch(data)}
              />
            </Col>
            <Col sm={9}>{renderAfterFetch()}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default allStocks;
