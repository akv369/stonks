import { React, Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

import { Card, ListGroup, Form, Col, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class stocksFilter extends Component {
  state = {
    cmpUl: 10000,
    cmpLl: 0,
    sectors: {
      All: false,
    },
    mcUl: 10000,
    mcLl: 0,
  };
  componentDidMount() {
    let currentSectors = this.state.sectors;
    currentSectors[this.props.defaultTrue] = true;
    this.setState({ sectors: currentSectors });
  }
  render() {
    const sectors = [
      'All',
      'Basic Materials',
      'Communication Services',
      'Consumer Cyclical',
      'Consumer Defensive',
      'Energy',
      'Financial Services',
      'Healthcare',
      'Industrials',
      'Other',
      'Real Estate',
      'Technology',
      'Utilities',
    ];
    const handleCheck = (event) => {
      event.preventDefault();
      const id = event.target.id;
      let currentSectors = this.state.sectors;
      if (event.target.value === 'on') {
        currentSectors[id] = !currentSectors[id];
        this.setState({ sectors: currentSectors });
      } else {
        currentSectors[id] = false;
        this.setState({ sectors: currentSectors });
      }
    };
    const handleApply = () => {
      const filters = {
        cmpUl: this.state.cmpUl,
        cmpLl: this.state.cmpLl,
        sectors: this.state.sectors,
        mcUl: this.state.mcUl,
        mcLl: this.state.mcLl,
      };
      this.props.handleApply(filters);
    };
    return (
      <div>
        <Card className="shadow-sm">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h6 className="font-weight-bold float-left mt-2">Filters</h6>
              <Button
                variant="white"
                className="float-right p-0"
                onClick={() => handleApply()}
              >
                <Badge pill variant="info" className="float-right mt-2">
                  Apply Filters
                </Badge>
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <div
                className="text-center text-secondary m-1"
                style={{ fontSize: '0.75rem' }}
              >
                SECTORS
              </div>
              {sectors.map((sectorName) => {
                return (
                  <div key={sectorName}>
                    <Form.Check
                      inline
                      label={sectorName}
                      type={'checkbox'}
                      id={sectorName}
                      defaultChecked={sectorName === this.props.defaultTrue}
                      onChange={(event) => handleCheck(event)}
                    />
                  </div>
                );
              })}
            </ListGroup.Item>
            <ListGroup.Item>
              <div
                className="text-center text-secondary m-1"
                style={{ fontSize: '0.75rem' }}
              >
                MARKET CAP ($BN)
              </div>
              <Form.Row>
                <Col md="5">
                  <Form.Group>
                    <Form.Control
                      type="number"
                      step=".01"
                      name="mcLl"
                      value={this.state.mcLl}
                      onChange={(event) =>
                        this.setState({ mcLl: event.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={1}>_</Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Control
                      type="number"
                      step=".01"
                      name="mcUl"
                      value={this.state.mcUl}
                      onChange={(event) =>
                        this.setState({ mcUl: event.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <div
                className="text-center text-secondary m-1"
                style={{ fontSize: '0.75rem' }}
              >
                CURRENT MARKET PRICE
              </div>
              <Form.Row>
                <Col md="5">
                  <Form.Group>
                    <Form.Control
                      type="number"
                      step=".01"
                      name="cmpLl"
                      value={this.state.cmpLl}
                      onChange={(event) =>
                        this.setState({ cmpLl: event.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={1}>_</Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Control
                      type="number"
                      step=".01"
                      name="cmpUl"
                      value={this.state.cmpUl}
                      onChange={(event) =>
                        this.setState({ cmpUl: event.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return null;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (stockFilters) =>
      dispatch({
        type: actionTypes.SET_STOCK_FILTERS,
        stockFilters: stockFilters,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(stocksFilter);
