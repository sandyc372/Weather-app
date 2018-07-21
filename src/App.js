import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch, NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';
import Weather from './Containers/Weather';
import Forecast from './Containers/Forecast';
import '../node_modules/antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Row style={{ position: 'fixed', padding: '1rem', opacity: '0.8', right: '1rem', zIndex: 1000 }} gutter={24}>
            <Col span={8} style={{margin: '0.5rem'}}>
              <NavLink to="/weather" activeStyle={{fontWeight: 'bold'}}>Weather</NavLink>
            </Col>
            <Col span={8} style={{margin: '0.5rem'}}>
              <NavLink to="/forecast" activeStyle={{fontWeight: 'bold'}}>Forecast</NavLink>
            </Col>
          </Row>

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
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
