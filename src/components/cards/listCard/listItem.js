import { React, Component } from 'react';

import { Col, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Axios from '../../../axios-base';
import ApexCharts from 'react-apexcharts';

class listItem extends Component {
  state = {
    fetching: true,
    series: [
      {
        name: '',
        data: [],
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
          show: false,
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
        show: false,
      },
    },
  };
  componentDidMount() {
    Axios.get(`/weekgraph/${this.props.stockData.code}`)
      .then((res) => {
        let newSeries = this.state.series;
        newSeries[0].data = res.data.coordinate;
        this.setState({ series: newSeries, fetching: false });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const stock = this.props.stockData;
    let companyName = stock.name,
      quantity = stock.quantity,
      avg = stock.averagePrice;
    companyName =
      companyName.length > 20 ? companyName.slice(0, 16) + '...' : companyName;
    const investedValue = stock.value;
    let investedPercent = (investedValue / this.props.investedValue) * 100;
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
            <Col sm={5}>
              <div className={'text-' + graphColor} id="chart">
                <ApexCharts
                  style={{ height: '40px', position: 'absolute', top: '-40px' }}
                  options={this.state.options}
                  series={this.state.series}
                  type="area"
                  height={100}
                  width={255}
                />
              </div>
            </Col>
            <Col sm={2}>
              ${investedValue}
              <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
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
  }
}

export default listItem;
