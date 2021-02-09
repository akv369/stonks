import {React, Component} from 'react';

import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class companyOverview extends Component{
    componentDidMount() {
       console.log('response.data');
    }
    render(){
        return (
            <div className="m-2">
                <h3 className="pt-3">Company Statistics</h3>
                    <Row className="mt-1">
                        <Col>
                            <div>Market Cap</div>
                            <div style={{fontSize:"1.25rem"}}>$336.51 bn</div>
                        </Col>
                        <Col>
                            <div>P/B Ratio</div>
                            <div style={{fontSize:"1.25rem"}}>0.99</div>
                        </Col>
                        <Col>
                            <div>P/E Ratio</div>
                            <div style={{fontSize:"1.25rem"}}>9.11</div>
                        </Col>
                        <Col>
                            <div>Industry P/E</div>
                            <div style={{fontSize:"1.25rem"}}>98.11</div>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <div>Div. Yield</div>
                            <div style={{fontSize:"1.25rem"}}>0.665%</div>
                        </Col>
                        <Col>
                            <div>Book Value</div>
                            <div style={{fontSize:"1.25rem"}}>$26.06</div>
                        </Col>
                        <Col>
                            <div>EPS(TTM)</div>
                            <div style={{fontSize:"1.25rem"}}>$2.83</div>
                        </Col>
                        <Col>
                            <div>ROE</div>
                            <div style={{fontSize:"1.25rem"}}>10.84%</div>
                        </Col>
                    </Row>
                <h3 className="pt-3">About the Company</h3>
                <p className="text-justify" style={{fontSize:"0.9rem"}}>
                    International Business Machines Corporation provides integrated solutions and services worldwide. Its Cloud & Cognitive Software segment offers software for vertical and domain-specific solutions in health, financial services, and Internet of Things (IoT), weather, and security software and services application areas; and customer information control system and storage, and analytics and integration software solutions to support client mission critical on-premise workloads in banking, airline, and retail industries. It also offers middleware and data platform software, including Red Hat that enables the operation of clients' hybrid multi-cloud environments; and Cloud Paks, WebSphere distributed, and analytics platform software, such as DB2 distributed, information integration, and enterprise content management, as well as IoT, Blockchain and AI/Watson platforms. The company's Global Business Services segment offers business consulting services; system integration, application management, maintenance, and support services for packaged software; finance, procurement, talent and engagement, and industry-specific business process outsourcing services; and IT infrastructure and platform services. Its Global Technology Services segment provides project, managed, outsourcing, and cloud-delivered services for enterprise IT infrastructure environments; and IT infrastructure support services. The company's Systems segment offers servers for businesses, cloud service providers, and scientific computing organizations; data storage products and solutions; and z/OS, an enterprise operating system, as well as Linux. Its Global Financing segment provides lease, installment payment, loan financing, short-term working capital financing, and remanufacturing and remarketing services. The company was formerly known as Computing-Tabulating-Recording Co. The company was founded in 1911 and is headquartered in Armonk, New York.
                </p>
                <Row className="mt-1">
                        <Col>
                            <div>Exchange</div>
                            <div style={{fontSize:"1.25rem"}}>NYSE</div>
                        </Col>
                        <Col>
                            <div>Sector</div>
                            <div style={{fontSize:"1.25rem"}}>Technology</div>
                        </Col>
                        <Col>
                            <div>Industry</div>
                            <div style={{fontSize:"1.25rem"}}>Information Technology</div>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default companyOverview;
