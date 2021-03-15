import {React, Component} from 'react';

import {Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class orderList extends Component{
    render(){
        
        let displayCard = () => {
            let orders = this.props.orders;     
            return(
            orders.map(order => {
                const dotColor = order['status']==='In Progress' ? 'warning' : 'success';
                const refLink = '/order/'+order['_id'];
                let time = order['placedTimestamp'].slice(11,16) + order['placedTimestamp'].slice(19,22)
                return(
                    <div>
                        <Button href={refLink} variant="white" style={{width:'100%', padding:"0px", border:'none', textAlign:'left'}}>
                            <Row>
                                <Col sm={4}>
                                    {order['name']}<br/>
                                    <div className="text-secondary" style={{fontSize:"0.75rem"}}>
                                        {order['type']} . {order['subType']}</div>
                                </Col>
                                <Col sm={3}>
                                    {order['quantity']} Shares
                                </Col>
                                <Col sm={3}>
                                    ${order['orderPrice']}
                                    <div className="text-secondary" style={{fontSize:"0.75rem"}}>{order['order']} Price</div>
                                </Col>
                                <Col sm={2}>
                                    {time}
                                    <span className={"float-right text-" + dotColor}>⬤</span>
                                </Col>
                            </Row>
                        </Button>
                        <hr style={{color:"grey"}}/>
                    </div>
                )}
            ))
        }
        return (
            <div>
                {displayCard()}
            </div>
        );
    }
}

export default orderList;
