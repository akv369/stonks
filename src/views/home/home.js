import {React, Component} from 'react';
import {Link} from "react-router-dom";

class home extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/stocks">All Stocks</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/watchlist">WatchList</Link>
            </div>
        );
    }
}

export default home;
