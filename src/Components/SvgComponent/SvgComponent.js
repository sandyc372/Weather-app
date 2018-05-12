import React, { Component } from 'react';
import SunComponent from '../SunComponent';
import HexagonComponent from '../HexagonComponent';
import { easeQuadIn } from 'd3';

const BlueSky = function(props){
    return(
        <rect x = {0}
              y = {0}
              width={window.innerWidth}
              height = {window.innerHeight}
              fill = '#87CEEB'>

        </rect>
    )
}

const Sunshine = function(props){
    return(
        <circle cx = {props.center.x}
              cy = {props.center.y}
              r={props.radius}
              fill = {props.fill}>

        </circle>
    )
}

const SunRays = function(props){
    const rays = [], theta = props.theta, rayLength = 900, rayRadius = 50;
    for(let i = 1; i <= 4; i++){
        rays.push(
            <HexagonComponent 
                                key={i}
                                radius={rayRadius * easeQuadIn(i/4)} 
                                center={{
                                    x: props.center.x - rayLength * easeQuadIn(i/4) * Math.cos(theta),
                                    y: props.center.y + rayLength * easeQuadIn(i/4) * Math.sin(theta)
                                }}
                                fill={'rgba(255, 255, 255, 0.5)'}
                                index={i/4}
            />
        )
    }
    return rays;
}

class SvgComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <svg height={window.innerHeight}
                 width={window.innerWidth}
            >
                <defs>
                    <radialGradient id="sunshine">
                    <stop offset="40%" stopColor="#f4e713"/>
                    <stop offset="100%" stopColor="#87CEEB"/>
                    </radialGradient>
                </defs>
                <BlueSky/>
                <Sunshine radius={700}
                          fill={'url(#sunshine)'}
                          center={{x: window.innerWidth - 100, y: 100}}
                />
                <SunComponent center={{x: window.innerWidth - 100, y: 100}}/> 
                <SunRays center={{x: window.innerWidth - 100, y: 100}}
                        theta={Math.PI/8}
                />   
            </svg>
        )
    }
}

export default SvgComponent;