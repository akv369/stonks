import { React, Component } from 'react';

import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Axios from '../../../axios-base';
import ApexCharts from 'react-apexcharts';

class listCard extends Component {
  state={
    series: [{
      name: 'sales',
      data: [
        {
          x: '',
          y: 0,
        },
      ],
    }],
    options: {
      chart: {
        type: 'area',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      // labels: series.monthDataSeries1.dates,
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    },
  }
  componentDidMount(){
    // console.log(this.props.portfolio.stocks)
    const stocks = this.props.portfolio.stocks;
    stocks.map(stock => {
      console.log(stock.code)
      Axios.get(`/weekgraph/${stock.code}`)
      .then(res=>{
        // console.log(res.data.coordinate)
        let newSeries = this.state.series;
        newSeries[0].data = res.data.coordinate;
        console.log(newSeries);
        // console.log()
        this.setState({series: newSeries})
      })
      .catch(err=>console.log(err))
    })
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
          returnsPercent = ((returns / investedValue) * 100).toFixed(2);
        const returnsColor = returns <= 0 ? 'danger' : 'success';
        const graphColor = 'success',
          hrefLink = '/stock/' + stock.code;
        return (
          <div>
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
                options={this.state.options}
                series={this.state.series}
                type="area"
                height={35}
                width={255}
              />
                  </div>
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
