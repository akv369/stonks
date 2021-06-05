import { React, Component } from 'react';
import Axios from '../../axios-base';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataNull from '../../components/dataNull/dataNull';

class Updation extends Component {
  state = {
    message: '',
  };
  componentDidMount() {
    const item = window.location.pathname.split('/')[2];
    if (item === 'site')
      Axios.get('/updatestocks')
        .then((res) => this.setState({ message: res.data }))
        .catch((err) => this.setState({ message: err }));
    else if (item === 'portfolio')
      Axios.get('/updateportfolios')
        .then((res) => this.setState({ message: res.data }))
        .catch((err) => this.setState({ message: err }));
  }
  render() {
    return (
      <div>
        <DataNull tip={this.state.message} />
      </div>
    );
  }
}

export default Updation;
