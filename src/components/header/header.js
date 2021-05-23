import { React, Component } from 'react';
import firebase from '../../firebase';
import Axios from '../../axios-base';
import imgPath from '../../data/logo.png';

import { Navbar, Form, Button, FormControl, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchSuggestions from './searchSuggestions';
import { Link, Redirect } from 'react-router-dom';

import './header.css';

class header extends Component {
  state = {
    query: '',
    nameArr: [],
    codeArr: [],
    path: '/',
    navLinks: [
      {
        name: 'Dashboard',
        path: '/dashboard',
      },
      {
        name: 'Orders',
        path: '/orders',
      },
      {
        name: 'Watchlist',
        path: '/watchlist',
      },
    ],
  };
  handleSearch = (event) => {
    this.setState({ query: event.target.value }, () => {
      if (this.state.query && this.state.query.length > 2) {
        Axios.get('/search/' + this.state.query).then((response) => {
          this.setState({
            nameArr: response.data.nameArr,
            codeArr: response.data.codeArr,
          });
        });
      } else this.setState({ nameArr: [], codeArr: [] });
    });
  };
  handleSuggestionClick = (stockCode) => {
    console.log(stockCode)
    this.setState({
      query: '',
      nameArr: [],
      codeArr: [],
    },()=>{
      <Redirect to={`/stock/${stockCode}`}/>
    });
  };
  googleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Axios.post('/logout').then((resp) => {
          console.log(resp.data);
        });
        window.location.replace('/login');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };
  render() {
    const path = this.state.path;
    function checkActive(linkName) {
      if (path === linkName) return 'navLink active';
      return 'navLink';
    }
    return (
      <div className="nav-container">
        <Navbar variant="light">
          <Navbar.Brand>
            <Link
              to="/"
              className={checkActive('/')}
              onClick={() => this.setState({ path: '/' })}
            >
              <Image
                src={imgPath}
                style={{ width: '24px', height: '24px', marginRight: '10px' }}
                roundedCircle
              />
              Stonks
            </Link>
          </Navbar.Brand>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search Stocks"
              className="shadow-sm"
              style={{ width: '300px' }}
              onChange={this.handleSearch}
            />
            <SearchSuggestions
              codeArr={this.state.codeArr}
              nameArr={this.state.nameArr}
              clicked={(stockCode) => this.handleSuggestionClick(stockCode)}
            />
          </Form>
          {this.state.navLinks.map((navLink, index) => {
            return (
              <Link
                to={navLink.path}
                className={checkActive(navLink.path)}
                onClick={() => this.setState({ path: navLink.path })}
                key={index}
              >
                {navLink.name}
              </Link>
            );
          })}
          <Button variant="outline-dark" onClick={() => this.googleLogout()}>
            Log Out
          </Button>
        </Navbar>
      </div>
    );
  }
}

export default header;
