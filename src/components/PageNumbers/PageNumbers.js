import {React, Component} from 'react';

import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class stocksFilter extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div className="mt-5 ml-5 pt-5 pl-5">
                <Pagination>
                    <Pagination.First disabled/>
                    <Pagination.Prev disabled/>
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        );
    }
}

export default stocksFilter;
