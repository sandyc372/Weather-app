import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';
import Weather from './Containers/Weather';
import Forecast from './Containers/Forecast';
import SunnyDay from './Components/SunnyDay';
import ClearNight from './Components/ClearNight';
import Windy from './Components/Windy';
import '../node_modules/antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

export default App;
