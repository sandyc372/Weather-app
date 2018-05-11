import React, { Component } from 'react';
import { interpolateRgb, easeQuadIn, easeCubicIn, easePolyOut, easeLinear } from 'd3';

const HexagonComponent = function(props){
    let points = '';
    for(let theta = Math.PI/10; theta <= 2 * Math.PI; theta += Math.PI/5){
        if(points.length > 0) points += ', ';
        points += (props.center.x + props.radius * Math.cos(theta)) +
                    ', ' +
                (props.center.y - props.radius * Math.sin(theta));
    }
    return(
        <polygon points={points} 
                 className={'sun-ring'}
                 style={{fill: props.fill, stroke: 'none'}}
                 transform={'rotate('+ Math.random() * 360 +', ' + props.center.x + ', ' + props.center.y + ')'}
        >
        </polygon>
    )
}

class SunComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            radius: 450,
            rings: 10
        }
        this.interpolator = interpolateRgb('#fc4a1a', '#f4e713');
    }

    render(){
        const hexagons = [];
        for(let i = this.state.rings; i > 0; i--){
            hexagons.push(
                <HexagonComponent 
                        radius={this.state.radius * easeQuadIn(i / this.state.rings)} 
                        center={this.props.center}
                        fill={this.interpolator(i / this.state.rings)}
                />
            )
        }
        return(
            hexagons
        )
    }
}

export default SunComponent;