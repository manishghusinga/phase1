import 'babel-polyfill';
import 'url-polyfill';
import { Route } from "react-router-dom";
import React, { Component } from 'react';
import { Switch } from 'react-router'
import { HashRouter as Router } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import 'react-datetime/css/react-datetime.css';
import 'react-rangeslider/lib/index.css'
import './index.css';
import Login from './auth/components/Login';

import Signup from './auth/components/Signup';
import { ToastContainer } from 'react-toastify';
import List from "./product/List";
import ProductDetails from "./product/ProductDetails";

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/list" component={List}/>
          <Route exact path="/listDetails" component={ProductDetails}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <ToastContainer/>
        </Switch>
      </Router>
    );
  }
}

export default App;
