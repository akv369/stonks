import {React, Component} from 'react';

import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class SpinnerLarge extends Component{
    render(){
        return (
            <div className="row h-100 justify-content-center" style={{marginTop:this.props.mT, marginLeft:this.props.mL}}>
                <Spinner animation="grow" variant="info" size="lg"/>
            </div>
        );
    }
}

export default SpinnerLarge;
