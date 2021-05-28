import { React, Component } from 'react';

import { Card, Badge, ListGroup, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class orderFilter extends Component {
  state = {
    type: this.props.filters.type,
    status: this.props.filters.status,
  };
  render() {
    const typeBox = ['Buy', 'Sell'];
    const statusBox = [
      {
        name: 'Successful',
        class: 'success',
      },
      {
        name: 'In Progress',
        class: 'warning',
      },
      {
        name: 'Unsuccessful',
        class: 'danger',
      },
    ];
    const handleApply = () => {
      const sendData = {
        type: this.state.type,
        status: this.state.status,
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
              <span className="mr-3">Type:</span>
              {typeBox.map((box) => {
                return (
                  <Form.Check
                    inline
                    label={box}
                    name="type"
                    type={'radio'}
                    id={box}
                    key={box}
                    defaultChecked={this.state.type === { box } ? true : false}
                    onChange={() => this.setState({ type: box })}
                  />
                );
              })}
            </ListGroup.Item>
            <ListGroup.Item>
              {statusBox.map((box) => {
                return (
                  <div key={box.name}>
                    <Form.Check
                      inline
                      label={box.name}
                      name="status"
                      type={'radio'}
                      id={box.name}
                      defaultChecked={
                        this.state.status === box.name ? true : false
                      }
                      onChange={() => this.setState({ status: box.name })}
                    />
                    <span className={`float-right text-${box.class}`}>⬤</span>
                  </div>
                );
              })}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default orderFilter;
