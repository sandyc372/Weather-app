import React, { Component } from 'react';

const NightSky = function(props){
    return(
        <rect x={0} 
              y={0}
              width={window.innerWidth}
              height={window.innerHeight}
              fill={props.fill}
              stroke={props.stroke}
        >
        </rect>
    )
}

const Stars = function(props){
    return props.points.map((point, index) => (
        <circle cx={point.x}
                cy={point.y}
                r={point.r}
                fill="white"
                opacity={0.6}
                key={index}
        >
            <animate attributeName="r"
                    values={`${point.r}; 0; ${point.r}`}
                    dur={point.dur} 
                    repeatCount="indefinite"
            />
        </circle>
    ))
}

const MoonShine = function(props){
    return(
        <circle cx={props.center.x} 
              cy={props.center.y}
              r={props.radius}
              fill={props.fill}
              stroke={props.stroke}
        >
        </circle>
    )
}

const Moon = function(props){
    const moveTo = {
                        x: props.center.x + Math.cos(Math.PI/4) * props.radius,
                        y: props.center.y - Math.cos(Math.PI/4) * props.radius
                };
    const lineTo = {
                    x: props.center.x - Math.cos(Math.PI/4) * props.radius,
                    y: props.center.y + Math.cos(Math.PI/4) * props.radius
            }
    return(
        <React.Fragment>
            <circle cx={props.center.x} 
                cy={props.center.y}
                r={props.radius}
                fill={props.fill}
                stroke={props.stroke}
            >
            </circle>
            <path d={`M ${moveTo.x} ${moveTo.y}
                      A ${props.radius} ${props.radius} 0 0 1 ${lineTo.x} ${lineTo.y}
                      A ${props.radius + 5} ${props.radius + 5} 0 0 0 ${moveTo.x} ${moveTo.y}`}
                  fill={'#a8c1cd'}
                  stroke={'#a8c1cd'}
            >
            </path>
        </React.Fragment>
    )
}

class ClearNight extends Component{
    constructor(props){
        super(props);
        this.noOfStars = 500;
        this.points = [];
        for(let i = 0; i < this.noOfStars; i++)
            this.points.push({x: Math.random() * window.innerWidth, 
                         y: Math.random() * window.innerHeight,
                         r: Math.random() * 3,
                        dur: Math.random() + 1})
    }
    render(){
        return (
            <svg width={window.innerWidth}
                 height={window.innerHeight}
            >
                <defs>
                    <radialGradient id="moonShineGradient">
                        <stop offset="0%" stopColor="#0c4b86"/>
                        <stop offset="100%" stopColor="#131031"/>
                    </radialGradient>
                </defs>
                <NightSky fill={'#131031'} stroke={'#01064b'}/>
                <MoonShine  center={{x: window.innerWidth-200, y: 150}}
                            radius={window.innerWidth-200}
                            fill={'url(#moonShineGradient)'} 
                            stroke={'none'}
                         
                />
                <Stars points={this.points}/>
                <Moon  center={{x: window.innerWidth-200, y: 150}}
                            radius={85}
                            fill={'#d7ebf4'} 
                            stroke={'none'}
                         
                />
            </svg>
        );
    }
}

export default ClearNight;