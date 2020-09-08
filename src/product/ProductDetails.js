import React, { Component } from 'react'
import { productService } from "./service";
import { Card, CardBody, Col, Row } from "reactstrap";

export default class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        console.log(this.props.location, "id location")
        let  uuid = this.props.location.state;
        console.log(uuid, "uuid")
        if (!uuid) {
            window.location.href= "/#/list"
            return;
        }

        let url = `/api/products/${uuid.uid}`
        productService.getApiData(url)
            .then(resp => {
                this.setState({
                    data : resp
                })
            })
    }

    render() {
        let item = this.state.data && this.state.data[0] || {};
        return (
            <div>
                <Row className="justify-content-center mx-0 py-3">
                    <Col xs={12} lg={7}>
                        <div className="py-2 font-size-18">
                            <b>{item.Name}</b>
                        </div>   
                        <Card key={"ajlkhsfdk"} className="rounded">
                                    <CardBody>
                                        <img src={item.Image} alt="" max-width="400" />                                        
                                        <div>
                                            Type: <b>{item.Type}</b>
                                        </div>

                                        <div>
                                            Price: <b>{item.Price}</b>
                                        </div>

                                        <div>
                                            Category: <b>{item.Category}</b>
                                        </div>

                                        <div>
                                            Manufacturer: <b>{item.Manufacturer}</b>
                                        </div>

                                        <div>
                                            Quantity: <b>{item.Category}</b>
                                        </div>

                                        <div>
                                            Seller: <b>{item.Category}</b>
                                        </div>

                                        <div>
                                            Tax: <b>{item.Category}</b>
                                        </div>
                                        <div>
                                            {item.Description}
                                        </div>
                                    </CardBody>
                                </Card>
                        </Col>
                </Row>
                
            </div>
        )
    }
}
