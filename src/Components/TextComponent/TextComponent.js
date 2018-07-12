import React, { Component } from 'react';

class TextComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <g transform={`translate(${this.props.x}, ${this.props.y})`}>
                <text fill={this.props.fill || 'white'} style={{fontSize: '5vw', fontFamily: 'Helvetica'}}>
                    {`${this.props.data.main.temp} \u2103`}
                </text>
                <text y="2.8vw" fill={this.props.fill || 'white'} style={{fontSize: '1.8vw', fontFamily: 'Helvetica'}}>
                    {`${this.props.data.weather[0].main}, ${this.props.data.weather[0].description} ${this.props.data.main.temp_max} / ${this.props.data.main.temp_min} \u2103`}
                </text>
                <text y="5.2vw"  fill={this.props.fill || 'white'} style={{fontSize: '1.4vw', fontFamily: 'Helvetica'}}>
                    {`${this.props.data.name}, ${this.props.data.sys.country}`}
                </text>
            </g>
        )
    }
}

export default TextComponent;