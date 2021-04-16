import { React, Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

import { Card, ListGroup, Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class stocksFilter extends Component {
  state = {
    cmpUl: 10000,
    cmpLl: 0,
    sectors: {
      All: true,
      'Basic Materials': false,
      'Communication Services': false,
      'Consumer Cyclical': false,
      'Consumer Defensive': false,
      Energy: false,
      'Financial Services': false,
      Healthcare: false,
      Industrials: false,
      Other: false,
      'Real Estate': false,
      Technology: false,
      Utilities: false,
      length: 1,
    },
    mcUl: 10000,
    mcLl: 0,
  };
  componentDidUpdate() {
    const stockFilters = {
      cmpUl: this.state.cmpUl,
      cmpLl: this.state.cmpLl,
      sectors: this.state.sectors,
      mcUl: this.state.mcUl,
      mcLl: this.state.mcLl,
    };
    this.props.setFilters(stockFilters);
  }
  render() {
    const handleCheck = (event) => {
      event.preventDefault();
      const id = event.target.id;
      let currentSectors = this.state.sectors;
      let length = this.state.sectors['length'];
      if (event.target.value === 'on') {
        if (currentSectors[id] === true) {
          currentSectors[id] = false;
          currentSectors['length'] = length - 1;
        } else {
          currentSectors[id] = true;
          currentSectors['length'] = length + 1;
        }
        this.setState({ sectors: currentSectors });
      } else {
        currentSectors[id] = false;
        currentSectors['length'] = length - 1;
        this.setState({ sectors: currentSectors });
      }
    };
    return (
      <div>
        <Card className="shadow-sm">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h6 className="font-weight-bold float-left m-0 text-info">
                Apply Filters
              </h6>
              {/* <Badge pill variant="info" className="float-right mt-2">
                                Apply Filters
                            </Badge> */}
            </ListGroup.Item>
            <ListGroup.Item>
              <div
                className="text-center text-secondary m-1"
                style={{ fontSize: '0.75rem' }}
              >
                SECTORS
              </div>
              <div>
                <Form.Check
                  inline
                  label="All"
                  type={'checkbox'}
                  id={'All'}
                  defaultChecked
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Basic Materials"
                  type={'checkbox'}
                  id={'Basic Materials'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Communication Services"
                  type={'checkbox'}
                  id={'Communication Services'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Consumer Cyclical"
                  type={'checkbox'}
                  id={'Consumer Cyclical'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Consumer Defensive"
                  type={'checkbox'}
                  id={'Consumer Defensive'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Energy"
                  type={'checkbox'}
                  id={'Energy'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Financial Services"
                  type={'checkbox'}
                  id={'Financial Services'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Healthcare"
                  type={'checkbox'}
                  id={'Healthcare'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Industrials"
                  type={'checkbox'}
                  id={'Industrials'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Other"
                  type={'checkbox'}
                  id={'Other'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Real Estate"
                  type={'checkbox'}
                  id={'Real Estate'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Technology"
                  type={'checkbox'}
                  id={'Technology'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
              <div>
                <Form.Check
                  inline
                  label="Utilities"
                  type={'checkbox'}
                  id={'Utilities'}
                  onChange={(event) => handleCheck(event)}
                />
              </div>
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
