import {React, Component} from 'react';
import { connect } from 'react-redux';
import Axios from '../../axios-base'

import * as actionTypes from '../../store/actions';
import imgPath from '../../data/click.png'

import { Card, Nav, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class buySellPanel extends Component{
    state={
        hash: 'Buy',
        buttonDisabled: true,
        order: 'Market',
        type: 'Delivery',
        shares: 0,
        price: this.props.buySell.cmp
    }
    componentDidUpdate(){
        if(this.state.price===undefined)this.setState({price:this.props.buySell.cmp})
        const balance = Number(this.props.userBalance);
        const price = Number(this.state.price);
        const shares = Number(this.state.shares);
        if(this.state.hash==='Buy'&&shares>0){
            if(balance>=price*shares && this.state.buttonDisabled){
                this.setState({buttonDisabled:false})
            }
            if(balance<price*shares && !this.state.buttonDisabled){
                this.setState({buttonDisabled:true})
            }
        }
        else{
            console.log('Sell')
        }
    }
    render(){
        let placeOrder = () => {
            const sendData = {
                userID: this.props.userID,
                code: this.props.buySell.companySymbol,
                orderPrice: this.state.price,
                quantity: this.state.shares,
                type: this.state.hash,
                order: this.state.order,
                subType: this.state.type,
                balanceBeforeTransaction: this.props.userBalance
            }
            Axios.post('/order',sendData).
            then(response=>console.log(response)).
            catch(err=>console.log(err));
        }
        const formPrice = () => {
            if(this.state.order==='Market')
                return <span style={{fontSize:'1.5rem'}} >${this.props.buySell.cmp}</span>
            else 
                return <Form.Control type="number" step=".01" min="0.01" onChange={(e) => this.setState({price:e.target.value})}/>
        }
        let renderer = this.props.buySell.cmp===undefined ?
        <div style={{height:'450px'}}>
            <Card.Header>Invest in a Stock</Card.Header>
            <Card.Body>
                <Card.Title className="mb-3 mt-3 text-center">
                    <img 
                    src={imgPath}
                    style={{width:'50%'}}/>
                    <div className="mt-5">
                        Click on a stock to see investing options.
                    </div>
                </Card.Title>
                <Card.Text>
                    <hr className="text-muted"/>
                    <div 
                        className="float-right mb-4 text-muted" 
                        style={{fontSize:"0.8rem"}}> 
                            Balance: $0 
                    </div>
                </Card.Text>
            </Card.Body>
        </div> :
        <div>
            <Card.Header>
                <Nav justify variant="tabs" defaultActiveKey="#buy">
                    <Nav.Item>
                        <Nav.Link href="#buy" onClick={(e)=>this.setState({hash:'Buy'})}>Buy</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#sell" onClick={(e)=>this.setState({hash:'Sell'})}>Sell</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Card.Title className="mb-4">{this.props.buySell.companyName}</Card.Title>
                <Card.Text>
                    <div className="m-2">
                        <Form>
                            <Form.Group as={Row} controlId="formGridState">
                                <Col sm={6}>
                                    <Form.Label>Type</Form.Label>
                                </Col>
                                <Col sm={6}>
                                    <Form.Control as="select">
                                        <option onClick={(e) => this.setState({type:'Delivery'})}>Delivery</option>
                                        <option onClick={(e) => this.setState({type:'Intraday'})}>Intraday</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="m-2">
                        <Form>
                            <Form.Group as={Row} controlId="formGridState">
                                <Col sm={6}>
                                    <Form.Label>Order</Form.Label>
                                </Col>
                                <Col sm={6}>
                                    <Form.Control as="select">
                                        <option onClick={(e) => this.setState({order:'Market'})}>Market</option>
                                        <option onClick={(e) => this.setState({order:'Limit'})}>Limit</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="m-2">
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column sm="6">
                                    Shares
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="number" min="1" onChange={(e) => this.setState({shares:e.target.value})}/>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="m-2">
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column sm="6">
                                    Price
                                </Form.Label>
                                <Col sm="6" className="text-center">
                                    {formPrice()}
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <hr className="text-muted"/>
                    <div 
                        className="float-right mb-4 text-muted" 
                        style={{fontSize:"0.8rem"}}> 
                            Balance: ${this.props.userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                </Card.Text>
                <Button 
                    variant="info" 
                    disabled={this.state.buttonDisabled}
                    style={{width:"100%"}}
                    onClick={placeOrder}>
                        {this.state.hash}
                </Button>
            </Card.Body>
        </div>;
        return (
            <div style={{width:"300px"}} className="shadow-sm">
                <Card>
                    {renderer}
                </Card>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        buySell: state.BUY_SELL.stock,
        userBalance: state.SET_USER.currentUser.balance,
        userID: state.SET_USER.currentUser._id
    }
};
  
const mapDispatchToProps = dispatch => {
    return null;
};
  
export default connect(mapStateToProps, mapDispatchToProps)(buySellPanel);
