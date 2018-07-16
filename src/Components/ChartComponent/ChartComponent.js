import React, { Component } from 'react';
import { Row, Col } from 'antd';
import LineChartComponent from '../LineChartComponent';

class ChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillReceiveProps(nextProps) {
        /* console.log(nextProps);
        const newData = this.state.data.slice();
        nextProps.forecastData && nextProps.metadata &&
        nextProps.forecastData.forEach((el) => {
            let dt_array = el.dt_txt.split(' '),
                day = dt_array[0],
                found = newData.find((el1) => el1.day === day)
            if(found){
                found.avgTemp +=  (el.main.temp || 0);
                found.avgPressure += (el.main.pressure || 0); 
                found.avgHumidity += (el.main.humidity || 0);
                found.rainfall += (el.rain['3h'] || 0);
            }
            else{
                newData.push({
                    day: day,
                    avgTemp: el.main.temp || 0,
                    avgPressure: el.main.pressure || 0,
                    avgHumidity: el.main.humidity || 0,
                    rainfall: el.rain['3h'] || 0
                })
            }
        });

        newData.forEach((el) => {
            let length = (this.props.metadata && this.props.metadata[el.day] && this.props.metadata[el.day].length) || 0;
            if(length != 0){
                el.avgTemp /= length;
                el.avgPressure /= length;
                el.avgHumidity /= length;
            }
        })
        this.setState(() => ({
            ...state,
            data: newData
        })) */
    }

    render() {
        return (
            <Row>
                <Col span={24}>
                    {
                        Array.isArray(this.props.forecastData) && this.props.forecastData.length > 0 ?
                            <LineChartComponent
                                data={this.props.forecastData}
                                metadata={this.props.metadata}
                                getDate={this.props.getDate}
                                getTime={this.props.getTime}
                            />
                            : null
                    }
                </Col>
            </Row>
        )
    }
}

export default ChartComponent;