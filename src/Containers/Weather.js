import React, { Component } from 'react';
import { Row, Col } from 'antd';

class Weather extends Component {
    render() {
        return (
            <Row>
                <Col span={24}>Current Weather</Col>
            </Row>
        );
    }
}

export default Weather;