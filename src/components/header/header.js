import {React, Component} from 'react';

import { Container, Navbar, Nav, Form, Button, FormControl, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import SearchSuggestions from './searchSuggestions';

class header extends Component{
    state = {
        query: '',
        results: [],
        alphaAPI: '&apikey=OR7C580Y9LGTY7ZE'
    }
    
    getInfo = () => {
        if(this.state.query.length>2){
        let path= 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + this.state.query + this.state.alphaAPI;
        axios.get(path).then(
            response => {
                this.setState({
                    results: response.data
                })
            }
        );
        }
        else this.setState({results: []})
    }
    
    handleSearch = (event) => {
        this.setState({ query: event.target.value }, () => {
            if (this.state.query && this.state.query.length > 1)
              this.getInfo()
        })
    }

    render(){
        const activeTab=window.location.pathname;
        return (
            <div>
                <Container>
                    <Navbar variant="light" style={{display:'flex', justifyContent:'space-between'}}>
                        <Navbar.Brand href="/" className="mr-sm-5 pr-sm-5">
                            <Image src="../../data/logo.png" roundedCircle />{' '} Stonks
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
                                className="ml-5">
                                    Log Out
                            </Button>
                        </Nav>
                    </Navbar>
                    <SearchSuggestions dataResults={this.state.results} />
                </Container>
            </div>
        );
    }
}

export default header;
