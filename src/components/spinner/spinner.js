import {React, Component} from 'react';

import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './spinner.css'

class SpinnerLarge extends Component{
    render(){
        return (
            <div className="spinner">
                <Spinner animation="grow" variant="info" size="lg"/>
            </div>
        );
    }
}

export default SpinnerLarge;
