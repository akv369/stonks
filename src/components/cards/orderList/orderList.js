import {React, Component} from 'react';
import { connect } from 'react-redux';
import Axios from '../../../axios-base';

import * as actionTypes from '../../../store/actions';
import DateList from './dateList'

import {Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class orderList extends Component{
    state={
        filteredOrders:[]
    }
    componentDidMount() {
        Axios.get('/orders').
        then(res=>this.setState({filteredOrders:res.data})).
        catch(err=>console.log(err));
    }
    render(){
        let displayCard = () => {
            let orders = this.state.filteredOrders;     
            let dates = [];  
            let order = orders[0], nextOrder,equal,s1,s2;
            for(let i=0;i<orders.length-1;i++){
                order=orders[i];
                nextOrder = orders[i+1];
                s1=String(order['placedTimestamp']).slice(0,10);
                s2=nextOrder['placedTimestamp'].slice(0,10);
                equal = s1.toString().localeCompare(s2.toString());
                if(equal!==0)dates.push(s1)
            }
            dates.push(s2)
            console.log(dates)
            return(
                dates.map(date => {
                    let datewiseOrders=[];
                    for(let i=0;i<orders.length;i++){
                        order=orders[i];
                        s1=String(order['placedTimestamp']).slice(0,10);
                        equal = s1.toString().localeCompare(date);
                        if(equal===0)datewiseOrders.push(order)
                    }
                    const dated = String(date)
                    let dd = dated.slice(8,10), mm = dated.slice(5,7), yyyy = dated.slice(0,4);
                    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
                    const showDate = dd + ' ' + months[mm-1] + ' ' + yyyy;
                    return(
                        <div>
                            <h5 className="text-secondary my-4" >{showDate}</h5>
                            <DateList orders={datewiseOrders}/>
                        </div>
                    )
                })
            )
        }
        return (
            <div>
                {displayCard()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.SET_USER.currentUser._id
    }
};
  
const mapDispatchToProps = dispatch => {
    return {
        setPagination: (pageDetails) => dispatch({type: actionTypes.SET_PAGE_DETAILS, pageDetails: pageDetails})
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(orderList);
