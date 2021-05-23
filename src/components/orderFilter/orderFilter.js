import { React, Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

import { Card, Badge, ListGroup, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class orderFilter extends Component {
  state = {
    type: 'All',
    status: 'All',
  };
  componentDidMount(){
    const type = 'All',
      status = 'All';
      const sendData = {
        type: type,
        status: status,
      };
      this.props.setFilters(sendData);
  }
  render() {
    const type = this.state.type,
      status = this.state.status;
    const handleApply = () => {
      const sendData = {
        type: type,
        status: status,
      };
      this.props.setFilters(sendData);
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
              <Form>
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                  style={{ marginBottom: '0px' }}
                >
                  <Form.Control type="text" placeholder="Stock Name" />
                </Form.Group>
              </Form>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="mr-3">Type:</span>
              <Form.Check
                inline
                label="Buy"
                type={'radio'}
                id={'buy'}
                defaultChecked={this.state.type === 'Buy' ? true : false}
                onChange={() => this.setState({ type: 'Buy' })}
              />
              <Form.Check
                inline
                label="Sell"
                type={'radio'}
                id={'sell'}
                defaultChecked={this.state.type === 'Sell' ? true : false}
                onChange={() => this.setState({ type: 'Sell' })}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                <Form.Check
                  inline
                  label="Successful"
                  type={'radio'}
                  id={'successful'}
                  defaultChecked={
                    this.state.status === 'Successful' ? true : false
                  }
                  onChange={() => this.setState({ status: 'Successful' })}
                />
                <span className="float-right text-success">⬤</span>
              </div>
              <div>
                <Form.Check
                  inline
                  label="In Progress"
                  type={'radio'}
                  id={'inProgress'}
                  defaultChecked={
                    this.state.status === 'In Progress' ? true : false
                  }
                  onChange={() => this.setState({ status: 'In Progress' })}
                />
                <span className="float-right text-warning">⬤</span>
              </div>
              <div>
                <Form.Check
                  inline
                  label="Unsuccessful"
                  type={'radio'}
                  id={'unsuccessful'}
                  defaultChecked={
                    this.state.status === 'Unsuccessful' ? true : false
                  }
                  onChange={() => this.setState({ status: 'Unsuccessful' })}
                />
                <span className="float-right text-danger">⬤</span>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (orderFilters) =>
      dispatch({
        type: actionTypes.SET_ORDER_FILTERS,
        orderFilters: orderFilters,
      }),
  };
};

export default connect(null, mapDispatchToProps)(orderFilter);
