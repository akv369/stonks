import {React, Component} from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Axios from '../../axios-base';

class loginScreen extends Component{
    googleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) =>{
            const name=result.user.providerData[0].displayName;
            Axios.post('/login',result.user.providerData[0]).
            then(response=>{console.log(response.data)}).
            catch(err=>{console.log(err)});
            
            this.props.setUser(result.user.providerData[0]);
            // window.location.replace("/");
          })
          .catch((e) =>{
            console.log(e.message);
          });
    }
    googleLogout = () => {
        firebase.auth().signOut()
        .then(() => {
            Axios.post('/logout')
            .then(resp=>{
                console.log(resp.data);
            })
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
        return (
            <div>
                <button onClick={() => {this.googleLogin()}}>
                    Login
                </button>
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