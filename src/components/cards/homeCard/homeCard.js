import { React, Component } from 'react';

import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class homeCard extends Component {
  render() {
    const name = this.props.data.name;
    const code = this.props.data.code;
    const percent = this.props.data.returnsPercent;
    const color = percent>0 ? 'success' : 'danger';
    const bgColor = percent>0 ? '#ccffb3' : '#ffad99';
    const returns = this.props.data.returns;
    return (
      <div>
        <Card style={{ width: '33rem', backgroundColor: bgColor }} className="shadow-sm">
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{code}</Card.Subtitle>
            <Card.Text>
              All the graph points fetched would make up a graph here.
            </Card.Text>
            <Card.Text className={'mb-sm-0'}>Returns</Card.Text>
            <Card.Link href="#" className={`text-${color}`}>
              {returns}{' '}({percent}%)
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default homeCard;
