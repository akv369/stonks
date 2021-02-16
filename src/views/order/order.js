import {React, Component} from 'react';
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'

import Navbar from '../../components/header/header';
import OrderDetails from '../../components/cards/orderInfo/orderDetails';
import OrderStatus from '../../components/cards/orderInfo/orderStatus';

import {Col, Container, Row, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class order extends Component{
    state={orderID:'',print:false}
    componentDidMount() {
        this.setState({orderID:this.props.match.params.orderID});
    }
    render(){
        const orderID = this.props.match.params.orderID;
        if(this.state.print){
            const domElement = document.getElementById('your-id')
            const fileName = 'Order_'+ this.state.orderID +'.pdf';
            html2canvas(domElement, { onclone: (document) => {
                document.getElementById('print-button').style.visibility = 'hidden'
            }})
            .then((canvas) => {
                const img = canvas.toDataURL('image/png')
                const pdf = new jsPdf('landscape')
                pdf.addImage(img, 'PNG', -20, -15, 330, 150)
                pdf.save(fileName);
                this.setState({print:false})
            })
        }
        return (
            <div id="your-id">
                <Navbar/>
                <Container className="mt-5">
                    <h2 className="m-3">Order #{orderID}</h2>
                    <Row className="mt-4">
                        <Col>
                            <OrderDetails orderID={orderID}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{offset:3}} className="mt-5">
                            <OrderStatus orderID={orderID}/>
                        </Col>
                    </Row>
                </Container>
                <div style={{width:'85%'}}>
                    <Button 
                        id='print-button' 
                        className = "mt-5 float-right"
                        onClick={()=>this.setState({print:true})}
                        >
                            Print Order Receipt
                    </Button>
                </div>
            </div>
        );
    }
}

export default order;
