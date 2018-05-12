import React, { Component } from 'react';
import { interpolateRgb, easeQuadIn } from 'd3';
import styled, { keyframes } from 'styled-components';
import HexagonComponent from '../HexagonComponent';

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
            const Ring = <HexagonComponent 
                                key={i}
                                radius={this.state.radius * easeQuadIn(i / this.state.rings)} 
                                center={this.props.center}
                                fill={this.interpolator(i / this.state.rings)}
                                index={i/this.state.rings}
                        />
            hexagons.push(Ring)
        }
        return(
            hexagons
        )
    }
}

export default SunComponent;