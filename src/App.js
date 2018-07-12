import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Row, Col, Input, Icon } from 'antd';
import Weather from './Containers/Weather';
import Forecast from './Containers/Forecast';
import '../node_modules/antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route path='/weather'
              exact
              component={Weather}
            />

            <Route path='/forecast'
              exact
              component={Forecast}
            />

            <Redirect to="/weather" />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
