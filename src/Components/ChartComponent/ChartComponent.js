import React, { Component } from 'react';
import { Row, Col, Select } from 'antd';
import LineChartComponent from '../LineChartComponent';
import AreaChartComponent from '../AreaChartComponent';

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


    getVariableName(str) {
        switch (str) {
            case 'main.temp': return 'Temperature'
            case 'main.pressure': return 'Pressure'
            case 'main.humidity': return 'Humidity'
            case 'rain.3h': return 'Rainfall'
            default: return str
        }
    }

    getUnit(str) {
        switch (str) {
            case 'main.temp': return '\u2103'
            case 'main.pressure': return 'hPa'
            case 'main.humidity': return '%'
            case 'rain.3h': return 'mm'
            default: return str
        }
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={24}>
                        {
                            Array.isArray(this.props.forecastData) && this.props.forecastData.length > 0 ?
                                this.props.type === 'line-chart' ?
                                    <LineChartComponent
                                        data={this.props.forecastData}
                                        metadata={this.props.metadata}
                                        getDate={this.props.getDate}
                                        getTime={this.props.getTime}
                                        variable={this.props.variable}
                                        getVariableName={this.getVariableName}
                                        getUnit={this.getUnit}
                                    />
                                    :
                                    <AreaChartComponent
                                        data={this.props.forecastData}
                                        metadata={this.props.metadata}
                                        getDate={this.props.getDate}
                                        getTime={this.props.getTime}
                                        variable={this.props.variable}
                                        getVariableName={this.getVariableName}
                                        getUnit={this.getUnit}
                                    />
                                : null
                        }
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ChartComponent;