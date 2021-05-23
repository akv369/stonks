import { React, Component } from 'react';
import { Col, Image, Row } from 'react-bootstrap';

import StonkImage from '../../data/stonkImage.png';
import LoginForm from './LoginForm';

import { connect } from 'react-redux';

import './loginScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router';

class loginScreen extends Component {
  render() {
    const renderLogin = () => {
      if (!this.props.isAuthenticated) {
        if (window.location.pathname !== '/') return <Redirect to="/" />;
        return (
          <div className="loginScreen">
            <Row className="loginRow">
              <Col sm={8} className="loginCol">
                <Image src={StonkImage} className="stonkImage" />
              </Col>
              <Col sm={4} className="loginCol">
                <LoginForm />
              </Col>
            </Row>
          </div>
        );
      } else {
        return <Redirect to="/" />;
      }
    };
    return <div>{renderLogin()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.SET_USER.isAuthenticated,
  };
};

export default connect(mapStateToProps)(loginScreen);
