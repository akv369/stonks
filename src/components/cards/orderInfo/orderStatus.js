import {React, Component} from 'react';

import { Card, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class beySellPanel extends Component{
    componentDidMount() {
       console.log('Buy Sell Panel');
    }
    render(){
        return (
            <div style={{width:"36rem"}}>
                <span className="font-weight-bold text-muted" style={{fontSize:"1.2rem"}}>Order Status</span>
                <span className="float-right text-success">Successful ⬤</span>
                <div className="ml-4">
                    <div className="mt-2">
                        <div className="m-1">
                            <span className="text-success">⬤ </span> 
                            <span className="m-1"> User Request Verified</span>
                        </div>
                        <div className="ml-4 text-muted" style={{fontSize:"0.8rem"}}>
                            <span className="m-1">
                                06:35 PM IST | 07 February 2021
                            </span>
                            <span className="m-1 float-right">
                                User ID: 258963147536987125
                            </span>
                        </div>
                        <div className="m-1">
                            <span className="text-success">⬤ </span> 
                            <span className="m-1"> Order Place</span>
                        </div>
                        <div className="ml-4 text-muted" style={{fontSize:"0.8rem"}}>
                            <span className="m-1">
                                06:35 PM IST | 07 February 2021
                            </span>
                            <span className="m-1 float-right">
                                Order ID: 1354861
                            </span>
                        </div>
                        <div className="m-1">
                            <span className="text-success">⬤ </span> 
                            <span className="m-1"> Order Executed</span>
                        </div>
                        <div className="ml-4 text-muted" style={{fontSize:"0.8rem"}}>
                            <span className="m-1">
                                06:35 PM IST | 07 February 2021
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default beySellPanel;
