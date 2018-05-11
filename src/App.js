import React, { Component } from 'react';
import { Row, Col } from 'antd';
import SvgComponent from './Components/SvgComponent';
import '../node_modules/antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <SvgComponent/>
        </Col>
      </Row>
    );
  }
}

export default App;
