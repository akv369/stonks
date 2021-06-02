import { React, Component } from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';
import Axios from '../../axios-base';

import * as actionTypes from '../../store/actions';

import './loginScreen.css';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

class loginForm extends Component {
  state = {
    currentForm: 'login',
    buttonDisabled: false,
    message: '',
    fields: {},
    error: { Name: false, Email: false },
    formIsValid: false,
  };
  postLogin(data) {
    this.props.setUser(data);
    const cookies = new Cookies();
    cookies.set('currentUser', data, { path: '/' });
  }
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    let error = '';
    const type = this.state.currentForm;

    if (type === 'signUp') {
      nameValidation();
      emailValidation();
      passwordValidation();
    } else if (type === 'forgotPassword') {
      emailValidation();
    } else {
      emailValidation();
      passwordValidation();
    }

    function passwordValidation() {
      if (!fields['Password']) {
        formIsValid = false;
        error = 'Password cannot be empty';
        errors['Password'] = true;
      }
    }
    function nameValidation() {
      if (!fields['Name']) {
        formIsValid = false;
        error = 'Name cannot be empty';
        errors['Name'] = true;
      }
      if (typeof fields['Name'] !== 'undefined') {
        if (!fields['Name'].match(/^[a-zA-Z]+$/)) {
          formIsValid = false;
          error = 'Only letters are allowed in name';
          errors['Name'] = true;
        }
      }
    }
    function emailValidation() {
      if (!fields['Email']) {
        formIsValid = false;
        error = 'Email cannot be empty';
        errors['Email'] = true;
      }
      if (typeof fields['Email'] !== 'undefined') {
        let lastAtPos = fields['Email'].lastIndexOf('@');
        let lastDotPos = fields['Email'].lastIndexOf('.');
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            fields['Email'].indexOf('@@') === -1 &&
            lastDotPos > 2 &&
            fields['Email'].length - lastDotPos > 2
          )
        ) {
          formIsValid = false;
          error = 'Email is not valid';
          errors['Email'] = true;
        }
      }
    }
    this.setState({ error: errors, message: error, formIsValid: formIsValid });
    return formIsValid === true ? formIsValid : error;
  }

  contactSubmit(e) {
    e.preventDefault();
    const validity = this.handleValidation();
    if (validity === true) {
      if (this.state.currentForm === 'signUp') this.classicSignup();
      else if (this.state.currentForm === 'forgotPassword')
        this.forgotPassword();
      else this.classicLogin();
    } else {
      alert(validity);
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  googleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        Axios.post('/login', result.user.providerData[0])
          .then((res) => this.postLogin(res.data))
          .catch((err) => console.log(err));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  classicSignup = () => {
    const email = this.state.fields.Email;
    const password = this.state.fields.Password;
    this.setState({ buttonDisabled: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const userData = result.user.providerData[0];
        const sendData = {
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName || this.state.fields.Name,
          photoURL: 'null',
          providerId: userData.providerId,
        };
        Axios.post('/login', sendData)
          .then((res) => this.postLogin(res.data))
          .catch((err) => console.log(err));
        return result.user.updateProfile({
          displayName: this.state.fields.Name,
        });
      })
      .catch((err) => {
        console.log(err.code);
        alert(err.message);
        this.setState({ buttonDisabled: false });
      });
  };
  classicLogin = () => {
    const email = this.state.fields.Email;
    const password = this.state.fields.Password;
    this.setState({ buttonDisabled: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const userData = result.user.providerData[0];
        const sendData = {
          email: userData.email,
        };
        Axios.post('/login', sendData)
          .then((res) => {
            this.postLogin(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.code);
        alert(err.message);
        this.setState({ buttonDisabled: false });
      });
  };
  forgotPassword = () => {
    const email = this.state.fields.Email;
    this.setState({ buttonDisabled: true });
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((result) => {
        this.setState({ currentForm: 'login' });
        alert('We have sent a reset password link on your email.');
      })
      .catch((err) => {
        console.log(err.code);
        alert(err.message);
      });
  };
  render() {
    const googleButton = () => {
      return (
        <Button
          variant="outline-info"
          onClick={() => {
            this.googleLogin();
          }}
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Continue With Google
        </Button>
      );
    };
    const textInput = (title, name) => {
      return (
        <Form.Group controlId={`formBasic${name}`}>
          <Form.Label>{title}</Form.Label>
          <Form.Control
            type={name}
            placeholder={name}
            isInvalid={this.state.error[name]}
            onChange={(e) => this.handleChange(name, e)}
          />
        </Form.Group>
      );
    };
    const actionButton = (title) => {
      return (
        <Button
          variant="primary"
          onClick={(e) => this.contactSubmit(e)}
          disabled={this.state.buttonDisabled}
        >
          {title}
        </Button>
      );
    };
    const transitionButton = (title, link) => {
      return (
        <Button
          variant="light"
          className="linkButton"
          onClick={() => this.setState({ currentForm: link })}
        >
          {title}
        </Button>
      );
    };
    const signUpForm = () => {
      return (
        <div>
          {googleButton()}
          <div className="my-4">or be classic</div>
          <div className="classicLogin">
            <Form>
              {textInput('Enter Name', 'Name')}
              {textInput('Email address', 'Email')}
              {textInput('Password', 'Password')}
              <Form.Group className="text-info">
                <div className="formLinks">
                  {transitionButton('Already a User?', 'login')}
                </div>
              </Form.Group>
              {actionButton('Sign Up')}
            </Form>
          </div>
        </div>
      );
    };
    const signInForm = () => {
      return (
        <div>
          {googleButton()}
          <div className="my-4">or be classic</div>
          <div className="classicLogin">
            <Form>
              {textInput('Email address', 'Email')}
              {textInput('Password', 'Password')}
              <Form.Group className="text-info">
                <div className="formLinks">
                  {transitionButton('New User?', 'signUp')}
                  {transitionButton('Forgot Password?', 'forgotPassword')}
                </div>
              </Form.Group>
              {actionButton('Login')}
            </Form>
          </div>
        </div>
      );
    };
    const forgotPasswordForm = () => {
      return (
        <div>
          <div className="my-4">
            Enter your E-mail ID here.
            <br />
            We will send a link to reset your Password.
          </div>
          <div className="classicLogin">
            <Form>
              {textInput('Email address', 'Email')}
              <Form.Group className="text-info">
                <div className="formLinks">
                  {transitionButton('Remember Password?', 'login')}
                </div>
              </Form.Group>
              {actionButton('Send Link')}
            </Form>
          </div>
        </div>
      );
    };
    const form = this.state.currentForm;
    return (
      <div className="loginForm">
        <Card className="loginCard">
          {form === 'signUp'
            ? signUpForm()
            : form === 'forgotPassword'
            ? forgotPasswordForm()
            : signInForm()}
        </Card>
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
