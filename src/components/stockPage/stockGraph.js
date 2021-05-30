import { React, Component } from 'react';
import { connect } from 'react-redux';
import Axios from '../../axios-base';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Nav, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApexCharts from 'react-apexcharts';

import './stockGraph.css';

class stockGraph extends Component {
  state = {
    currentTime: '1D',
    watchlisted: false,
    _1d: [],
    _1w: [],
    _1m: [],
    fetching: true,
    series: [
      {
        data: [
          {
            x: '',
            y: [],
          },
        ],
      },
    ],
    options: {
      chart: {
        type: 'candlestick',
        height: 340,
        width: 700,
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };
  componentDidMount() {
    const watchlist = this.props.userDetails.watchlist;
    let companyCode = this.props.companyCode;
    if (companyCode === undefined)
      companyCode = window.location.pathname.split('/')[2].toUpperCase();
    Axios.get(`/graph/${companyCode}`)
      .then((res) => {
        let i = 0;
        while (i < res.data.length) {
          const item = res.data[i++];
          const updateData = [{ data: item.coordinate }];
          if (item.interval === '1day')
            this.setState({
              _1d: updateData,
              series: updateData,
              fetching: false,
            });
          else if (item.interval === '1week')
            this.setState({ _1w: updateData });
          else if (item.interval === '1month')
            this.setState({ _1m: updateData });
        }
      })
      .catch((err) => console.log(err));
    if (this.props.userDetails.watchlist) {
      for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i] === companyCode) {
          this.setState({ watchlisted: true });
        }
      }
    }
  }
  render() {
    const timeItems = ['1D', '1W', '1M'];
    const handleEye = () => {
      let companyCode = this.props.stock.companySymbol;
      let newState = this.state.watchlisted;
      newState = !newState;
      this.setState({ watchlisted: newState });
      const sendData = {
        userId: this.props.userDetails._id,
        code: companyCode,
      };
      if (newState) {
        Axios.post('/addToWatchlist', sendData).catch((response) => {
          console.log(response);
        });
      } else {
        Axios.post('/removeFromWatchlist', sendData).catch((response) => {
          console.log(response);
        });
      }
    };
    let eyeColour = this.state.watchlisted ? 'info' : 'dark';
    const handleTimeChange = (time) => {
      this.setState({ currentTime: time });
      if (time === '1D') this.setState({ series: this.state._1d });
      else if (time === '1W') this.setState({ series: this.state._1w });
      else if (time === '1M') this.setState({ series: this.state._1m });
    };

    const renderer = () => {
      return (
        <Card className="shadow-sm" style={{ height: '400px' }}>
          <Card style={{ height: '350px' }} className="m-1">
            <div id="chart">
              <ApexCharts
                options={this.state.options}
                series={this.state.series}
                type="candlestick"
                height={340}
                width={700}
              />
            </div>
          </Card>
          <Row className="ml-1">
            <Col sm={10}>
              <Nav onSelect={(selectedKey) => handleTimeChange(selectedKey)}>
                {timeItems.map((time, index) => {
                  return (
                    <Nav.Item key={index}>
                      <Nav.Link
                        active={this.state.currentTime === time ? true : false}
                        eventKey={time}
                      >
                        {time}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </Col>
            <Col sm={1} className="ml-5">
              <Button variant="white" onClick={() => handleEye()}>
                <span className={'text-' + eyeColour}>
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </Button>
            </Col>
          </Row>
        </Card>
      );
    };

    return <div>{this.state.fetching ? null : renderer()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.SET_USER.currentUser,
    stock: state.BUY_SELL.stock,
  };
};

export default connect(mapStateToProps)(stockGraph);
