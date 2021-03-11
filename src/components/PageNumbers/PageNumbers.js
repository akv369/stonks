import {React, Component} from 'react';
import {connect} from 'react-redux'

import * as actionTypes from '../../store/actions'

import Pagination from 'react-bootstrap-4-pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

class pagination extends Component{
    render(){
        const currentPage=this.props.pageDetails.currentPage;
        const lastPage=this.props.pageDetails.lastPage;
        const handleChange = (page) => {
            const pageDetails={
                currentPage: page,
                lastPage: lastPage,
                stockPerPage: this.props.pageDetails.stockPerPage
            }
            this.props.setPagination(pageDetails)
        }
        const pageConfig = {
            totalPages: lastPage,
            currentPage: currentPage,
            showMax: 5,
            threeDots: true,
            prevNext: true,
            onClick: function (page) {
                handleChange(page);
           }
        };
        return (
            <div className="mt-3">
                <Pagination {...pageConfig}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pageDetails: state.SET_PAGE_DETAILS.pageDetails
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        setPagination: (pageDetails) => dispatch({type: actionTypes.SET_PAGE_DETAILS, pageDetails: pageDetails})
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(pagination);
