import { React, Component } from 'react';
import firebase from '../../firebase';
import Axios from '../../axios-base';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SearchSuggestions from './searchSuggestions';
import imgPath from '../../data/logo.png';

import './header.css';
import { Navbar, Form, Button, FormControl, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class header extends Component {
  state = {
    query: '',
    results: [],
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
  componentDidMount(){
    this.setState({path:window.location.pathname})
  }
  handleSearch = (event) => {
    this.setState({ query: event.target.value }, () => {
      if (this.state.query && this.state.query.length > 2) {
        Axios.get('/search/' + this.state.query).then((response) => {
          this.setState({
            results: response.data,
          });
        });
      } else this.setState({ results: []});
    });
  };
  logoutUser = () => {
    if(this.props.user.provider==='google.com')this.googleLogout();
    else window.location.replace('/login');
  }
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
            <SearchSuggestions data={this.state.results} />
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
          <Button variant="outline-dark" onClick={() => this.logoutUser()}>
            Log Out
          </Button>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.SET_USER.currentUser,
  };
};

export default connect(mapStateToProps)(header);
