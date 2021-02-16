import {React, Component} from 'react';

import { Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class homeCard extends Component{
    render(){
        let cardWidth= this.props.category==='index'?'21.5rem':this.props.category==='news'?'21rem':'33rem';
        return (
            <div>
                    <Card style={{ width: cardWidth }} className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Reliance Industries</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">RIL</Card.Subtitle>
                            <Card.Text>
                                All the graph points fetched would make up a graph here.
                            </Card.Text>
                            <Card.Text className={"mb-sm-0"}>
                                CMP
                            </Card.Text>
                            <Card.Link href="#" className="text-danger">DC(%DC)</Card.Link>
                        </Card.Body>
                    </Card>
            </div>
        );
    }
}

export default homeCard;
