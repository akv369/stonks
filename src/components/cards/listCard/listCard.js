import { React, Component } from 'react';

import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Axios from '../../../axios-base';
import ApexCharts from 'react-apexcharts';
import Spinner from '../../spinner/spinner'

class listCard extends Component {
  state = {
    fetching: true,
    series: [
      {
        name: 'sales',
        data: [
          {
            x: '',
            y: 0,
          },
        ],
      },
    ],
    options: {
      chart: {
        type: 'area',
        zoom: {
          enabled: false,
        },
      },
      grid: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: 1,
      },
      xaxis: {
        type: 'datetime',
        labels: {
          show: false
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
          show: false,
      },
      },
      legend: {
        show: false
      },
    },
  };
  componentDidMount() {
    const stocks = this.props.portfolio.stocks;
    stocks.map((stock) => {
      Axios.get(`/weekgraph/${stock.code}`)
        .then((res) => {
          let newSeries = this.state.series;
          newSeries[0].data = res.data.coordinate;
          this.setState({ series: newSeries,fetching:false });
        })
        .catch((err) => console.log(err));
    });
  }

  render() {
    const portfolio = this.props.portfolio;
    const renderer = () => {
      const stocks = portfolio.stocks;
      return stocks.map((stock) => {
        let companyName = stock.name,
          quantity = stock.quantity,
          avg = stock.averagePrice;
        companyName =
          companyName.length > 20
            ? companyName.slice(0, 16) + '...'
            : companyName;
        const investedValue = stock.value;
        let investedPercent = (investedValue / portfolio.investedValue) * 100;
        investedPercent = investedPercent.toFixed(2);
        const returns = stock.returns,
          returnsPercent = stock.returnsPercent;
        const returnsColor = returns <= 0 ? 'danger' : 'success';
        const graphColor = 'success',
          hrefLink = '/stock/' + stock.code;
        return (
          <div key={stock.code}>
            <ListGroup.Item>
              <Row>
                <Col sm={3}>
                  <Link to={hrefLink}>{companyName}</Link>
                  <div style={{ fontSize: '0.75rem' }}>
                    {quantity} shares @{avg}
                  </div>
                </Col>
                <Col sm={5}>{
                  this.state.fetching ? <Spinner/> : (
                    <div className={'text-' + graphColor} id="chart">
                      <ApexCharts
                        style={{height:'40px', position: 'absolute',top: '-40px'}}
                        options={this.state.options}
                        series={this.state.series}
                        type="area"
                        height={100}
                        width={255}
                      />
                    </div>)
                }
                </Col>
                <Col sm={2}>
                  ${investedValue}
                  <div
                    className="text-secondary"
                    style={{ fontSize: '0.75rem' }}
                  >
                    {investedPercent}%
                  </div>
                </Col>
                <Col sm={2}>
                  ${returns}
                  <div
                    className={'text-' + returnsColor}
                    style={{ fontSize: '0.75rem' }}
                  >
                    {returnsPercent}%
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          </div>
        );
      });
    };
    return (
      <div>
        <Card>
          <ListGroup variant="flush">{renderer()}</ListGroup>
        </Card>
      </div>
    );
  }
}

export default listCard;
