import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, FormFeedback, FormText, Label, Input, Alert } from 'reactstrap';


import classnames from 'classnames';
import { authService } from '../services/auth';
import { validationHelpers } from '../helpers/validation';
import { toast } from 'react-toastify';



class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      country: '91',
      phone: '',
      email: '',
      password: '',
      areTermsAccepted: false,
      errors: {}
    }

    this.signup = this.signup.bind(this);
    this.updateState = this.updateState.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.showValidationErrors = this.showValidationErrors.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  signup(e) {
    e.preventDefault();
    if(!this.state.areTermsAccepted) {
      return;
    }
    //Check if all fields are present
    this.setState({errorMessage: ''});
    this.setState({successMessage: ''});
    this.setState({errors: {}});

    if(this.isFormValid()) {
      authService.register(this.state.name, 
                           this.state.email, 
                           this.state.password, 
                           this.state.password, 
                           this.state.country.toString() + this.state.phone.toString())
                .then(response=> {
                  console.log(response);

                  if(response.success) {
                   alert('We have sent you an email. Please verify your email and login.');
                    //Show success alert and redirect to login.
                    this.setState({successMessage: response.message});
                    this.setState({
                      signUpSuccess: true
                    })
                  } else {
                    //Show error alert.
                    this.setState({errorMessage: response.message}, () => {
                                  this.resetFields(response.field);
                                });
                  }
                })
                .catch(error => {
                  console.log("Catch");
                  console.log(error);
                  //Show error alert.
                  this.setState({errorMessage: error.message}, () => {
                                this.resetFields('');
                              });
                });      
    } else { //Handle invalid form states:
      this.showValidationErrors();
    } 
  }

  resetFields(field) {
    switch(field) {
      case 'email':
        this.setState({email: ''});
        break;
      case 'password':
        this.setState({password: ''});
        break;
      case 'phone':
        this.setState({phone: ''});
        break;
      default:
        this.setState({name: '', email: '', country: '', phone: '', password: ''});
        break;  
    }
  }

  isFormValid() {
    //If any fields are missing, immediately mark as invalid
    var formData = {
      name: this.state.name, 
      email: this.state.email, 
      password: this.state.password, 
      country: this.state.country,
      phone: this.state.phone
    };

    if(validationHelpers.areAllFieldsPresent(formData)) {
      console.log("All Fields are present, Validating individual fields");

      return validationHelpers.isEmailValid(formData.email) && 
             validationHelpers.isPasswordValid(formData.password) && 
             validationHelpers.isPhoneValid(formData.phone);
    }

    return false;
  }

  showValidationErrors() {
    console.log("Form invalid. Getting validation errors");

    var formData = {
      name: this.state.name, 
      email: this.state.email, 
      password: this.state.password, 
      country: this.state.country,
      phone: this.state.phone
    };

    this.setState({errors: validationHelpers.getValidationErrors(formData)}, () => {
          console.log(this.state.errors);
        });
    
  }

  updateState(key, value) {
    console.log(key + " " + value);
    var newState = {};
    newState[key] = value;
    this.setState(newState);
  }


  goBack = () => {
    window.location.hash = "#/"
  }


  render() {
    if (this.state.signUpSuccess) {
      return (
        <Redirect to={{pathname: '/login'}} />
      )
    }

    return (
      <div className="bg-light h-100">
        <Container fluid className="unauthenticated-header">
          <Row className="justify-content-center">
            <Col xs="10">
              LOGO
            </Col>
          </Row>
        </Container>

        <Container className="signup-content pt-0">
          <div onClick={() => this.goBack()} className="cursor-pointer py-3">
            <span  className="mdi mdi-keyboard-backspace icon back-btn font-weight-bold"></span>
          </div>
          <Row className="justify-content-center pt-2">
            <Col xs="12" md="5" lg="4">
              <h2 className="font-weight-semi-bold font-size-28">
                Hello! Let's get started.
              </h2>
            </Col>

            <Col xs="12" md="5" lg="4">
              <Row>
                <Col xs="12">
                  <Alert color="success" className={classnames('display', { "d-none": !this.state.success })}>
                    {this.state.successMessage}
                  </Alert>

                  <Alert color="danger" className={classnames('display', { "d-none": !this.state.errorMessage })}>
                    {this.state.errorMessage}
                  </Alert>
                </Col>
              </Row>
              <Form className="signup-form" onSubmit={this.signup}>
                <FormGroup>
                  <Label for="fullName" 
                          className={classnames('text-muted', 'font-size-tiny', { invisible: !this.state.name })} >
                          Full name
                  </Label>

                  <Input type="text" 
                         name="fullName" 
                         id="fullName" 
                         className="form-control font-weight-semi-bold"
                         placeholder="Full name" 
                         onChange={e => this.setState({name: e.target.value}) }
                         invalid={this.state.errors.name}
                         value={this.state.name}
                         />

                  <FormFeedback className={classnames({ invisible: (!this.state.errors.name || this.state.errors.name.length === 0) })}>
                    {this.state.errors.name}
                  </FormFeedback>
                </FormGroup>

                <FormGroup row>
                  <Col xs={5} sm={4}>
                    <Label for="country" 
                           className={classnames('text-muted', 'font-size-tiny', { invisible: !this.state.country })} >
                            Country
                    </Label>

                    <Input
                      value="+91"
                      readOnly={true}
                    />
                    
                    <FormFeedback className={classnames({ invisible: (!this.state.errors.country || this.state.errors.country.length === 0) })}>
                      {this.state.errors.country}
                    </FormFeedback>
                  </Col>

                  <Col xs={7} sm={8}>
                    <Label for="phone" 
                          className={classnames('text-muted', 'font-size-tiny', { invisible: !this.state.phone })} >
                          phone
                    </Label>

                    <Input type="tel" 
                         name="phone" 
                         id="phone" 
                         className="form-control font-weight-semi-bold"
                         placeholder="Phone number" 
                         onChange={e => this.setState({phone: e.target.value}) }
                         invalid={this.state.errors.phone}
                         value={this.state.phone}
                         />
                    <FormFeedback className={classnames({ invisible: (!this.state.errors.phone || this.state.errors.phone.length === 0) })}>
                      {this.state.errors.phone}
                    </FormFeedback>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Label for="email" 
                          className={classnames('text-muted', 'font-size-tiny', { invisible: !this.state.email })} >
                          Email
                  </Label>

                  <Input type="email" 
                         name="email" 
                         id="email" 
                         className="form-control font-weight-semi-bold"
                         placeholder="Email" 
                         onChange={e => this.setState({email: e.target.value})}
                         invalid={this.state.errors.email}
                         value={this.state.email}
                         />
                  <FormFeedback className={classnames({ invisible: (!this.state.errors.email || this.state.errors.email.length === 0) })}>
                    {this.state.errors.email}
                  </FormFeedback>       
                </FormGroup>

                <FormGroup>
                  <Label for="password" 
                          className={classnames('text-muted', 'font-size-tiny', { invisible: !this.state.password })} >
                          Password
                  </Label>

                  <Input type="password" 
                         name="password" 
                         id="password" 
                         className="form-control font-weight-semi-bold"
                         placeholder="Password" 
                         onChange={e => this.setState({password: e.target.value}) }
                         invalid={this.state.errors.password}
                         value={this.state.password}
                         />
                  <FormFeedback className={classnames({ invisible: (!this.state.errors.password || this.state.errors.password.length === 0) })}>
                    {this.state.errors.password}
                  </FormFeedback>
                </FormGroup>
                
                <FormGroup className="cta-block">
                  <FormText className="pl-4 pb-2 font-weight-semi-bold">
                    <Input type="checkbox"
                      onChange={e => this.setState({ areTermsAccepted: e.target.checked })}
                      checked={this.state.areTermsAccepted} />{' '}
                          I accept Orowealth’s <a href="https://www.orowealth.com/privacy-policy" target="_blank" className="text-dark text-underline">Privacy Policy</a> and <a href="https://www.orowealth.com/terms-of-use/" target="_blank" className="text-dark text-underline"> Terms & Conditions.</a>
                  </FormText>
                  <Button color="primary"className="clientOppo-primary-button">Create account</Button>
                </FormGroup>
              </Form>  
            </Col>
          </Row>
        </Container>
      </div>  
    );
  }
}

export default Signup;
