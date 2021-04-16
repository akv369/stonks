import { React, Component } from 'react';
import {connect} from 'react-redux';
import Axios from '../../axios-base';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Pagination, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class stockGraph extends Component {
  state = {
    currentTime: '1D',
    watchlisted: false,
  };
  componentDidMount() {
    const watchlist = this.props.userDetails.watchlist;
    let companyCode = window.location.pathname.split('/')[2].toUpperCase();
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i] === companyCode) {
        this.setState({ watchlisted: true });
      }
    }
  }
  render() {
    const handleEye = () => {
      let companyCode = window.location.pathname.split('/')[2].toUpperCase();
      let newState = this.state.watchlisted;
      newState = !newState;
      this.setState({ watchlisted: newState });
      const sendData = {
        userId: this.props.userDetails._id,
        code: companyCode,
      };
      if (newState) {
        Axios.post('/addToWatchlist', sendData).catch((response) => {
          console.log(response);
        });
      } else {
        Axios.post('/removeFromWatchlist', sendData).catch((response) => {
          console.log(response);
        });
      }
    };
    let eyeColour = this.state.watchlisted ? 'info' : 'dark';
    return (
      <div>
        <Card className="shadow-sm" style={{ height: '400px' }}>
          <Card style={{ height: '350px' }} className="m-1">
            Graph Points
          </Card>
          <Row className="ml-1">
            <Col sm={10}>
              <Pagination className="mb-1">
                <Pagination.Item
                  active={this.state.currentTime === '1D' ? true : false}
                >
                  1W
                </Pagination.Item>
                <Pagination.Item
                  active={this.state.currentTime === '1W' ? true : false}
                >
                  1W
                </Pagination.Item>
                <Pagination.Item
                  active={this.state.currentTime === '1M' ? true : false}
                >
                  1M
                </Pagination.Item>
                <Pagination.Item
                  active={this.state.currentTime === '1Y' ? true : false}
                >
                  1Y
                </Pagination.Item>
                <Pagination.Item
                  active={this.state.currentTime === '5Y' ? true : false}
                >
                  5Y
                </Pagination.Item>
              </Pagination>
            </Col>
            <Col sm={1} className="ml-5">
              <Button variant="white" onClick={() => handleEye()}>
                <span className={'text-' + eyeColour}>
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      userDetails: state.SET_USER.currentUser
  };
};

export default connect(mapStateToProps)(stockGraph);
