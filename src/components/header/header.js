import {React, Component} from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Axios from '../../axios-base';
import imgPath from '../../data/logo.png'

import { Container, Navbar, Nav, Form, Button, FormControl, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchSuggestions from './searchSuggestions';
import { Link } from 'react-router-dom';

import './header.css';

class header extends Component{
    state = {
        query: '',
        nameArr: [],
        codeArr: []
    }
    handleSearch = (event) => {
        this.setState({ query: event.target.value }, () => {
            if (this.state.query && this.state.query.length > 2){
                Axios.get('/search/'+ this.state.query).then(
                    response => {
                        this.setState({
                            nameArr: response.data.nameArr,
                            codeArr: response.data.codeArr
                        })
                    }
                );
            }
            else this.setState({nameArr: [], codeArr: []})
        })
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
    render(){
        const activeTab=window.location.pathname;
        return (
            <div>
                <Container>
                    <Navbar variant="light" >
                        <Navbar.Brand>
                            <Link to="/" className="navLink">
                                <Image src={imgPath} style={{width:'24px',height:'24px',marginRight:'10px'}} roundedCircle />Stonks
                            </Link>
                        </Navbar.Brand>
                        <Form inline>
                            <FormControl 
                                type="text" 
                                placeholder="Search Stocks" 
                                className="shadow-sm"
                                style={{width:'300px'}} 
                                onChange={this.handleSearch}
                            />
                            <SearchSuggestions 
                                codeArr={this.state.codeArr}
                                nameArr={this.state.nameArr} />
                        </Form>
                            <Link 
                                to="/dashboard" 
                                className={activeTab==='/dashboard'?"navLink active":"navLink"} >
                                    Dashboard
                            </Link>
                            <Link 
                                to="/orders"
                                className={activeTab==='/orders'?"navLink active":"navLink"} >
                                    Orders
                            </Link>
                            <Link 
                                to="/watchlist" 
                                className={activeTab==='/watchlist'?"navLink active":"navLink"} >
                                    Watchlist
                            </Link>
                            <Button 
                                variant="outline-dark" 
                                onClick={()=>this.googleLogout()}>
                                    Log Out
                            </Button>
                    </Navbar>
                </Container>
            </div>
        );
    }
}

export default header;
