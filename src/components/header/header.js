import {React, Component} from 'react';

import { Container, Navbar, Nav, Form, Button, FormControl, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class header extends Component{
    render(){
        const activeTab=window.location.pathname;
        return (
            <div>
                <Container>
                    <Navbar variant="light">
                        <Navbar.Brand href="/" className="mr-sm-5 pr-sm-5">
                            <Image src="../../data/logo.png" roundedCircle /> Stonks
                        </Navbar.Brand>
                        <Form inline className="pl-sm-5 ml-sm-5">
                            <FormControl 
                                type="text" 
                                placeholder="Search Stocks" 
                                className="mr-sm-5 pr-sm-5 shadow-sm" 
                            />
                        </Form>
                        <Nav className="ml-sm-5 pl-sm-4">
                            <Nav.Link 
                                href="/dashboard" 
                                active={activeTab==='/dashboard'?true:false} 
                                className="ml-sm-3">
                                    Dashboard
                            </Nav.Link>
                            <Nav.Link 
                                href="/orders"
                                active={activeTab==='/orders'?true:false} 
                                className="ml-sm-3">
                                    Orders
                            </Nav.Link>
                            <Nav.Link 
                                href="/watchlist" 
                                active={activeTab==='/watchlist'?true:false} 
                                className="ml-sm-3">
                                    Watchlist
                            </Nav.Link>
                            <Button 
                                variant="outline-dark" 
                                className="ml-sm-3">
                                    Log Out
                            </Button>
                        </Nav>
                    </Navbar>
                </Container>
            </div>
        );
    }
}

export default header;
