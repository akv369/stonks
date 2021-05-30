import { React, Component } from 'react';
import { connect } from 'react-redux';

import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class pageNumbers extends Component {
  state = {
    currentPage: 0,
    stocksPerPage: 0,
    lastPage: 0,
  };
  componentDidMount() {
    this.setState({
      currentPage: this.props.pageDetails.currentPage,
      stocksPerPage: this.props.pageDetails.stocksPerPage,
      lastPage: this.props.pageDetails.lastPage,
    });
  }
  componentDidUpdate() {
    if (this.state.currentPage !== this.props.pageDetails.currentPage) {
      const pageDetails = {
        currentPage: this.state.currentPage,
        stocksPerPage: this.state.stocksPerPage,
        lastPage: this.state.lastPage,
      };
      this.props.pageChange(pageDetails);
    }
  }
  render() {
    const currentPage = this.state.currentPage;
    const lastPage = this.state.lastPage;
    return (
      <div className="mt-3">
        <Pagination>
          <Pagination.First
            disabled={currentPage !== 1 ? false : true}
            onClick={() => this.setState({ currentPage: 1 })}
          />
          <Pagination.Prev
            disabled={currentPage !== 1 ? false : true}
            onClick={() => this.setState({ currentPage: currentPage - 1 })}
          />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next
            disabled={currentPage !== lastPage ? false : true}
            onClick={() => this.setState({ currentPage: currentPage + 1 })}
          />
          <Pagination.Last
            disabled={currentPage !== lastPage ? false : true}
            onClick={() => this.setState({ currentPage: lastPage })}
          />
        </Pagination>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     pageDetails: state.SET_PAGE_DETAILS.pageDetails,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setPagination: (pageDetails) =>
//       dispatch({
//         type: actionTypes.SET_PAGE_DETAILS,
//         pageDetails: pageDetails,
//       }),
//   };
// };

export default connect(null, null)(pageNumbers);
