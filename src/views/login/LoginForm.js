import { React, Component } from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import Axios from '../../axios-base';

import * as actionTypes from '../../store/actions';

import './loginScreen.css';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

class loginForm extends Component {
  state = {
    currentForm: 'login',
    buttonDisabled: true,
    email: '',
    name: '',
    password: '',
    message: '',
  };
  googleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        Axios.post('/login', result.user.providerData[0])
          .then((response) => {
            this.props.setUser(response.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  googleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Axios.post('/logout')
        // .then(resp=>{
        //     console.log(resp.data);
        // })
        window.location.replace('/');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };
  classicSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(/*email, password*/)
      .then((result) => {
        this.props.setUser(result.user);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };
  classicLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(/*email, password*/)
      .then((result) => {
        this.props.setUser(result.user);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };
  render() {
    const form = () => {
      if (this.state.currentForm === 'signUp') {
        return (
          <div>
            <Button
              variant="outline-info"
              onClick={() => {
                this.googleLogin();
              }}
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              SignUp With Google
            </Button>
            <div className="my-4">or be classic</div>
            <div className="classicLogin">
              <Form>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Name"
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="text-info">
                  <div className="formLinks">
                    <Button
                      variant="light"
                      className="linkButton"
                      onClick={() => this.setState({ currentForm: 'login' })}
                    >
                      Already a User?
                    </Button>
                  </div>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={this.state.buttonDisabled}
                >
                  Sign Up
                </Button>
              </Form>
            </div>
          </div>
        );
      } else if (this.state.currentForm === 'forgotPassword') {
        return (
          <div>
            <div className="my-4">
              Enter your E-mail ID here.
              <br />
              We will send a link to reset your Password.
            </div>
            <div className="classicLogin">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="text-info">
                  <div className="formLinks">
                    <Button
                      variant="light"
                      className="linkButton"
                      onClick={() => this.setState({ currentForm: 'login' })}
                    >
                      Remember Password?
                    </Button>
                  </div>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={this.state.buttonDisabled}
                >
                  Send Link
                </Button>
              </Form>
            </div>
          </div>
        );
      }
      return (
        <div>
          <Button
            variant="outline-info"
            onClick={() => {
              this.googleLogin();
            }}
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            SignIn With Google
          </Button>
          <div className="my-4">or be classic</div>
          <div className="classicLogin">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="text-info">
                <div className="formLinks">
                  <Button
                    variant="light"
                    className="linkButton"
                    onClick={() => this.setState({ currentForm: 'signUp' })}
                  >
                    New User?
                  </Button>
                  <Button
                    variant="light"
                    className="linkButton"
                    onClick={() =>
                      this.setState({ currentForm: 'forgotPassword' })
                    }
                  >
                    Forgot Password?
                  </Button>
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={this.state.buttonDisabled}
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      );
    };
    return (
      <div className="loginForm">
        <Card className="loginCard">{form()}</Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) =>
      dispatch({ type: actionTypes.SET_USER, currentUser: user }),
  };
};

export default connect(null, mapDispatchToProps)(loginForm);
