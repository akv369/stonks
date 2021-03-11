import {React, Component} from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Axios from '../../axios-base';
import imgPath from '../../data/logo.png'

import { Container, Navbar, Nav, Form, Button, FormControl, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchSuggestions from './searchSuggestions';

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
                    <Navbar variant="light" style={{display:'flex', justifyContent:'space-between'}}>
                        <Navbar.Brand href="/" className="mr-sm-5 pr-sm-5">
                            <Image src={imgPath} style={{width:'24px',height:'24px'}} roundedCircle />{' '} Stonks
                        </Navbar.Brand>
                        <Form inline>
                            <FormControl 
                                type="text" 
                                placeholder="Search Stocks" 
                                className="shadow-sm"
                                style={{width:'300px'}} 
                                onChange={this.handleSearch}
                            />
                        </Form>
                        <Nav>
                            <Nav.Link 
                                href="/dashboard" 
                                active={activeTab==='/dashboard'?true:false} 
                                className="ml-5">
                                    Dashboard
                            </Nav.Link>
                            <Nav.Link 
                                href="/orders"
                                active={activeTab==='/orders'?true:false} 
                                className="ml-5">
                                    Orders
                            </Nav.Link>
                            <Nav.Link 
                                href="/watchlist" 
                                active={activeTab==='/watchlist'?true:false} 
                                className="ml-5">
                                    Watchlist
                            </Nav.Link>
                            <Button 
                                variant="outline-dark" 
                                className="ml-5"
                                onClick={this.googleLogout}>
                                    Log Out
                            </Button>
                        </Nav>
                    </Navbar>
                    <SearchSuggestions 
                        codeArr={this.state.codeArr}
                        nameArr={this.state.nameArr} />
                </Container>
            </div>
        );
    }
}

export default header;
