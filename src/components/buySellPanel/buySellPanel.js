import {React, Component} from 'react';
import { connect } from 'react-redux';
import Axios from '../../axios-base'

import * as actionTypes from '../../store/actions';
import imgPath from '../../data/click.png'

import Spinner from '../spinner/spinner'
import { Card, Nav, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './buySellPanel.module.css';

class buySellPanel extends Component{
    state={
        hash: 'Buy',
        buttonDisabled: true,
        order: 'Market',
        type: 'Delivery',
        shares: 0,
        price: this.props.buySell.cmp,
        loading: false,
        status:''
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
    componentWillUpdate(){
        if(this.props.buySell.cmp!==this.state.price){
            this.setState({
                hash: 'Buy',
                buttonDisabled: true,
                order: 'Market',
                type: 'Delivery',
                shares: 0,
                price: this.props.buySell.cmp,
                loading: false,
                status:''
            })
        }
    }
    render(){
        const companyCode = this.props.code, userID= this.props.userID;
        let placeOrder = () => {
            const sendData = {
                userID: userID,
                code: companyCode,
                orderPrice: this.state.price,
                quantity: this.state.shares,
                type: this.state.hash,
                order: this.state.order,
                subType: this.state.type,
                balanceBeforeTransaction: this.props.userBalance
            }
            console.log(sendData)
            Axios.post('/order',sendData).
            then(response=>{
                this.setState({loading:false, status:response.data})
            }).
            catch(err=>console.log(err));
            this.setState({loading:true})
        }
        const formPrice = () => {
            if(this.state.order==='Market')
                return <span style={{fontSize:'1.5rem'}} >${this.props.buySell.cmp}</span>
            else 
                return <Form.Control type="number" step=".01" min="0.01" onChange={(e) => this.setState({price:e.target.value})}/>
        }
        const selectAStock = () => {
            return(
                <div style={{height:'491px'}}>
                    <Card.Header>Invest in a Stock</Card.Header>
                    <Card.Body>
                        <Card.Title className="mb-3 mt-3 text-center">
                            <img 
                            src={imgPath}
                            style={{marginTop:"100px", width:'10%'}}/>
                            <div style={{marginTop:"100px"}} >
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
                </div>
            )
        }
        const orderForm = () => {
            return(
                <div style={{height:"491px"}}>
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
                        <Card.Title className="mt-3" style={{height:"50px"}}>{this.props.buySell.companyName}</Card.Title>
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
                </div>
            )
        }
        const orderVerified = () => {
            return(
                <div style={{height:'491px'}}>
                    <div className="text-center p-2">
                        <div className="my-5" style={{marginLeft: "80px"}}>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <circle className={styles.pathCircle} fill="none" stroke="#73AF55" 
                            stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                            <polyline className={styles.pathCheck} fill="none" stroke="#73AF55" 
                            stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                            </svg>
                        </div>
                        <h5 className="font-weight-bold mb-4">Order Verified Successfully</h5>
                        <p> We have have verified your order successfully.
                            Your order will get placed once markets open.
                            You can visit Orders section to monitor progress.</p>
                    </div>
                </div>
            )
        }
        const orderPlaced = () => {
            return(
                <div style={{height:'491px'}}>
                    <div className="text-center p-2">
                        <div className="my-5" style={{marginLeft: "80px"}}>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <circle className={styles.pathCircle} fill="none" stroke="#73AF55" 
                            stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                            <polyline className={styles.pathCheck} fill="none" stroke="#73AF55" 
                            stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                            </svg>
                        </div>
                        <h5 className="font-weight-bold mb-4">Order Placed Successfully</h5>
                        <p> You order has been placed successfully with exchange.
                            Your order will get executed once CMP reaches your Limit Price.
                            You can visit Orders section to monitor progress.</p>
                    </div>
                </div>
            )
        }
        const orderExecuted = () => {
            return(
                <div style={{height:'491px'}}>
                    <div className="text-center p-2">
                        <div className="my-5" style={{marginLeft: "80px"}}>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <circle className={styles.pathCircle} fill="none" stroke="#73AF55" 
                            stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                            <polyline className={styles.pathCheck} fill="none" stroke="#73AF55" 
                            stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                            </svg>
                        </div>
                        <h5 className="font-weight-bold mb-4">Order Executed Successfully</h5>
                        <p>You order has been executed successfully. You can visit Orders section for details.</p>
                    </div>
                </div>
            )
        }
        let renderer = this.state.status==="Verified" ? orderVerified() :
        this.state.status==="Placed" ? orderPlaced() :
        this.state.status==="Executed" ? orderExecuted() :
        this.state.loading===true ? <div style={{height:'491px'}}><Spinner mT="220px"/></div> :
        this.props.buySell.cmp===undefined ? selectAStock() : orderForm() ;
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
        code: state.BUY_SELL.stock.companySymbol,
        userBalance: state.SET_USER.currentUser.balance,
        userID: state.SET_USER.currentUser._id
    }
};
  
const mapDispatchToProps = dispatch => {
    return null;
};
  
export default connect(mapStateToProps, mapDispatchToProps)(buySellPanel);
