import {React, Component} from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class loginScreen extends Component{
    componentDidMount() {
        console.log(this.props.currentUser);
    }
    googleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) =>{
            console.log(result.user)
            this.props.setUser(result.user);
          })
          .catch((e) =>{
            console.log(e.message);
          });
    }
    googleLogout = () => {
        firebase.auth().signOut().then(() => {
            console.log('LoggedOut');
            window.location.replace("/login");
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
    }
    classicSignup = () => {
        firebase.auth().createUserWithEmailAndPassword(/*email, password*/)
        .then((result) => {
            this.props.setUser(result.user);
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
    }
    classicLogin = () => {
        firebase.auth().signInWithEmailAndPassword(/*email, password*/)
        .then((result) => {
            this.props.setUser(result.user);
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
    }
    render(){        
    let option = this.props.currentUser===null ?
        <button onClick={() => {this.googleLogin()}}>
            Login
        </button> :
        <button onClick={() => {this.googleLogout()}}>
            LogOut
        </button> ; 
        return (
            <div>
                {option}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.SET_USER.currentUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUser: (user) => dispatch({type: actionTypes.SET_USER, currentUser: user})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(loginScreen);