import {React, Component} from 'react';
import { Col, Image, Row } from 'react-bootstrap';

import StonkImage from '../../data/stonkImage.png'
import LoginForm from './LoginForm';

import './loginScreen.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class loginScreen extends Component{
    render(){       
        return (
            <div className="loginScreen">
                <Row className="loginRow">
                    <Col sm={8} className="loginCol">
                        <Image src={StonkImage} className="stonkImage"/>
                    </Col>
                    <Col sm={4} className="loginCol">
                        <LoginForm/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default loginScreen;