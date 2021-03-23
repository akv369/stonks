import {React, Component} from 'react';
import {connect} from 'react-redux'

import * as actionTypes from '../../store/actions'

import {Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class pageNumbers extends Component{
    state={
        currentPage: 1,
        stockPerPage: 8,
        lastPage: 1
    }
    componentDidMount() {
        this.setState({
            currentPage: this.props.pageDetails.currentPage,
            stockPerPage: this.props.pageDetails.stockPerPage,
            lastPage: this.props.pageDetails.lastPage
        })
    }
    componentDidUpdate(){
        if(this.state.currentPage!==this.props.pageDetails.currentPage){
            const pageDetails={
                currentPage: this.state.currentPage,
                stockPerPage: this.state.stockPerPage,
                lastPage: this.state.lastPage
            }
            this.props.setPagination(pageDetails);
        }
    }
    render(){
        const currentPage=this.state.currentPage;
        const lastPage=this.state.lastPage;
        return (
            <div className="mt-3">
                <Pagination>
                    <Pagination.First disabled={currentPage!==1 ? false:true} onClick={()=>this.setState({currentPage:1})}/>
                    <Pagination.Prev disabled={currentPage!==1 ? false:true} onClick={()=>this.setState({currentPage:currentPage-1})}/>
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next disabled={currentPage!==lastPage ? false:true} onClick={()=>this.setState({currentPage:currentPage+1})}/>
                    <Pagination.Last disabled={currentPage!==lastPage ? false:true} onClick={()=>this.setState({currentPage:lastPage})}/>
                </Pagination>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(pageNumbers);
