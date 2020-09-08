import React, {Component} from 'react';
import {authService} from '../services/auth';
import {Redirect, Link} from "react-router-dom";

import {Container, Row, Col} from 'reactstrap';
import {Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import classnames from 'classnames';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginSuccessful: "",
            passwordError: '',
            success: false,
            errorMessage: false
        };
        this.login = this.login.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.checkPwd = this.checkPwd.bind(this);
    }

    login(e) {
        e.preventDefault();

        if (this.checkPwd()) {
            authService.login(this.state.email, this.state.password)
            .then(response => {
                
            });
        } else {
            this.setState({oroLogin: false});
            this.setState({passwordError:'Please enter a password'})
        }
    }
    
    checkPwd(){
        if (this.state.password == '' || this.state.password == undefined) {
            return false;
        }
        return true;
    }

    resetFields() {
        this.setState({email: '', password: ''});
    }

    goBack = () => {
        window.location.hash = "#/"
    }

    render() {
        if (this.state.loginSuccessful) {
            return <Redirect to={{pathname: '/dashboard'}}/>;
        }

        return (
            <div className="bg-light h-100">
                <Container className="login-container pt-0">
        
                    <Row className="justify-content-center pt-5">
                        <Col xs="12" md="5" lg="4">
                            <h2 className="font-weight-semi-bold font-size-28">
                                Login
                            </h2>
                        </Col>

                        <Col xs="12" md="5" lg="4">
                            <Row>
                                <Col xs="12">
                                    <Alert color="success"
                                           className={classnames('display', {"d-none": !this.state.success})}>
                                        {this.state.successMessage}
                                    </Alert>

                                    <Alert color="danger"
                                           className={classnames('display', {"d-none": !this.state.errorMessage})}>
                                        {this.state.errorMessage}
                                    </Alert>
                                </Col>
                            </Row>

                            <Form className="login-form" onSubmit={this.login}>
                                <FormGroup>
                                    <Label for="email"
                                           className={classnames('text-muted', 'font-size-tiny', {invisible: !this.state.email})}>
                                        Email
                                    </Label>

                                    <Input type="email"
                                           name="email"
                                           id="email"
                                           autoComplete="off"
                                           className="form-control font-weight-semi-bold"
                                           placeholder="Email"
                                           onChange={e => this.setState({email: e.target.value})}
                                           value={this.state.email}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="password"
                                           className={classnames('text-muted', 'font-size-tiny', {invisible: !this.state.password})}>
                                        Password
                                    </Label>

                                    <Input type="password"
                                           name="password"
                                           autoComplete="off"
                                           id="password"
                                           className="form-control font-weight-semi-bold"
                                           placeholder="Password"
                                           onChange={e => this.setState({password: e.target.value})}
                                           value={this.state.password}
                                    />
                                    <small className='text-danger'>{this.state.passwordError}</small>
                                </FormGroup>

                                <FormGroup className="cta-block">
                                    <Button color="primary">
                                        Login
                                    </Button>
                                </FormGroup>
                                <div className="d-flex flex-direction-row">
                                    <div className="text-primary ml-auto text-right cursor-pointer">
                                        <Link to="/signup" >
                                            New user?
                                            <div>Sign up here.</div> 
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;
