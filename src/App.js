import React, { Component } from 'react';
import { Row, Col } from 'antd';
import SunnyDay from './Components/SunnyDay';
import ClearNight from './Components/ClearNight';
import Windy from './Components/Windy';
import '../node_modules/antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <ClearNight/>
        </Col>
      </Row>
    );
  }
}

export default App;
