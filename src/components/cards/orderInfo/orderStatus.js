import {React, Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

class orderStatus extends Component{
    render(){
        const statusColor = this.props.order['status']==="Successful" ? "success" : "warning";
        const showTime = (dated) => {
            if(dated!==undefined){
                let dd = dated.slice(8,10), MM = dated.slice(5,7), yyyy = dated.slice(0,4);
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];
                let time = dated.slice(11,19)
                const showDate = dd + ' ' + months[MM-1] + ' ' + yyyy + ' | ' + time + ' IST';
                return(showDate)
            }
        }
        return (
            <div style={{width:"36rem"}}>
                <span className="font-weight-bold text-muted" style={{fontSize:"1.2rem"}}>Order Status</span>
                <span className={"float-right text-"+statusColor}>{this.props.order['status']} ⬤</span>
                <div className="ml-4">
                    <div className="mt-2">
                        <div className="m-1">
                            <span className="text-success">⬤ </span> 
                            <span className="m-1"> User Request Verified</span>
                        </div>
                        <div className="ml-4 text-muted" style={{fontSize:"0.8rem"}}>
                            <span className="m-1">
                            {showTime(this.props.order['verifiedTimestamp'])}
                            </span>
                            <span className="m-1 float-right">
                                User ID: {this.props.order['userID']}
                            </span>
                        </div>
                        <div className="m-1">
                            <span className={"text-"+"success"}>⬤ </span> 
                            <span className="m-1"> Order Placed with {this.props.order['exchange']}</span>
                        </div>
                        <div className="ml-4 text-muted" style={{fontSize:"0.8rem"}}>
                            <span className="m-1">
                                {showTime(this.props.order['placedTimestamp'])}
                            </span>
                            <span className="m-1 float-right">
                                Order ID: {this.props.order._id}
                            </span>
                        </div>
                        <div className="m-1">
                            <span className="text-success">⬤ </span> 
                            <span className="m-1"> Order Executed</span>
                        </div>
                        <div className="ml-4 text-muted" style={{fontSize:"0.8rem"}}>
                            <span className="m-1">
                            {showTime(this.props.order['executedTimestamp'])}
                            </span>
                            <span className="m-1 float-right">
                                Total Amount: ${this.props.order['totalAmount']}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default orderStatus;
