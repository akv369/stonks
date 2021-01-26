import {React, Component} from 'react';

class watchList extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                Watch List
            </div>
        );
    }
}

export default watchList;
