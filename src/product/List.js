import React, { Component } from 'react'
import { productService } from "./service";
import { Card, CardBody, Col, Row } from "reactstrap";


//["Category":"Toys","Type":"Handmade","Image":"http://placeimg.com/640/480/technics","Manufacturer":"Fiat","Seller":"Cremin - Crona","Quantity":11930,"Tax":0.2}]
export default class List extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let url = "/api/products"
        productService.getApiData(url)
            .then(resp => {
                this.setState({ data: resp })
            });
    }

    viewDetails = (index) => {
        this.props.history.push({
            pathname: `/listDetails`,
            state: {uid: index+1}
        })
        console.log(this.props.history, "akjshdkjasd")
    }

    render() {
        return (
            <div className="row mx-0">
                {
                    this.state.data ?
                        this.state.data.map((item, index) => (
                            <Col className="p-2">
                                <Card key={index + "ajlkhsfdk"} className="rounded cursor-pointer" onClick={() => this.viewDetails(index)}>
                                    <CardBody>
                                        <img src={item.Image} alt="" width="300" />
                                        <div><b>{item.Name}</b></div>
                                        
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
                                            {item.Description}
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                        :
                        "Loading"
                }
            </div>
        )
    }
}
