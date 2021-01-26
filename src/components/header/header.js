import {React, Component} from 'react';

class header extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div>
                Header
            </div>
        );
    }
}

export default header;
