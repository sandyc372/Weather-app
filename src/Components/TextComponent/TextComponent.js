import React, { Component } from 'react';

class TextComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <g transform={`translate(${this.props.x}, ${this.props.y})`}>
                <text>
                    {`${this.props.data.main.temp} \u2103`}
                </text>
            </g>
        )
    }
}

export default TextComponent;