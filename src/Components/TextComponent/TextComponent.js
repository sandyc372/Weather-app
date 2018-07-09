import React, { Component } from 'react';

class TextComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <g transform={`translate(${this.props.x}, ${this.props.y})`}>
                <text fill="white" style={{fontSize: '5vw', fontFamily: 'Helvetica'}}>
                    {`${this.props.data.main.temp} \u2103`}
                </text>
                <text y="2.8vw" fill="white" style={{fontSize: '1.8vw', fontFamily: 'Helvetica'}}>
                    {`${this.props.data.weather[0].main}`}
                </text>
                <text y="2.8vw" x="7vw" fill="white" style={{fontSize: '1.8vw', fontFamily: 'Helvetica'}}>
                    {`${this.props.data.main.temp_max} /`}
                </text>
                <text y="2.8vw" x="10.5vw" fill="white" style={{fontSize: '1.8vw', fontFamily: 'Helvetica'}}>
                    {` ${this.props.data.main.temp_min} \u2103`}
                </text>
                <text y="5.2vw"  fill="white" style={{fontSize: '1.4vw', fontFamily: 'Helvetica'}}>
                    {`${this.props.data.name}`}
                </text>
            </g>
        )
    }
}

export default TextComponent;